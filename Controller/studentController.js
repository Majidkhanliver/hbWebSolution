const { response } = require("express");
const { default: mongoose } = require("mongoose");
const Student = require("../Models/Student")

const addStudent = async (req, res) => {
    const { firstName, lastName, fathersName, mothersName, mobileNo, whatsAppNo, emailId, DOB } = req.body;
    const { street, city, state, country, pinCode } = req.body.Address;
    try {
        const student = new Student({

            firstName: firstName,
            lastName: lastName,
            fathersName: fathersName,
            mothersName: mothersName,
            mobileNo: mobileNo,
            whatsAppNo: whatsAppNo,
            emailId: emailId,
            DOB: DOB,
            Address: {
                street: street,
                city: city,
                state: state,
                pinCode: pinCode,
                country: country,
            },
        })
        let doc = await student.save();
        return res.status(201).json(doc);
    } catch (err) {
        console.log(err);
        res.json(err)
    }
}
const getAllStudents = async (req, res) => {
    try {
        let students = await Student.find();
        return res.status(200).json(students);
    } catch (err) {
        res.json(err);
    }
}
const getStudent = async (req, res) => {
    console.log(req.params.id.length)
    var id = req.params.id.length == 24 ? mongoose.Types.ObjectId(req.params.id) : null;
    try {
        console.log(id)
        let student = await Student.findOne({ _id: id })
        console.log(student)
        res.status(200).json(student);

    } catch (err) {
        console.log(err); res.json(err);
    }
}
const updateStudent = async (req, res) => {

    const { firstName, lastName, fathersName, mothersName, mobileNo, whatsAppNo, emailId, DOB } = req.body;
    const { street, city, state, country, pinCode } = req.body.Address;
    try {
        var id = req.params.id.length == 24 ? mongoose.Types.ObjectId(req.params.id) : null;
        var student = await Student.findOneAndUpdate({ _id: id }, {
            $set: {
                firstName: firstName,
                lastName: lastName,
                fathersName: fathersName,
                mothersName: mothersName,
                mobileNo: mobileNo,
                whatsAppNo: whatsAppNo,
                emailId: emailId,
                DOB: DOB,
                Address: {
                    street: street,
                    city: city,
                    state: state,
                    pinCode: pinCode,
                    country: country,
                }
            }
        });
        res.status(200).json(student);
    } catch (err) { res.json(err) }
}
const deleteStudent = async (req, res) => {
    var id = req.params.id.length == 24 ? mongoose.Types.ObjectId(req.params.id) : null;
    try {
        let doc = await Student.deleteOne({ _id: id });
        res.status(200).json(doc);
    } catch (err) {
        res.json(err);
    }
}
module.exports = { addStudent, getAllStudents, getStudent, updateStudent, deleteStudent }