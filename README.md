# Social Media Platform for Events

This project is a social media platform where users can create, share, and interact with events. It includes essential features such as user authentication, event management, and social functionalities like comments , likes & notifications.

# Tech Stack Used

Framework:Express(NodeJs),
Language: Typescript,
ORM: Sequelize,
Database: Postgresql

# Features

-User Authentication
Implemented user registration, login, and profile management using JWT for secure authentication.

-Event Creation
Authenticated users can create new events with fields: Title, Description, Date, Time, Location, and Image.
Users can categorize events (e.g., Music, Sports, Tech).

-Event Listing
Displayed a list of events with search and filter options (e.g., by category, date).
Pagination is implemented for efficient data retrieval.

-Event Details
Provided a detailed view of an event with all relevant information.
Shows weather the post is liked or not liked by surfing user.
Users can comment on and like events, promoting interaction.

-User Interaction
Users can follow other users.
User can like on events.
User can comment on events.
Notifications are implemented for new comments, likes and new followers.
User can see each other followers.

# Prerequisites

Before running the application locally, ensure you have the following dependencies installed:

- Node.js
- npm
- PostgreSQL database

## Follow below instructions to successfully run the project

# Clone the repository

git clone git@github.com:Prabincholekhwa/socila-media-platform-for-events.git

# Navigate to the project directory

cd socila-media-platform-for-events

# Install project dependencies

npm install

# Configure .env file

# Add necessary environment variables, including database connection details.

# Run database migrations(For the first time if using new database)

npx sequelize db:migrate

# Seed the database with initial data(For the first time if using new database), Seeds Categories

npx sequelize db:seed:all

# Run App In Development Environment

npm run dev

# Run App in Production Environment

npm run build
npm run start

## Usage

To access all the features of the application, you can either log in using the following credentials:
Endpoint:localhost:4001/users/login
Method: POST
req.body:
{
"email":"Shyamgharti@gmail.com"
"password":"Hello@123"
}

Upon successful login, you will receive a token in the response. Include this token in the Authorization Headers for every request except the register and login routes to authenticate and access protected routes.

If you don't have an account, you can register by following these steps:

1. Navigate to the user registration api
   Endpoint:localhost:4001/users
   Method: POST
   req.body:
   {
   "email":"youremail@gmail.com"
   "password":"yourpassword"
   }
2. Provide your email address and choose a secure password.
3. Complete the registration process.
4. Once registered, you can log in with your new credentials and start using the application.

# If you use .env.example database credentials You can use below credentials to login

Note:Remove required ssl from database class(/src/database/config/connection & database.js) if you use local database

{
"email":"Ronaldo@gmail.com",
"password":"Hello@123"
}
or
{
"email":"Shyamgharti@gmail.com",
"password":"Hello@123"
}

# Please consider api documentation
