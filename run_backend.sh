<<<<<<< HEAD
cd shoes-be 
source activate env
nohup uvicorn main:app > server.log 2>&1 &
=======
#!/bin/bash

# Activate Conda environment
source activate web # chạy trong bash git phải xài source 
# # Start Python backend
#npx kill-port 8000 -y  #close old port
cd shoes-be
# # pip install -r requirements.txt
nohup uvicorn main:app &
>>>>>>> 568474ac79dcc9e6b5f5e2a07686ecfe7244a732
