Core Dependencies
1. express
Why: A minimal and flexible web framework for building RESTful APIs.

Use: To handle HTTP routes like /register, /login, /appointments, etc.

2. mongoose
Why: An ODM (Object Data Modeling) tool for MongoDB.

Use: To define models like User, Appointment, and easily interact with MongoDB using JavaScript syntax.

3. cors
Why: Stands for Cross-Origin Resource Sharing.

Use: Allows your backend (e.g., running on localhost:5000) to be accessed from a frontend running on a different port (e.g., localhost:4200 with Angular).

4. dotenv
Why: Loads environment variables from a .env file into process.env.

Use: Store sensitive config like:

env
Copy code
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=mysecret

5. bcryptjs
Why: A JavaScript library for hashing passwords.

Use: To securely hash user passwords before storing them in the database:

6. jsonwebtoken
Why: For creating and verifying JSON Web Tokens (JWT).

Use: Manage sessions and protect routes like /profile or /appointments by requiring a valid token.

7. express-validator
Why: Middleware to validate and sanitize request inputs.

Use: Prevent invalid form data on registration, login, etc. Example:

8. nodemon
Why: A development tool that automatically restarts the server on code changes.

Use: Improves productivity so you don't have to manually restart your server after every edit.
