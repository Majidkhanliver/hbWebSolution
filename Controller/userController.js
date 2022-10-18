const User = require('../Models/admin')
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({ userName: email, password: hash });
    try {
        let doc = await newUser.save();
        res.json(doc)
    } catch (err) {
        console.log(err);
        res.json(err)
    }

}
const login = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const user = await User.findOne(({ userName: username }))
        if (user) {
            console.log(user.password)
            if (bcrypt.compareSync(password, user.password)) {
                res.json({ 'messaged': "logged In" })
            } else {
                res.status(401).json({ message: ' password is incorrect' })
            }
        }
        else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.json(err)
    }
}
module.exports = { signup, login };