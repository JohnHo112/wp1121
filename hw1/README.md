# Web Programming HW#1
# Introduction
This repo implement the web service about diary. There are home page and diary page. It links frontend, backend and database.

# Prerequisite
- Make sure you have NodeJS and yarn installed.

# How to run code
## Database
Create a .env file on backend folder, and set PORT and MONGO_URL,
```
cd backend
```
```
// .env folder
PORT=8000
MONGO_URL=<your mongo db connect link>
```

## Backend
### Install packages
```
yarn
```

### Run backend 
```
yarn start
```
Sometime connect database having error (SSL internet error...). You can run backend again.

## Frontend
Open `frontend/index.html`

