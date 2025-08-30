# Endpoints

> _<mark style="color:$success;">Generate complete documentation for these API endpoints: GET /api/users, POST /api/users, PUT /api/users/:id, DELETE /api/users/:id with request/response examples</mark>_

### API Endpoints Documentation

#### GET /api/users

**Description**: Retrieve a list of all users.

**Request**:

```
GET /api/users HTTP/1.1
Host: yourapi.com
```

**Response**:

```json
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "id": "2",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  ]
}
```

#### POST /api/users

**Description**: Create a new user.

**Request**:

```
POST /api/users HTTP/1.1
Host: yourapi.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response**:

```json
{
  "status": "success",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### PUT /api/users/:id

**Description**: Update an existing user's information by ID.

**Request**:

```
PUT /api/users/1 HTTP/1.1
Host: yourapi.com
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "johnupdated@example.com"
}
```

**Response**:

```json
{
  "status": "success",
  "data": {
    "id": "1",
    "name": "John Doe Updated",
    "email": "johnupdated@example.com"
  }
}
```

#### DELETE /api/users/:id

**Description**: Delete an existing user by ID.

**Request**:

```
DELETE /api/users/1 HTTP/1.1
Host: yourapi.com
```

**Response**:

```json
{
  "status": "success",
  "message": "User deleted successfully"
}
```
