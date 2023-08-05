#!/bin/bash

# Activate Conda environment
source activate web # chạy trong bash git phải xài source 
# # Start Python backend
#npx kill-port 8000 -y  #close old port
cd shoes-be
# # pip install -r requirements.txt
nohup uvicorn main:app --reload &