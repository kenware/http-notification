# http-notification

## Technologies
Docker, Node/Express, Mocha and chai etc

## Installation Guide
### Docker setup recommended
* Ensure that docker is installed on your local machine
* Git pull this project into your local machine
* cd into http-notification directory and Run
  ``` 
  docker-compose up
  ```
* This will take a while as it will build all the services in the docker compose
* When this is done, It will start three servers
* Publisher server at port `8000`
* subscriber1 server at port `9000`
* subscriber2 server at port `5000`
#### Publiser
* To get into publisher server container terminal, run
  ```
  docker exec -it http-notification_publisher_1 bash
  ```
* To view logs in only publisher server
   ```
   docker logs -f http-notification_publisher_1
   ```
#### Subscriber1
* To get into Subscriber1 server container terminal, run
  ```
  docker exec -it http-notification_subscriber1_1 bash
  ```
* To view logs in only Subscriber1 server
   ```
   docker logs -f http-notification_subscriber1_1
   ```
#### Subscriber2
* To get into Subscriber2 server container terminal, run
  ```
  docker exec -it http-notification_subscriber2_1 bash
  ```
* To view logs in only Subscriber2 server
   ```
   docker logs -f http-notification_subscriber2_1
   ```
## Run Test
* Get into publisher container terminal with this command
    ```
    docker exec -it http-notification_publisher_1 bash
    ```
* Within the container terminal, run `npm test`

## Manual setup

### Publisher
* cd into publisher
* Ensure you have node version 14 installed on your machine. run
  ```
  node -v
  ```
* create `.env` file, copy all the variable in `.env.sample` file into the `.env` and replace variable where necssary

* run `npm install`

*  run migrations
   ```
   sequelize db:migrate
   ```
* start dev server with 
  ```
  npm run start-dev
  ```
* run test with `npm test`

### Subscriber1 or subscriber2
* cd into subscriber1 or subscriber2

* run `npm install`

* start dev server with
  ```
  npm run start-dev
  ```


## Documentation
### Account
* Create an account: Accounts and requests are created and made on publisher server

    **Request**
    ```
    POST 
    http://localhost:8000/api/v1/account/create
    {
        "name": "andela",
        "email": "andela.account@andela.com",
        "password": "andelaaccount"
    }     

    ```
    **Response**
    ```
    {
        "account": {
            "id": 2,
            "email": "andela.account@andela.com",
            "name": "andela",
            "password": "$2a$08$..d6XcPtnzQlOmh4z/ViqOWsNSImrc/tj7n3M3Lu9ocIxj.E5MDby",
            "updatedAt": "2021-05-02T19:40:59.270Z",
            "createdAt": "2021-05-02T19:40:59.270Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbmRlbGEuYWNjb3VudEBhbmRlbGEuY29tIiwiaWF0IjoxNjE5OTg0NDU5fQ.jio-ndSWBWbZfKhUc2XHphhMWYeJNaHJn4ALF6I-rgQ",
        "secreteKey": "e1fad4c7befe99d423bf7e1ecebd95876393b2e4"
    }
    ```
* Login to account

    **Request**
    ```
    POST 
    http://localhost:8000/api/v1/account/login
        {
        "email": "andela.account@andela.com",
        "password": "andelaaccount"
        }  
    ```
    **Response**

    ```
    {
        "account": {
            "id": 2,
            "name": "andela",
            "email": "andela.account@andela.com",
            "password": "$2a$08$..d6XcPtnzQlOmh4z/ViqOWsNSImrc/tj7n3M3Lu9ocIxj.E5MDby",
            "createdAt": "2021-05-02T19:40:59.270Z",
            "updatedAt": "2021-05-02T19:40:59.270Z",
            "accessKeys": [
                {
                    "id": 2,
                    "secreteKey": "e1fad4c7befe99d423bf7e1ecebd95876393b2e4",
                    "createdAt": "2021-05-02T19:40:59.352Z",
                    "updatedAt": "2021-05-02T19:40:59.352Z",
                    "accountId": 2
                }
            ]
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbmRlbGEuYWNjb3VudEBhbmRlbGEuY29tIiwiaWF0IjoxNjE5OTg0NzUxfQ.DtC_Z8dIgw7Koj_y0epuGHcel1vR1aXkSYtbGKTMqUU"
    }
    ```

### Topic

* Create Topic

    **Request**

    Grab the token from the account login
    ```
    POST
        headers = { authorization: 'Bearer <token>'}

        http://localhost:8000/api/v1/topic

        {
        "name": "Test topic"
        }
    ```
    **Response**

    ```
    {
            "id": 4,
            "name": "Test topic",
            "createdAt": "2021-05-02T20:01:58.528Z",
            "updatedAt": "2021-05-02T20:01:58.528Z",
            "accountId": 2
        }
    ```

* List of topic

    **Request**

    Grab the token from the account login

    ```
    GET
        headers = { authorization: 'Bearer <token>'}

        http://localhost:8000/api/v1/topic
    ```

    **Response**

    ```
    [
        {
            "id": 4,
            "name": "Test topic",
            "createdAt": "2021-05-02T20:01:58.528Z",
            "updatedAt": "2021-05-02T20:01:58.528Z",
            "accountId": 2
        }
    ]
    ```

### Subscription
* List of available endpoint for subscription on subscriber1 server

    ```
    http://localhost:9000/api/v1/test1
    http://localhost:9000/api/v1/test2

    or 

    http://127.0.0.1:9000/api/v1/test1
    http://127.0.0.1:9000/api/v1/test2
    ```

* List of available endpoint/url for subscription on subscriber2 server

    ```
    http://localhost:5000/api/v1/test1
    http://localhost:5000/api/v1/test2

    or 

    http://127.0.0.1:5000/api/v1/test1
    http://127.0.0.1:5000/api/v1/test2
    ```

* Create Subscription

    **Request**

    Grab the token from the account login

    Grab topic id from the list of topics above
    ```
    POST
        headers = { authorization: 'Bearer <token>'}

        http://localhost:8000/api/v1/subscribe/<topicId>

        {
         "url": "http://localhost:5000/api/v1/test1"
        }
    ```

    **Response**

    ```
    {
    "url": "http://localhost:5000/api/v1/test1",
    "topic": "Test topic"
    }
    ```

### Publish to topic
* Publish to topic

  **Request**

  Grab the token from the account login.

  Grab topic id from the list of topics above

  ```
  POST
    headers = { authorization: 'Bearer <token>'}

    http://localhost:8000/api/v1/publish/<topicId>

    {
    "message": "new data published"
    }
  ```

   **Response**

   ```
   [
    {
        "url": "http://localhost:5000/api/v1/test1",
        "message": "Success",
        "status": 201,
        "topic": "Test topic"
    },
    {
        "url": "http://localhost:5000/api/v1/test2",
        "message": "Success",
        "status": 201,
        "topic": "Test topic"
    },
    ...
    ]
   ```
* Confirm that the subscriber servers logs the data published to them in the console.

* The subscriber servers also logs the data received from the publisher in this directory
    ```
    logs/combined.log
    ```
## Aditional Recommendation or features

* The communications between publisher and subscribers should be encripted for security in the case of a very sensitive information. One way to do this is to encript the data in the publisher before sending it and allow subscriber to decript the data. 
This involves sharing of secrete key between publisher and subsctriber.

* in the case of a less sensitive data, an initial handshake between publisher and subscriber could be established before subscriber begin to receive data.