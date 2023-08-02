#!/bin/bash

# Activate Conda environment
conda activate env

# Start React frontend
cd shoes-fe
# npm install
# npm start & 
serve -s build -l 3000 &

# Start Python backend
cd ../shoes-be
# pip install -r requirements.txt
uvicorn main:app --reload