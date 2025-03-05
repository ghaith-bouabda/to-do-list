# to-do-list
To-Do List Application

Overview

This is a full-stack To-Do List application designed to help users manage their tasks efficiently. The application features a Spring Boot backend and an Angular frontend, providing a seamless user experience.

Features

User Authentication: Secure login and registration system.

Task Management: Create, read, update, and delete tasks.

Responsive Design: Accessible on various devices.

Technologies Used

Backend

Spring Boot,

Spring Security,

Spring Data JPA (Hibernate),

Database: Configured to work with PostgreSQL.

Frontend

Angular: Framework for building the user interface.

Installation & Setup

Prerequisites

Java Development Kit (JDK) 8 or higher

Node.js and npm: Required for Angular development.

Angular CLI: To serve and build the Angular application.

Maven: For building the Spring Boot application.

Database: PostgreSQL .

Backend Setup

Clone the repository:

git clone https://github.com/ghaith-bouabda/to-do-list.git
cd to-do-list/todolistbackend

Configure the database:

Update application.properties or application.yml with your database settings.

Example for H2 (in-memory database):

spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

Build and run the application:

mvn clean install
mvn spring-boot:run

The backend will be accessible at http://localhost:8080.

Frontend Setup

Navigate to the frontend directory:

cd ../todolistfrontend

Install dependencies:

npm install

Serve the application:

ng serve

The frontend will be accessible at http://localhost:4200.

API Endpoints

Authentication

POST /auth/register: Register a new user.

POST /auth/login: Authenticate a user.

Tasks

GET /api/tasks: Retrieve all tasks.

POST /api/tasks: Create a new task.

PUT /api/tasks/{id}: Update an existing task.

DELETE /api/tasks/{id}: Delete a task.

Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

License

This project is licensed under the MIT License.

