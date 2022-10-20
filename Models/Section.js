const mongoose = require('mongoose');
const section = new mongoose.Schema(
    {
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "class"
        },
        SectionName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        }
    }
)
module.exports = mongoose.model('section', section);