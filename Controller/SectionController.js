const classModel = require('../Models/class');
const section = require('../Models/Section');
const mongoose = require('mongoose');
const Section = require('../Models/Section');
const ObjectId = mongoose.Types.ObjectId
const addSection = async (req, res) => {
    try {
        console.log(req.body.id)
        let id = req.body.id.length == 24 ? new ObjectId(req.body.id) : null;
        console.log('id')
        let sectionName = req.body.section;
        let doc = await classModel.findById(id);
        console.log(doc)
        if (doc) {
            try {
                let newSection = new Section({ classId: id, SectionName: sectionName });
                console.log(newSection)
                let doc2 = await newSection.save();
                res.json(doc2);

            } catch (err) {
                res.json(err)
            }
        }
        else {
            res.json({ "error": "Specified class Not Found" });
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}
const getSection = async (req, res) => {
    var sectionId = req.params.id;
    let id = req.params.id.length == 24 ? new ObjectId(req.body.id) : null;
    try {
        let doc = await section.findById(sectionId).populate("classId");
        res.json(doc);
    } catch (err) {
        console.log(err)
        res.json(err);

    }
};
const updateSection = async (req, res) => {
    console.log(req.params.id)
    var sectionId = req.params.id;
    let id = sectionId.length == 24 ? new ObjectId(req.body.id) : null;
    console.log(req.body)
    console.log(id)
    try {
        let doc = await section.findByIdAndUpdate(id, { $set: req.body }).
            res.json(doc);
    } catch (err) {
        console.log(err)
        res.json(err);
    }
};
const getAll = async (req, res) => {
    try {
        let doc = await section.find({}).populate("classId");
        res.json(doc);
    } catch (err) {
        res.json(err);
    }
}
const deleteSection = async (req, res) => {
    const sectionId = req.params.id;
    const id = sectionId.length == 24 ? new ObjectId(sectionId) : null
    try {
        let doc = await section.deleteOne({ _id: id });
        res.json(doc);
    } catch (err) {
        console.log(err)
        res.json(err);
    }
}
module.exports = { addSection, getSection, getAll, deleteSection, updateSection }