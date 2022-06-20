import csv
import json
import glob
import plotly.graph_objects as go
from collections import Counter


CORRECT_ANSWERS = {
    "https://i.imgur.com/J6Sh8e9.jpeg": "right",
    "https://i.imgur.com/07JVodH.jpeg": "left",
    "https://i.imgur.com/8kls9qD.jpeg": "right",
    "https://i.imgur.com/39HNjks.jpeg": "right",
    "https://i.imgur.com/4ihzAJ5.jpeg": "left",
    "https://i.imgur.com/GpzBljf.jpeg": "right",
    "https://i.imgur.com/YDMkRch.png": "left",
    "https://i.imgur.com/ZupOzbU.png": "left",
    "https://i.imgur.com/TFZovcX.jpeg": "left",
    "https://i.imgur.com/a5Y1ngg.jpeg": "right",
}

LIKERT_VALUE = {
    "Strongly Disagree": 1,
    "Disagree": 2,
    "Neutral": 3,
    "Agree": 4,
    "Strongly Agree": 5,
    "Low": 1,
    "Somewhat Low": 2,
    "Somewhat High": 4,
    "High": 5,
    "Poor": 2,
    "Somewhat Poor": 2,
    "Somewhat Good": 4,
    "Good": 5,
}

# Load experiment data
experiments = []
for filename in glob.glob("./json/*"):
    with open(filename) as jsonfile:
        experiments.append(json.load(jsonfile))

def analyze_answers(ex):
    time_total = ex["endTime"] - ex["startTime"]
    print(f"{ex['inputMethod']} (total: {time_total}s)")
    for i, answer in enumerate(ex["answers"]):
        correct = answer["choice"] == CORRECT_ANSWERS[answer["image"]]
        time = answer["endTime"] - answer["startTime"]
        print(f"{i}. {correct} in {time}s")


def collect_timings(experiments):
    timings = {
        "mouse": [],
        "webcam": [],
    }
    for ex in experiments:
        for i, answer in enumerate(ex["answers"]):
            if i == 0:
                continue
            time = (answer["endTime"] - answer["startTime"]) / 1000
            if time < 0.5:
                print(f"{ex['queryParams']['PROLIFIC_PID']} | Too low: {time} at {i}")
            else:
                timings[ex["inputMethod"]].append(time)
    return timings


def collect_demographics(experiments):
    result = {
        "gender": Counter([ex["feedback"]["gender"] for ex in experiments]),
        "age": Counter([ex["feedback"]["age"] for ex in experiments]),
        "experience": Counter([ex["feedback"]["experience"] for ex in experiments]),
    }
    print(result)


def collect_score(experiments):
    score = {
        "mouse": 0,
        "webcam": 0,
    }
    total = {
        "mouse": 0,
        "webcam": 0,
    }
    mistakes_at = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
    }
    for ex in experiments:
        for i, answer in enumerate(ex["answers"]):
            if i == 0:
                continue
            correct = answer["choice"] == CORRECT_ANSWERS[answer["image"]]
            if correct:
                score[ex["inputMethod"]] += 1
            else:
                print(f"{ex['queryParams']['PROLIFIC_PID']} | Mistake at {i}")
                mistakes_at[i] += 1
            total[ex["inputMethod"]] += 1
    print(mistakes_at)
    return score, total


def collect_feedback(experiments):
    print(f"Writing: processed.csv ({len(experiments)} rows)")
    with open("processed.csv", "w") as csvfile:
        w = None
        for i, ex in enumerate(experiments):
            row = ex["feedback"]
            for k, v in row.items():
                if v in LIKERT_VALUE:
                    row[k] = LIKERT_VALUE[v]
            row["inputMethod"] = ex["inputMethod"]
            row["windowHeight"] = ex["windowHeight"]
            row["windowWidth"] = ex["windowWidth"]
            row["totalTime"] = (ex["endTime"] - ex["startTime"]) / 1000
            row["experimentTime"] = (
                ex["answers"][9]["endTime"] - ex["answers"][0]["startTime"]
            ) / 1000
            if "calibrationClicks" in ex:
                row["calibrationClicks"] = len(ex["calibrationClicks"])
            else:
                row["calibrationClicks"] = 0
            row["correct"] = 0
            for j, answer in enumerate(ex["answers"]):
                if j == 0:
                    continue
                correct = answer["choice"] == CORRECT_ANSWERS[answer["image"]]
                if correct:
                    row["correct"] += 1
            if i == 0:
                w = csv.DictWriter(csvfile, row.keys())
                w.writeheader()
            w.writerow(row)


collect_demographics(experiments)
collect_feedback(experiments)
timings = collect_timings(experiments)
score, total = collect_score(experiments)
print(score)
print(total)
fig = go.Figure()
fig.add_trace(
    go.Box(
        y=timings["mouse"],
        name="Mouse",
        marker_color="#00A6D6",
        fillcolor="#00A6D6",
        line_color="#007495",
    )
)
fig.add_trace(
    go.Box(
        y=timings["webcam"],
        name="Webcam",
        marker_color="#A50034",
        fillcolor="#A50034",
        line_color="#730024",
    )
)
fig.update_traces(boxpoints="all")
fig.update_layout(
    template="plotly_white",
    font_family="Roboto Slab",
    showlegend=False,
    yaxis_title_text="Time (s)",  # yaxis label
)
print("Writing: timings_boxplot.svg")
fig.write_image("timings_boxplot.svg")
fig.show()
