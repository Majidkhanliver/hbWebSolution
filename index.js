const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./util/db')
const { verifyTokenAndAuthorize } = require('./Middleware/verifyToken')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const userRoute = require('./Routes/userRoute');
app.use('/admin', userRoute);
app.use(verifyTokenAndAuthorize)
const classRoute = require('./Routes/classRoutes');
const studentRoute = require('./Routes/studentRoute');
const sectionRoute = require('./Routes/SectionRoutes');
app.use('/classes', classRoute);
app.use('/students', studentRoute);
app.use('/sections', sectionRoute);
app.listen(3000, () => console.log('listening on port 3000'));