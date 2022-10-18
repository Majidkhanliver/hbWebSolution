const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./util/db')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const userRoute = require('./Routes/userRoute');
const classRoute = require('./Routes/classRoutes');
const studentRoute = require('./Routes/studentRoute');
app.use('/classes', classRoute);
app.use('/admin', userRoute);
app.use('/students', studentRoute);
app.listen(3000, () => console.log('listening on port 3000'));