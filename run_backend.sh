#!/bin/bash

# Activate Conda environment
source activate env    # chạy trong bash git phải xài source 

# Start React frontend
# cd shoes-fe 
# npm install
# npm start & 
# serve -s build -l 3001

# &

# # Start Python backend
#npx kill-port 8000 -y  #close old port
cd shoes-be
# # pip install -r requirements.txt
nohup uvicorn main:app &