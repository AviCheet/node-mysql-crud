const express = require('express'),
    app = express();
    bodyparser = require('body-parser');
require('express-async-errors')


const bodyParser = require('body-parser');
const db = require('./db'),
    employeeRoutes = require('./controller/employee.controller')

//middleware
app.use(bodyparser.json())
app.use('/api/employees',employeeRoutes)

app.use((err,req,res,next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong')
})


//make sure db connection is successful
// then start the express server
db.query("SELECT 1")
.then(() => {
    console.log('db connection is successfull')
    app.listen(3000,
        () => console.log('server started at 3000'))
})
.catch(err => console.log('db connection failed. \n' . err))