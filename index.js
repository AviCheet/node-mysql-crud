const express = require('express');
const app = express();
const db = require('./db');
const employeeRoutes = require('./controller/employee.controller');
require('express-async-errors');

// Middleware
app.use(express.json()); // Use express's built-in JSON parser
app.use('/api/employees', employeeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({ message: 'Something went wrong' });
});

// Define PORT (use assigned port from hosting or default to 3000)
const PORT = process.env.PORT || 3000;

// Ensure database connection is successful before starting the server
db.query("SELECT 1")
    .then(() => {
        console.log('✅ Database connection successful');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
        process.exit(1); // Exit process if DB connection fails..
    });
