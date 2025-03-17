This project implements an authentication module and user management APIs using Node.js, Express.js, MongoDB, and JWT. It provides the following functionalities:

User authentication with JWT (JSON Web Token)
CRUD (Create, Read, Update, Delete) APIs to manage user data

Requirements:

Node.js
Express.js
MongoDB (either local or MongoDB Atlas)
JWT (JSON Web Token) for user authentication

Features:

Authentication using JWT:

Signup: Allows users to register with a username and password.
Login: Allows users to authenticate and receive a JWT token.
Logout: Users can log out by simply clearing the token client-side (JWT is stateless, so no server-side session is required).


User Management APIs (CRUD):

Create: Create a new user via the /auth/signup endpoint.
Read: Get user details via the /user/getUser endpoint (requires authentication).
Update: Update user details via the /user/updateUser endpoint (requires authentication).
Delete: Delete a user via the /user/deleteUser endpoint (requires authentication).

For Install Dependencies: npm i

Run the Application: npm start
