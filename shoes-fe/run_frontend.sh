# Start React frontend
# cd shoes-fe
# npm install
# npm start & 
#npx kill-port 3000 -y  #close old port
ls > ls.log 2>&1 
nohup uvicorn main:app > server.log 2>&1 &