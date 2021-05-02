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

## Documentation
### Account
* Create an account: Accounts are created on publisher server

    **Request**
    ```
    POST 
    http://localhost:8000/account/create
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
    http://localhost:8000/account/login
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

        http://localhost:8000/topic

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

        http://localhost:8000/topic
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
* List of available endpoint for subscription on subscriver1 server

    ```
    http://localhost:9000/test1
    http://localhost:9000/test2

    or 

    http://127.0.0.1:9000/test1
    http://127.0.0.1:9000/test2
    ```

* List of available endpoint/url for subscription on subscriver2 server

    ```
    http://localhost:5000/test1
    http://localhost:5000/test2

    or 

    http://127.0.0.1:5000/test1
    http://127.0.0.1:5000/test2
    ```

* Create Subscription

    **Request**

    Grab the token from the account login

    Grab topic name from the list of topics above
    ```
    POST
        headers = { authorization: 'Bearer <token>'}

        http://localhost:8000/subscribe/<topic_name>

        {
         "url": "http://localhost:5000/test1"
        }
    ```

    **Response**

    ```
    {
    "url": "http://localhost:5000/test1",
    "topic": "Test topic"
    }
    ```

### Publish to topic
* Publish to topic

  **Request**

  Grab the token from the account login.

  Grab topic name from the list of topics above

  ```
  POST
    headers = { authorization: 'Bearer <token>'}

    http://localhost:8000/publish/<topic_name>

    {
    "message": "new data published"
    }
  ```

   **Response**

   ```
   [
    {
        "url": "http://localhost:5000/test1",
        "message": "Success",
        "status": 201
    },
    {
        "url": "http://localhost:5000/test2",
        "message": "Success",
        "status": 201
    },
    ...
    ]
   ```
* Confirm that the subscriber servers logs the data published to them in the console.

* The subscriber servers also logs the data received from the publisher in this directory
    ```
    logs/combined.log
    ```