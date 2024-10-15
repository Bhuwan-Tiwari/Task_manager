# Task Management API

This project is a Task Management System API built using **Node.js**, **Express**, and **MySQL** with **Sequelize ORM**. It provides user authentication, role-based task management, and task prioritization features.

## Features

- User registration and login using **JWT** for authentication.
- Role-based task management (Admin and User roles).
- Task prioritization (`LOW`, `MEDIUM`, `HIGH`).
- Middleware to protect routes and handle user authentication.
- Error handling for invalid requests, expired tokens, and unauthorized access.
- MySQL database setup with **Sequelize ORM**.

## Technologies

- **Node.js** (Backend server)
- **Express** (Routing and middleware)
- **MySQL** (Database)
- **Sequelize ORM** (For database interaction)
- **JWT** (JSON Web Token for authentication)
- **bcrypt** (For password hashing)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Sequelize CLI](https://sequelize.org/master/manual/migrations.html)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-management-api.git
cd task-management-api
2. Install dependencies
bash
Copy code
npm install
3. MySQL Database Setup
Make sure MySQL is installed and running on your system. Create a database named task_management_db or any name of your choice.

You can do this via MySQL CLI:

bash
Copy code
mysql -u root -p
CREATE DATABASE task_management_db;
Alternatively, you can use a GUI tool like phpMyAdmin or MySQL Workbench.

4. Configure environment variables
Create a .env file in the root of your project and add your MySQL and JWT configurations:

bash
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_management_db
JWT_KEY=your_secret_key
5. Set up Sequelize and Database
You will need to initialize Sequelize and run migrations to create your models in the MySQL database.

5.1 Initialize Sequelize (if you haven't done it yet)
bash
Copy code
npx sequelize-cli init
This will generate folders like models, migrations, and config.

5.2 Update Sequelize Configuration
Modify the config/config.json file with your MySQL credentials:

json
Copy code
{
  "development": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "task_management_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  ...
}
5.3 Create User and Task Models
Generate the User and Task models using Sequelize CLI:

bash
Copy code
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,role:string
npx sequelize-cli model:generate --name Task --attributes title:string,description:string,status:enum('PENDING','SUCCESS','FAILED'),priority:enum('LOW','MEDIUM','HIGH'),userId:integer
This will create migration files and model files for both User and Task.

5.4 Run Migrations
To apply the migrations and create the database tables, run:

bash
Copy code
npx sequelize-cli db:migrate
This will create the Users and Tasks tables in your MySQL database.

6. Start the server
Now you can start the server:

bash
Copy code
npm start
The API will now be available at http://localhost:3000.

API Endpoints
User Authentication
Register User
POST /auth/register
Register a new user with email and password.

Login User
POST /auth/login
Login and receive a JWT token.

Task Management
Get All Tasks
GET /tasks
Retrieve all tasks for the authenticated user.

Get Task by ID
GET /tasks/:id
Retrieve a specific task for the authenticated user.

Create Task
POST /tasks
Create a new task for the authenticated user.

Update Task
PUT /tasks/:id
Update an existing task for the authenticated user.

Delete Task
DELETE /tasks/:id
Delete a task by ID for the authenticated user.

