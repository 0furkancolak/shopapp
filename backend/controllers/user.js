const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        console.log(users);
        res.status(200).send({ users })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).send("Hatalı e-posta!")
        }
        const isSuccess = await bcrypt.compare(password, user.password)
        if (!isSuccess) {
            return res.status(401).send("Hatalı parola!!!")
        }

        const accessToken = await jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY
        )

        res.status(200).send({
            status: "OK",
            token: accessToken,
            user: user
        })
    } catch (error) {
        console.log("Login error" + err);
    }
}

const register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body
    try {
        const findUser = await User.findOne({ email: email })
        if (findUser) {
            return res.status(401).send({ msg: "Böyle bir kullanıcı mevcut!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            isAdmin: isAdmin
        });
        await user.save();
        res.status(200).send({ msg: "Kayıt başarılı!" })

    } catch (error) {
        console.log("register error" + error);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id)
        res.status(200).send({ msg: "User deleted" })
    } catch (error) {
        console.log("Delete user error" + error);
    }
}


module.exports = {
    getUsers,
    login,
    register,
    deleteUser
}