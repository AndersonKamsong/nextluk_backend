const UserModel = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.getAll = async (req, res) => {
    try {
        res.status(200).json({
            "users": await UserModel.getAll()
        });
    } catch (error) {
        res.status(401).send({
            message: `Some thing went wrong check you internet connection`
        });
    }
};

exports.register = async (req, res) => {
    try {
        let {
            name,
            email,
            password,
            confirmPassword,
            userType } = req.body
        if (password.length < 8) {
            console.log("error")
            return res.status(400).send({ message: 'Password must be at least 8 characters.' });
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            console.log("error")
            return res.status(400).send({ message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.' });
        }
        if (password !== confirmPassword) {
            console.log("error")
            return res.status(400).send({ message: 'Passwords do not match.' });
        }
        const [hash, emailExist, unameExist] = await Promise.all([
            bcrypt.hash(password, 9),
            UserModel.getByEmail(email),
            UserModel.getByUname(name)
        ]);
        if (emailExist)
            return res.status(401).json({ error: 'Email Already Used' });
        if (unameExist)
            return res.status(401).json({ error: 'User name Already Used' });
        const user = new UserModel({
            username: name,
            email: email,
            password: hash,
            userType: userType
        })
        user.save()
        console.log("here");
        res.status(200).json({
            "message": "User Created Succesfully", "user": user
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({
            message: `Some thing went wrong check you internet connection`
        });
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body
        const [user] = await Promise.all([
            UserModel.getByEmail(email),
        ]);
        if (!user)
            return res.status(401).json({ error: 'Invalid email or password.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        let token = jwt.sign({
            userId: user.userId,
            username: user.username,
            email: user.email,
            userType: user.userType,
        }, process.env.TOKEN_KEY)
        user.token = token
        console.log(user);
        user.save()
        return res.status(200).json({ message: 'login successful', token: token })

    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }

}

exports.delete = async (req, res) => {
    try {
        console.log(req.body);
        const [user] = await Promise.all([
            UserModel.getByID(req.params.id),
        ]);
        if (!user)
            return res.status(401).json({ error: 'Account do not exist.' });

        // console.log(user);
        user.delete()
        res.status(201).send({ message: `User deleted successfully!` });
    }
    catch (e) {
        console.log(e)
        return res.status(501).json({ error: 'server error' })
    }
};