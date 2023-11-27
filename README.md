## Description

News Junk News Application

## Setup project

## Setup Backend

```bash
$ cd backend #Go to backend folder
$ npm install #Install node modules
$ docker compose up #Start docker in backend folder in seperate terminal and keep terminal open
$ npm run db:generate #Generate DB (run only first time)
$ npm run db:push #(run only first time)
$ npm run db:seed #(run only first time)
$ npm run start #Start the server
```

NOTE: Please Change exampleenv file to .env when setting up project

## Setup Frontend

```bash
$ cd frontend #Go to fronend folder
$ npm install #Install node modules
$ npm run start #Start the project