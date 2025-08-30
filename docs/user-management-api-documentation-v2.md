---
description: >-
  Prompt: Create comprehensive API documentation for a Node.js user management
  API
---

# User Management API Documentation v2

### Base URL

`https://api.example.com/v1`

### Authentication

All API requests require an API key. Include it in the headers as `Authorization: Bearer <API_KEY>`.

### Endpoints

#### Get All Users

* **URL**: `/users`
* **Method**: `GET`
* **Headers**: `Authorization: Bearer <API_KEY>`
* **Response**: JSON array of user objects

#### Get User by ID

* **URL**: `/users/{id}`
* **Method**: `GET`
* **Headers**: `Authorization: Bearer <API_KEY>`
* **Response**: JSON object of the user details

#### Create User

* **URL**: `/users`
* **Method**: `POST`
* **Headers**: `Authorization: Bearer <API_KEY>`
* **Request Body**: JSON object
  * `name`: string (required)
  * `email`: string (required)
  * `password`: string (required)
* **Response**: JSON object of the created user

#### Update User

* **URL**: `/users/{id}`
* **Method**: `PUT`
* **Headers**: `Authorization: Bearer <API_KEY>`
* **Request Body**: JSON object
  * `name`: string
  * `email`: string
* **Response**: JSON object of the updated user

#### Delete User

* **URL**: `/users/{id}`
* **Method**: `DELETE`
* **Headers**: `Authorization: Bearer <API_KEY>`
* **Response**: Success message

### Error Codes

* **400**: Bad Request
* **401**: Unauthorized
* **404**: Not Found
* **500**: Internal Server Error

For further details, contact support at support@example.com.
