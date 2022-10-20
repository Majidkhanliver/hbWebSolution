const mongoose = require('mongoose');
const students = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trime: true,
        },
        lastName: {
            type: String,
            required: true,
            trime: true,
        },
        fathersName:
        {
            type: String,
            required: true,
            trime: true,
        },
        mothersName:
        {
            type: String,
            required: true,
            trime: true,
        },
        mobileNo: Number,
        whatsAppNo: Number,
        emailId: {
            type: String,
            unique: true,
            required: true
        },
        DOB:
        {
            type: Date
        },
        Address: {
            street: String,
            city: String,
            state: String,
            pinCode: Number,
            country: String
        },
        ClassId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'section'
        }
    }

)
module.exports = mongoose.model('Student', students)