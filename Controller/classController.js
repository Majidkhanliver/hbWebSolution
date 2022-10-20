const ClassModel = require('../Models/class');
const ObjectId = require('mongoose').Types.ObjectId;
const getClasses = async (req, res) => {
    try {
        let classes = await ClassModel.find()
        res.status(200).json(classes)
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}
const postClass = async (req, res) => {
    try {
        let classe = new ClassModel({ name: req.body.name, capacity: req.body.capacity });
        await classe.save();
        res.status(200).json(classe)
    } catch (err) {
        console.log(err)
        res.json(err);
    }
}
const getClass = async (req, res) => {
    let classId = req.params.id;
    const id = req.classId.length == 24 ? new ObjectId(classId) : null;
    try {
        let doc = await ClassModel.find({ _id: id })
        res.json(doc);

    } catch (err) {
        console.log(err)
        res.json(err)
    }

}
const updateClass = async (req, res) => {
    let classId = req.params.id;
    const id = classId.length == 24 ? new ObjectId(classId) : null;
    try {
        let classe = await ClassModel.findOneAndUpdate(id, { $set: req.body })
        res.status(200).json(classe)
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
}
const delteClass = async (req, res) => {
    console.log(req.params.id)
    try {
        let classId = req.params.id.length == 24 ? new ObjectId(req.params.id) : null;
        console.log(classId);
        let doc = await ClassModel.deleteOne({ _id: classId })
        res.status(200).json(doc)
    } catch (err) {
        res.json(err);
    }
}
module.exports = { getClasses, postClass, updateClass, delteClass, getClass }