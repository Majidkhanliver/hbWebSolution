const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Majid:Majid123@cluster0.y6blzyy.mongodb.net/hbWebSol?retryWrites=true&w=majority').
    then((res) => console.log('connected')).catch((err) => console.log(err))
module.exports = mongoose;