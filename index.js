// const express = require('express'),
//     app = express();
//     bodyparser = require('body-parser');
// require('express-async-errors')


// const bodyParser = require('body-parser');
// const db = require('./db'),
//     employeeRoutes = require('./controller/employee.controller')

// //middleware
// app.use(bodyparser.json())
// app.use('/api/employees',employeeRoutes)

// app.use((err,req,res,next) => {
//     console.log(err)
//     res.status(err.status || 500).send('Something went wrong')
// })


// //make sure db connection is successful
// // then start the express server
// db.query("SELECT 1")
// .then(() => {
//     console.log('db connection is successfull')
//     app.listen(3000,
//         () => console.log('server started at 3000'))
// })
// .catch(err => console.log('db connection failed. \n' . err))


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
        process.exit(1); // Exit process if DB connection fails
    });
