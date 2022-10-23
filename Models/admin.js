const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: true
        },
        resetToken: String,
        resetTokenExpiration: Date,
    }
)
module.exports = mongoose.model('User', userSchema);