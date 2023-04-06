# Fullstack Afiliados

## Challenge
In this challenge, the goal is to create a web interface to upload a sales transactions file, normalize the data, and store it in a relational database. The platform is based on a creator-affiliate model, where a creator can have one or more affiliates selling their products with a commission per sale.


## Introduction
This project is the solution to the proposed challenge. It is a monorepo with the client and server projects. The server is mainly built with Express and Sequelize, while the client is made with React and styled with TailwindCSS. Jest was used for testing both the back and front-end components.  
 
## Stack

**Client:**
* ReactJS
* TailwinCSS
* React Query
* React Router Dom
* Testing Library
* Axios

**Server:** 
* Express
* Sequelize
* Jsonwebtokens
* Jest

**DevOps:** 
* Docker
* Docker Compose
* ESLint / Prettier
* Monorepo



## local installation

To install this project on your local machine, follow the steps below:

1. Clone the repository from GitHub:
```git
   git clone git@github.com:lnfernandobr/fullstack-afiliados.git
```
2. Access the project folder:
```bash
cd fullstack-afiliados
```
3. Install the project's dependencies:
```bash
npm install
```
4. To run both the client and the server, you can run the `start` script in the root folder:
```bash
npm run start
```
After following these steps, the server will be available at http://localhost:5000 and the client at http://localhost:3000.

## Using Docker Compose
If you prefer to use Docker Compose to run the application in an isolated environment, follow the steps below:

1. Make sure Docker and Docker Compose are installed on your machine.
2. Open the terminal and navigate to the root folder of the project.
3. Execute the following command to create and start the containers:
```bash
docker-compose up
```
4. To stop and remove the containers, execute the following command:

```bash
docker-compose down
```

After the containers are initialized, the server will be available at http://localhost:5000 and the client at http://localhost:3000.


## Client
The client is built with React and TailwindCSS. It consists of various components that can be found in the `client/src/components` folder.

The application is configured to use routes, based on the `react-router-dom` package. The routes can be found in `client/src/routes`.

The client consumes the server through HTTP requests using the `axios` and `react-query` packages.

Tests on the client were performed using the Jest library and focused on the Transactions component.

To run the tests, follow these steps:

Open the terminal and navigate to the client folder (packages/client).

Run the following command:
```bash
npm test
```

## Server
The server is built with Express and uses Sequelize as the ORM for database access.

The Sequelize models are defined in the `server/models` folder. The server uses the routes defined in the `server/routes` folder.

The server uses the `dotenv` package to load environment variables from the `.env` file.

Tests on the server were performed using the Jest library and focused on the login methods and transactions.

To run the tests, follow these steps:

Open the terminal and navigate to the server folder (packages/server).

Run the following command:
```bash
npm test
```
    
## Conclusions
In a test where my programming skills were evaluated, as part of the challenge I created a complete end-to-end solution that included the creation of a monorepo to facilitate project management. I used my skills to cleanly and efficiently build a client and server, overcoming the fundamental challenges presented. Also, I added extra functionality to the monorepo like docker-compose and authentication and detailed documentation which is a testament to my ability to write high quality maintainable code. To build the client and server, I use modern technologies and advanced tools like `React, Express, Sequelize, Jest, Etc`. Thus, I managed to present a robust and complete solution that meets all expectations of the proposed challenge. 

> This is a challenge by Coodesh
