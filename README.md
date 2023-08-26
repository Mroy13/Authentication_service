### Setup the project

 - Download this template from github and open it in your favourite text editor. 
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=<port number of your choice>
        SALT_ROUNDS=8
        SECRET_KEY='key'
    ```
    ex: 
    ```
        PORT=3000
    ```
 - run the following command inside src to generate config.json
    ```
      npx sequelize init:config
    ```
 - give mysql user name password and db name inside config.json

 - to migrate all migaration folder and create table schema
 execute
  ```
    npx sequelize-cli db:migrate
  ```

 - To run the server execute
 ```
 node --watch src/index.js
 ```
 - To check Api is working or not:
 ```
 localhost:3000/api/v1/info
 ```

 ### Api details:
 - for signup:
   ```
   POST
   http://localhost:3000/api/v1/user/signup
   
   inputfield:
   {
    firstName:m,
    lastName:roy,
    email:
    password:
   }

   RESPONSE:
   {
    "success": true,
    "message": "successfully completed request",
    "data": "firstName",
    "error": {}
    }

   ```
   

- for signin:

    ```
    POST
    http://localhost:3000/api/v1/user/signin

    inputfield:
   {
    emai:
    password:
   }

   RES:
   {
    "success": true,
    "message": "successfully completed request",
    "data": "firstName",
    "error": {}
   }
   ```
   
- for signout
   ```
   GET

    http://localhost:3000/api/v1/user/signout

   ```