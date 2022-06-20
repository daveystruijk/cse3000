import pandas as pd
import plotly.graph_objects as go

data = pd.read_csv("processed.csv")


def into_percentages(column):
    total = len(column)
    counts = column.value_counts()
    sum = 0
    for idx, count in counts.items():
        sum += idx * count
    print(sum / total)
    result = []
    for i in range(0, 5):
        result.append(counts.get(i, 0) / total * 100)
    return result

def feedback(inputMethod, column):
    print(f"{inputMethod} {column}")
    result = data.query(f'inputMethod == "{inputMethod}"')[column]
    return into_percentages(result)


fig = go.Figure()

top_labels = [
    "Strongly<br>Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly<br>Agree",
]

colors = ["#000", "#A50034", "#EC6842", "#666", "#009B77", "#6CC24A"]

def make_chart(question, method):
    x_data = [
        feedback(method, question),
    ]

    y_data = [method.capitalize()]

    fig = go.Figure()

    for i in range(0, len(x_data[0])):
        for xd, yd in zip(x_data, y_data):
            fig.add_trace(
                go.Bar(
                    x=[xd[i]],
                    y=[yd],
                    orientation="h",
                    marker=dict(
                        color=colors[i], line=dict(color="rgb(255, 255, 255)", width=1)
                    ),
                    width=1,
                )
            )

    fig.update_layout(
        xaxis=dict(
            showgrid=False,
            showline=False,
            showticklabels=False,
            zeroline=False,
            domain=[0.15, 1],
        ),
        yaxis=dict(
            showgrid=False,
            showline=False,
            showticklabels=False,
            zeroline=False,
        ),
        barmode="stack",
        margin=dict(l=0, r=0, t=0, b=0),
        showlegend=False,
    )

    annotations = []

    for yd, xd in zip(y_data, x_data):
        # labeling the y-axis
        annotations.append(
            dict(
                xref="paper",
                yref="y",
                x=0.14,
                y=yd,
                xanchor="right",
                text=str(yd),
                showarrow=False,
                align="right",
            )
        )
        space = xd[0]
        for i in range(0, len(xd)):
            # labeling the rest of percentages for each bar (x_axis)
            if xd[i] != 0:
                annotations.append(
                    dict(
                        xref="x",
                        yref="y",
                        x=space + (xd[i] / 2),
                        y=yd,
                        text=str(xd[i]) + "%<br />" + top_labels[i-1],
                        font=dict(color="rgb(255, 255, 255)"),
                        showarrow=False,
                    )
                )
                space += xd[i]

    fig.update_layout(
            height=54,
        annotations=annotations, template="plotly_white", font_family="Roboto Slab"
    )

    fig.write_image(question + '_' + method + '.svg')
    # fig.show()

for question in ['PU-S1', 'PU-S2', 'PU-S3', 'RW-S1', 'RW-S2', 'RW-S3', 'TLX-1', 'TLX-2', 'TLX-3', 'TLX-3', 'TLX-4', 'TLX-5', 'TLX-6']:
    for modality in ['mouse', 'webcam']:
        make_chart(question, modality)
