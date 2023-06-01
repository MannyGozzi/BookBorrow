To run, first install docker and Visual Studio Code. Add the docker plugin to visual studio code.

DATABASE CONFIGURATION IN DOCKER

    Using the docker plugin, right click on the docker-compose.yml file and perform a "Compose Up".
    Then in the docker tab, right click on your container and click attach shell.
    Optionally download "MongoDB Compass" and connect with the string inside .env.example

INSTALL DEPENDENCIES

    Navigate to the frontend directory `cd ./frontend`
    `npm i`
    Navigate to backend from the project root `cd ./backend`
    `npm i`

DATABSE CREDENTIALS CONFIGURATION AND RUNNING

    copy the .env.example (found in the backend) to .env and modify as needed.
    Open a terminal in the backend directory

    Build Backend:
    `npm run build`

    Seed the database:
    `npm run seed`

    Start the backend:
    `npm run start`

    Ensure the backend is running on port 3000

    In another terminal navigate to the frontend directory
    
    Start the frontend:
    `npm run start`

    Ensure the frontend is running on port 3001

    Navigate to url displayed in the terminal to see if the application is running.


DEFAULT ACCOUNTS:

    username: 'User1'
    email: 'user1@gmail.com'
    password: 'password123'

    username: 'User2'
    email: 'user2@gmail.com'
    password: 'password123'

    username: 'User3'
    email: 'user3@gmail.com'
    password: 'password123'
