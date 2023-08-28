cd shoes-be 
source activate env
nohup uvicorn main:app > server.log 2>&1 &