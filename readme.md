<!-- TITLE -->
<h1> StandardCare API TEST</h1> <br>
<div align="center">
  
<br>

API developed as a challenge for an internship apply. Read the section About the Project for complete information. 
  

[![MIT License][license-shield]](https://github.com/MarioDoncel/StandardCare-API-Test/blob/main/LICENSE)
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/marioadoncel/)

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#objective">Objective</a></li>
        <li><a href="#status">Status</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
API developed as a challenge for an internship apply. 

### Test specifications:
<hr>

### The API will GET and PUT data

### The routes to be designed are for a specific type of analytics called 'Engagement'

### Engagement is an important measure of digital health solutions (Think of apps like Calm, Headspace, Noom, etc.). Applications used for managing weight, reducing anxiety, managing diabetes, etc. Engagement measures how frequently users use the app. Our API is the place to report those statistics. The digital health vendor will POST engagement to standard care, and we will report it so potential buyers of the app.

Engagement is measured on a group of n users and is reported as a percentage, integer from 0-99

* Implement a route to receive an engagement

* Implement schema

* Create upload code to your GitHub and share the link below.

<hr>

The API was buil with Node(Express), Typescript and MongoDB Atlas. 

I went well beyond what was requested, creating as much content as possible within the stipulated time(4 days).

Created the models for vendor, users, validRefreshTokens, Census. 

Created the following routes : 

- Users: 
  - POST - Create user and send an email for email verification
  - GET - Get all users
  - GET - Get user by id
  - GET - Verify user email
  - PACTH - Update user informations
  <br>
  <br>
- Vendors:
  - POST - create vendor
  - POST - Login vendor, with basic auth middleware
  - GET - Get vendor engagement metrics, with bearer auth middleware using JWT and Refresh Token strategie
  - PUT - Update vendor engagement metrics, with bearer auth middleware using JWT and Refresh Token strategie
  <br>
  <br>
- Census:
  - POST - Receive census data from a client from a .csv file
  - GET - Get census data filtered by client name
  <br>
  <br>

Created error handlers

Created authentication strategy with JWT and refresh token

Folders structured by use cases

At the end i added a cron-job to delete all expirated refresh tokens from database at 02:00AM everyday.
  
Time of development: 4 days

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With


