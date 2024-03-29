#!/bin/bash

# Activate Conda environment
# conda activate env

# Start React frontend
cd shoes-fe 
# npm install
# npm start & 
npx kill-port 3000 -y  #close old port
nohup serve -s build -l 3000 &

&

# # Start Python backend
cd ../shoes-be
npx kill-port 8000 -y  #close old port
# # pip install -r requirements.txt
source activate web
nohup uvicorn main:app --reload &