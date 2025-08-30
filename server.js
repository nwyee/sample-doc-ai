const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let users = [
  { id: 1, email: 'john@example.com', firstName: 'John', lastName: 'Doe', createdAt: new Date().toISOString() },
  { id: 2, email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', createdAt: new Date().toISOString() }
];
let nextId = 3;

// Validation schemas
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(8).required()
});

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50)
});

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedUsers = users.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedUsers.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt
    })),
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(users.length / limit),
      totalUsers: users.length
    }
  });
});

// GET /api/users/:id - Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt
    }
  });
});

// POST /api/users - Create new user
app.post('/api/users', (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  // Check if email already exists
  const existingUser = users.find(u => u.email === value.email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: 'Email already exists'
    });
  }

  const newUser = {
    id: nextId++,
    email: value.email,
    firstName: value.firstName,
    lastName: value.lastName,
    password: value.password, // In production: hash this!
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  // Return user without password
  const { password, ...userResponse } = newUser;
  res.status(201).json({
    success: true,
    data: userResponse
  });
});

// PUT /api/users/:id - Update user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  const { error, value } = updateUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  // Check if email already exists (if updating email)
  if (value.email) {
    const existingUser = users.find(u => u.email === value.email && u.id !== userId);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      });
    }
  }

  // Update user
  users[userIndex] = { ...users[userIndex], ...value };

  const { password, ...userResponse } = users[userIndex];
  res.json({
    success: true,
    data: userResponse
  });
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  users.splice(userIndex, 1);

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
});
