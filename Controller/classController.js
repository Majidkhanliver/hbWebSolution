const ClassModel = require('../Models/class');
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
module.exports = { getClasses, postClass }