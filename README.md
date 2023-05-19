To run, first install docker and Visual Studio Code. Add the docker plugin to visual studio code.

DATABASE CONFIGURATION IN DOCKER

    Using the docker plugin, right click ont he docker-compose.yml file and perform a "Compose Up".
    Then in the docker tab, right click on your container and click attach shell.
    Optionally download "MongoDB Compass" and connect with the string inside .env.example

INSTALL DEPENDENCIES

    Navigate to the frontend directory 'cd ./frontend'
    npm i
    Navigate to backend from the project root 'cd ./backend'
    npm i

DATABSE CREDENTIALS CONFIGURATION AND RUNNING

    copy the .env.example (found in the backend) to .env and modify as needed.
    Open a terminal in the backend directory
    npm run build
    npm run start
    In another terminal navigate to the frontend directory
    npm run start
    Navigate to url displayed in the terminal to see if the application is running.

