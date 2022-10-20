const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).
    then((res) => console.log('connected')).catch((err) => console.log(err))
module.exports = mongoose;