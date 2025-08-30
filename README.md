# Sample User API

A simple REST API for user management, perfect for testing GitBook AI documentation.

## Quick Start

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

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Testing

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