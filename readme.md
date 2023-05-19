To run, first install docker and Visual Studio Code.
Add the docker plugin to visual studio code. 

DATABASE CONFIGURATION IN DOCKER
1. Using the docker plugin, right click ont he docker-compose.yml file and perform a "Compose Up".
2. Then in the docker tab, right click on your container and click attach shell. 
3. Optionally download "MongoDB Compass" and connect with the string inside .env.example

INSTALL DEPENDENCIES
1. Navigate to the frontend directory 'cd ./frontend'
2. npm i
3. Navigate to backend from the project root 'cd ./backend'
4. npm i

DATABSE CREDENTIALS CONFIGURATION AND RUNNING
1.  copy the .env.example (found in the backend) to .env and modify as needed.
2.  Open a terminal in the backend directory
3.  npm run build
4.  npm run start
5.  In another terminal navigate to the frontend directory 
6.  npm run start
7.  Navigate to url displayed in the terminal to see if the application is running. 