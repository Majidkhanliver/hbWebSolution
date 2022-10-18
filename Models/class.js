const { default: mongoose } = require("mongoose");

let classes = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,

        },
        capacity: Number
    }
)
module.exports = mongoose.model('class', classes);