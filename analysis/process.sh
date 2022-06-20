#!/bin/bash
python3 results_to_js.py
for file in ./js/*
do
  echo "Converting js -> json ($file)"
  hjson-cli -j "$file" > "json/$(basename $file)"
done
python3 process_data.py
python3 correctness_histogram.py
python3 feedback_likert_scales.py
