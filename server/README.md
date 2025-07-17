# Task Management API Server

This is the backend server for a simple Task Management application, providing a RESTful API for managing tasks, projects, priorities, and users. It includes authentication, role-based access control, and API documentation.

## Features

-   **User Authentication:** Secure login with JWT (JSON Web Tokens).
-   **Role-Based Access Control (RBAC):**
    -   **Administrator:** Full CRUD access to all resources, including user management.
    -   **Abteilungsleiter (Department Head):** Can create, read, update, and delete tasks, projects, and priorities. Can assign tasks to any user.
    -   **Mitarbeiter (Employee):** Can read all tasks, projects, and priorities. Can mark their own assigned tasks as done.
-   **Task Management:** Create, read, update, and delete tasks with details like title, description, due date, completion status, priority, project, and assigned user.
-   **Project Management:** Create, read, update, and delete projects.
-   **Priority Management:** Create, read, update, and delete task priorities.
-   **User Management:** (Admin only) Create, read, update, and delete user accounts.
-   **API Documentation:** Interactive Swagger UI for exploring and testing API endpoints.

## Technologies Used

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web application framework for Node.js.
-   **SQLite3:** Lightweight, file-based relational database.
-   **JWT (jsonwebtoken):** For secure authentication.
-   **bcrypt:** For password hashing.
-   **CORS:** Middleware for enabling Cross-Origin Resource Sharing.
-   **Swagger UI Express & Swagger JSDoc:** For generating and serving interactive API documentation.

## Setup

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm (Node Package Manager)
-   Docker (optional, for containerized deployment)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-repo/your-project.git
    cd your-project/server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Database

The server uses a SQLite database (`database.sqlite`) located in the `server/` directory. If the database file does not exist when the server starts, it will be automatically created, and initial tables (users, tasks, projects, priorities) will be set up with some default data (admin, abteilungsleiter, mitarbeiter users, and example projects/priorities).

If you encounter issues with duplicate entries for projects or priorities, you might need to delete the `database.sqlite` file and restart the server to regenerate a clean database with unique constraints applied.

## Running the Server

To start the server, navigate to the `server/` directory and run:

```bash
npm start
```

The server will typically run on `http://localhost:3000`.

### Accessing API Documentation (Swagger UI)

Once the server is running, open your web browser and navigate to:

`http://localhost:3000`

This will display the interactive Swagger UI, where you can explore all available API endpoints, their request/response schemas, and test them directly.

## API Endpoints Overview

The API provides the following main endpoint categories:

-   `/auth`: User login and registration (admin only for registration).
-   `/users`: User management (admin only).
-   `/tasks`: Task CRUD operations.
-   `/projects`: Project CRUD operations.
-   `/priorities`: Priority CRUD operations.

Refer to the Swagger UI for detailed information on each endpoint.

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected routes, you must:

1.  Log in via `/auth/login` to obtain a JWT token.
2.  Include this token in the `Authorization` header of subsequent requests as a Bearer token (e.g., `Authorization: Bearer YOUR_JWT_TOKEN`).

## Docker

You can also run the server using Docker. Ensure you have Docker installed.

1.  Navigate to the `server/` directory.
2.  Build the Docker image (for Linux platform):
    ```bash
    docker build --platform linux/amd64 -t task-management-server .
    ```
3.  Run the Docker container:
    ```bash
    docker run -p 3000:3000 task-management-server
    ```
    The server will be accessible at `http://localhost:3000`.

## Testing

The `test.http` file in the `server/` directory contains example HTTP requests for various API endpoints. You can use a REST client (like VS Code's REST Client extension) to execute these requests and test the API functionality.