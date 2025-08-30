# API Document by Claude

## User Management API Documentation

### Overview

The User Management API is a RESTful service that provides comprehensive user account management functionality. Built with Node.js and Express, this API offers secure endpoints for creating, reading, updating, and deleting user accounts with built-in validation and error handling.

### Base URL

```
http://localhost:3000/api
```

### Authentication

Currently, this API operates without authentication for development purposes. In production, implement proper authentication mechanisms.

### Response Format

All API responses follow a consistent structure:

#### Success Response

```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... } // (for paginated endpoints)
}
```

#### Error Response

```json
{
  "success": false,
  "error": "Error message description"
}
```

### Endpoints

#### GET /api/users

Retrieves a paginated list of all users in the system.

**Parameters:**

| Parameter | Type    | Required | Default | Description                |
| --------- | ------- | -------- | ------- | -------------------------- |
| page      | integer | No       | 1       | Page number for pagination |
| limit     | integer | No       | 10      | Number of users per page   |

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=5"
```

**Response Example:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-08-30T10:00:00.000Z"
    },
    {
      "id": 2,
      "email": "jane@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "createdAt": "2024-08-30T10:05:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalUsers": 2
  }
}
```

**Error Responses:**

* **400 Bad Request**: Invalid pagination parameters

***

#### GET /api/users/:id

Retrieves a specific user by their unique ID.

**Parameters:**

| Parameter | Type    | Required | Description             |
| --------- | ------- | -------- | ----------------------- |
| id        | integer | Yes      | User ID (URL parameter) |

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/users/1"
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-08-30T10:00:00.000Z"
  }
}
```

**Error Responses:**

* **404 Not Found**: User with specified ID does not exist

***

#### POST /api/users

Creates a new user account in the system.

**Request Body:**

| Field     | Type   | Required | Constraints          | Description          |
| --------- | ------ | -------- | -------------------- | -------------------- |
| email     | string | Yes      | Valid email format   | User's email address |
| firstName | string | Yes      | 2-50 characters      | User's first name    |
| lastName  | string | Yes      | 2-50 characters      | User's last name     |
| password  | string | Yes      | Minimum 8 characters | User's password      |

**Request Example:**

```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "firstName": "New",
    "lastName": "User",
    "password": "securepassword123"
  }'
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "email": "newuser@example.com",
    "firstName": "New",
    "lastName": "User",
    "createdAt": "2024-08-30T11:00:00.000Z"
  }
}
```

**Error Responses:**

* **400 Bad Request**: Validation error (invalid email, short password, missing fields)
* **409 Conflict**: Email address already exists

***

#### PUT /api/users/:id

Updates an existing user's information.

**Parameters:**

| Parameter | Type    | Required | Description             |
| --------- | ------- | -------- | ----------------------- |
| id        | integer | Yes      | User ID (URL parameter) |

**Request Body (all fields optional):**

| Field     | Type   | Required | Constraints        | Description       |
| --------- | ------ | -------- | ------------------ | ----------------- |
| email     | string | No       | Valid email format | New email address |
| firstName | string | No       | 2-50 characters    | New first name    |
| lastName  | string | No       | 2-50 characters    | New last name     |

**Request Example:**

```bash
curl -X PUT "http://localhost:3000/api/users/1" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Johnny",
    "lastName": "Doe"
  }'
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "Johnny",
    "lastName": "Doe",
    "createdAt": "2024-08-30T10:00:00.000Z"
  }
}
```

**Error Responses:**

* **400 Bad Request**: Validation error
* **404 Not Found**: User with specified ID does not exist
* **409 Conflict**: Email already exists (when updating email)

***

#### DELETE /api/users/:id

Permanently removes a user from the system.

**Parameters:**

| Parameter | Type    | Required | Description             |
| --------- | ------- | -------- | ----------------------- |
| id        | integer | Yes      | User ID (URL parameter) |

**Request Example:**

```bash
curl -X DELETE "http://localhost:3000/api/users/1"
```

**Response Example:**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Responses:**

* **404 Not Found**: User with specified ID does not exist

### Error Handling

#### HTTP Status Codes

| Code | Status                | Description                               |
| ---- | --------------------- | ----------------------------------------- |
| 200  | OK                    | Request successful                        |
| 201  | Created               | Resource created successfully             |
| 400  | Bad Request           | Invalid request data or parameters        |
| 404  | Not Found             | Requested resource not found              |
| 409  | Conflict              | Resource conflict (e.g., duplicate email) |
| 500  | Internal Server Error | Server encountered an error               |

#### Error Response Format

All errors follow this structure:

```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

### Rate Limiting

Currently, no rate limiting is implemented. For production use, consider implementing:

* Request throttling per IP
* API key-based rate limiting
* User-specific request limits

### Getting Started

#### Prerequisites

* Node.js 16+ installed
* npm or yarn package manager

#### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd user-management-api
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the server:**

```bash
npm run dev
```

4. **Verify installation:**

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "OK",
  "timestamp": "2024-08-30T11:00:00.000Z",
  "uptime": 123.456
}
```

### Testing Guide

#### Quick Test Commands

**Test user creation:**

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "testpass123"
  }'
```

**Test user retrieval:**

```bash
curl http://localhost:3000/api/users
```

**Test user update:**

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName": "Updated"}'
```

**Test user deletion:**

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Troubleshooting

#### Common Issues

**Port Already in Use**

```bash
Error: listen EADDRINUSE :::3000
```

Solution: Change port in .env file or kill existing process

**CORS Issues** If accessing from browser applications, ensure CORS is properly configured in server.js

**Validation Errors** Check request body format and required fields match the schema requirements

#### Support

For additional support or bug reports, please create an issue in the project repository.

***

_Documentation generated by Claude AI and maintained by the development team._
