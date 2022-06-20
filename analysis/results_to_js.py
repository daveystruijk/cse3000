import csv


IN_FILENAME = "raw_results.csv"

with open(IN_FILENAME, "r") as csvfile:
    reader = csv.reader(csvfile)
    next(reader) # skip headers
    lines = [line for line in reader]

print(f"Processing {IN_FILENAME}")
for line in lines:
    wid = line[1]
    js = line[0].split('INFO\t')[1]
    filename = f"js/{wid}.json"
    with open(filename, "w") as outfile:
        print(f"Writing: {filename}")
        outfile.write(js)


