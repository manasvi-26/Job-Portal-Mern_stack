# Job Portal App

A web app built using MERN for apllicants and recruiters for jobs.

## Setup and Running 

* Start the mongodb server

```bash
    sudo mongod
```

* Get the backend sever running

```bash
    cd backend
    npm install
    npm run server
```

* Start the front end

```bash
    cd ../frontend
    npm install
    npm start
```

* Start the mongodb database (optional- used to view the databse)

```bash
    mongo
```

CAUTION : If the ports are already being used by some other processes, they must be killed before running the above script

```bash
    ps aux | grep <node/mongo>
    kill -9 <PID>
```

Your App should be up and running on http://localhost:3000/
server is running on ttp://localhost:5000/

