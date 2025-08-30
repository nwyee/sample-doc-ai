# Introduction

## User Management API

Welcome to the User Management API documentation. This API provides a robust framework for handling user data in your application, including secure authentication, comprehensive CRUD operations, and effective error handling mechanisms.

### Features

* **Authentication**: Secure user login and token-based authentication to safeguard user information.
* **CRUD Operations**: Create, Read, Update, and Delete operations for managing user data efficiently.
* **Error Handling**: Clear and descriptive error messages to streamline debugging and improve user experience.

Dive into this documentation to understand how to integrate and leverage our API to enhance your application's user management capabilities.

### Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm run dev
```

3. Test the API:

```bash
curl http://localhost:3000/health
```

### API Endpoints

* `GET /health` - Health check
* `GET /api/users` - Get all users
* `GET /api/users/:id` - Get user by ID
* `POST /api/users` - Create new user
* `PUT /api/users/:id` - Update user
* `DELETE /api/users/:id` - Delete user

### Testing

Test user creation:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "password123"
  }'
```