* [Typescript](https://www.typescriptlang.org/)
* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/pt-br/)
* [JWT](https://jwt.io/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* Mongoose-auto-increment
* Node-cron
* ESLint
* JWT
* Multer
* Csv-parse
* Bcrypt
* Crypto-js


<p align="right">(<a href="#top">back to top</a>)</p>

### Objective

Project developed for an internship apply.
<p align="right">(<a href="#top">back to top</a>)</p>

### Status

Finished.
<p align="right">(<a href="#top">back to top</a>)</p>

<hr>
<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

<!-- This is an example of how to list things you need to use the software and how to install them. -->
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

<!-- _Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._
 -->

1. Clone the repo
   ```sh
   git clone https://github.com/MarioDoncel/StandardCare-API-Test
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a database at MongoDB Atlas and configure your environment variables  `.env`

   ```.env
    MONGO_CONNECTION=mongodb+srv://<username>:<password>@<cluster>.oczo8.mongodb.net/<database>?retryWrites=true&w=majority
    JWT_SECRET=yoursecret
    VERIFICATION_EMAIL_SECRET=yourSecret
    REFRESH_TOKEN_SECRET=yourSecret
    BCRYPT_SALT_ROUNDS=number
    SENDGRID_API_KEY=yourAPIKey
    SENDGRID_EMAIL_FROM=yourEmail
    DOMAIN=currentDomainOfTheApplication
    ```
    
   
4. Run the application
    ```js
    npm run dev
    ```


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

### BaseURL - http://localhost:3000

# ROUTES
     
## Users

  ### GET:  
  
  * / -> Get all users
  
    ```json
      [
        {
          "_id_":"ObjectId",
          "firstName":"string",
          "lastName":"string",
          "email": "string", 
          "dateOfBirth": "string",
          "emailVerified": false,
          "createDate": "Date.now()"
        }
      ]
     ```

     ```js
       return res.status(200).json(users) 
     ```
  * /:userId -> Get user by Id
     
     - Expected Response: 
     ```json
       {
          "_id_":"ObjectId",
          "firstName":"string",
          "lastName":"string",
          "email": "string", 
          "dateOfBirth": "string",
          "emailVerified": false,
          "createDate": "Date.now()"
        }
     ```

     ```js
       return res.status(200).json(user) 
     ```
  * /validation/:verificationToken -> Verify email from an user
     
     - Expected Response: 
  
     ```js
       return res.status(200).send('Email verified') 
     ```
     
  ### POST:
     
  * / -> Create user, register an user at database and send email for email verification
  
    - Expected Request Body:
     ```json
       {
          "firstName":"string",
          "lastName":"string",
          "email": "string", 
          "dateOfBirth": "string"
        }
     ```

     - Expected Response: 
     ```json
       {
          "_id":"number",
          "firstName":"string",
          "lastName":"string",
          "email": "string", 
          "dateOfBirth": "string",
          "emailVerified": false,
          "createDate": "Date.now()"
        }
     ```

     ```js
       return res.status(201).json(user) 
     ```
     
  ### PATCH:
     
  * /:userId -> Update user data by user Id
        
   - Expected Request Body:
     ```json
       {
          "fieldToUpdate":"value",
         ...
        }
     ```

      - Expected Response: 
     ```json
       {
          "_id":"number",
          "firstName":"string",
          "lastName":"string",
          "email": "string", 
          "dateOfBirth": "string",
          "emailVerified": "boolean",
          "createDate": "Date"
        }
     ```
     ```js
       return res.status(200).json(updatedUser) 
     ```
## Vendors

  ### GET:  
  
  * /engagement -> Make a bearer authentication with JWT(access and refresh tokens) then get engagement metric from the authenticated vendor
  
    - Expected Request Header:
     ```header
       Authorization: 'Bearer JWThash'
     ```

     - Expected Response: 
     ```js
      "0-99NumberAsString"
     ```

     ```js
       return res.status(200).json(engagement) 
     ```
     
  ### POST:
     
  * / -> Create a vendor, register a vendor at database
  
    - Expected Request Body:
     ```json
       {
          "name":"string",
          "password":"string",
        }
     ```

     - Expected Response: 
     ```json
       {
          "name": "string",
          "engagement": "stringOfNumber0-99",
          "password": "hashString",
          "_id": "ObjectId",
          "createdAt": "Date.now()",
          "updatedAt": "Date.now()",
          "__v": 0
        }
     ```

     ```js
       return res.status(201).json(vendor) 
     ```
  * /login -> Make a basic authentication to generate JWT with tokens(access(JWT) and refresh) and return it.
  
    - Expected Request Header:
     ```header
       Authorization: 'Basic name:password'
     ```

     - Expected Response: 
     ```bearerToken
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWVhRaU9qRTJORE0xTXpNMk5UTXNJbVY0Y0NJNk1UWTBNelV6TnpJMU15d2ljM1ZpSWpvaU5qRm1OalJqTlRJMk5EZzVZalEzTm1OaFpUUm1aalF5SW4wLnZQbm04ZjNqaUY0OERycWtDbDhXRUJTSDViZ0JEMFZmeUdlX09ELWVQNlkiLCJyZWZyZXNoVG9rZW4iOiJ7XCJhY2Nlc3NJZFwiOlwiNjFmNjRjNTI2NDg5YjQ3NmNhZTRmZjQyXCIsXCJzZWNyZXRcIjpcIiQyYiQxMCRyRWhFU2J2SW5aenBtWEk2VUFQb21PdG9RMnZCQkFPTWlvVklMc3FwSEFJLzRhMkdUNHBzQ1wiLFwiZXhwaXJlc0luXCI6MTY0NjEyNTU4MjEwMSxcIl9pZFwiOlwiNjFmNjU1NTYxZmJjYWQxZjAxNzMyMTVjXCIsXCJfX3ZcIjowfSIsImlhdCI6MTY0MzUzMzY1NCwiZXhwIjoxNjQ2MTI1NjU0fQ.17itBCsqxsuNrOFNfII5JA-_XsY6JNsI3kAS98ZccwY"
     ```

     ```js
       return res.status(200).json(token) 
     ```
     
  ### PUT:
     
  * /engagement ->  Make a bearer authentication with JWT(access and refresh tokens) then update engagement metric from the authenticated vendor

  - Expected Request Header:
     ```header
       Authorization: 'Bearer JWThash'
     ```
        
   - Expected Request Body:
     ```json
       {
          "engagement":"0-99NumberAsString",
        }
     ```

     - Expected Response: 
     ```json
       {
          "name": "string",
          "engagement": "stringOfNumber0-99",
          "password": "hashString",
          "_id": "ObjectId",
          "createdAt": "Date.now()",
          "updatedAt": "Date.now()",
          "__v": "number"
        }
     ```
     ```js
       return res.status(200).json(updatedVendor) 
     ```
## Census

  ### GET:  
  
  * /:clientName -> Get the census users of client name
  
     - Expected Response: 
     ```json
      [  
        {
          "_id": "ObjectId",
          "name": "string",
          "dateOfBirth": "DateInString",
          "clientName": "string",
        }
      ]
     ```

     ```js
       return res.status(200).json(census);
     ```
     
  ### POST:
     
  * / -> Upload a .csv with data of the census and stores it in database
  
    - Expected Request file:
     ```file
       file.csv containing the list of people in census as "name,date of birth"
     ```

     - Expected Response: 
     ```js
      "Success"
     ```

     ```js
       return res.status(201).send('Success');
     ```
  

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Mario Andres Doncel Neto  

Email - 88mario.doncel@gmail.com <br>
Whatsapp - +55 19 99612 9909

Project Link: [https://github.com/MarioDoncel/StandardCare-API-Test](https://github.com/MarioDoncel/StandardCare-API-Test)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Ryan Stellar

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
