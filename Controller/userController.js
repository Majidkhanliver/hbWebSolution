const User = require('../Models/admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const saltRounds = 10;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "laptopuseonlyy@gmail.com",
        pass: "#",
    },
});
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
            console.log(user)
            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ username: user.userName, isAdmin: user.isAdmin }, process.env.JWT_SEC);
                // jwt.sign(user, "Majid", (err, token) => {
                //     if (err)
                //         res.json({ error: "Error while creating token" });
                res.json(token)

                // })
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
};
const generateToken = (req, res, next) => {
    const email = req.body.email;
    let token;
    User.findOne({ email: email }).then((user) => {
        if (user) {
            console.log(user)
            crypto.randomBytes(32, (err, buffer) => {
                if (err) {
                    console.log(error)
                    return res.json({ error: "Error while generateToken" })
                }
                console.log(buffer)
                token = buffer.toString('hex')

                console.log(token)
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 1000 * 60 * 60;
                user.save().
                    then((result) => {
                        console.log(token)
                        res.json({ 'Mail': "Rest Mail sent" });
                        transporter.sendMail({
                            to: req.body.email,
                            from: 'laptopuseonlyy',
                            subject: 'Password Reset',
                            html: `Click <a href="http:localhost:3000/newPassword/${token}> here to reset your password`
                        }).then((result) => {
                            console.log(result)
                        })

                    })
            })
        }
        else {
            return res.json({ error: "user not found" })
        }
    }).then((result) => console.log(result)).
        catch(err => console.log(err))
}
const postNewPassword = async (req, res, next) => {
    const token = req.params.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(token)
    let user1 = await User.findOne({ resetToken: token });
    // 7e7680dec0a296a72552c42897f191b72f5032fa2a9551bc08048e2e7a39a59a
    console.log(user1);
    if (user1) {
        if (user1.resetTokenExpiration > Date.now()) {
            const hash = bcrypt.hashSync(password, saltRounds);
            user1.password = hash;
            user1.resetToken = undefined;
            user1.resetTokenExpiration = undefined;
            await user1.save();
            res.json({ message: "Password Changed Successfully" })
        } else {
            res.json({ error: "Token expired" });
            user1.resetToken = undefined;
            user1.resetTokenExpiration = undefined;
            await user1.save();
        }
    }
    else {
        return res.json({ error: "Invalid token" })
    }

}
module.exports = { signup, login, generateToken, postNewPassword };