const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('../cloudinary/cloudinary')

exports.Signup = async (req, res) => {

    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        return res.status(401).json({ message: 'All fields required..', success: false })
    }

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).json({ message: 'User already exists..', success: false })
        }

        let profileImageUrl = ''
        if(req.file){
           const result =  await cloudinary.uploader.upload(req.file.path)
           profileImageUrl = result.secure_url;
        }

        let hashedPassword;
        const salt = await bcrypt.genSalt(10)
        hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, password: hashedPassword, role,profileImage:profileImageUrl })
        await newUser.save()

        return res.status(201).json({ message: 'User signedUp Successfully..', success: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }

}

exports.Login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(401).json({ message: 'Fill all the fields..', success: false })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not exists..', success: false })
        }

        const matchedPassword = await bcrypt.compare(password, user.password)
        if (!matchedPassword) {
            return res.status(402).json({ message: 'Invalid Password', success: false })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).json({ message: 'User LoggedIn Successfully..', success: true, token, role: user.role })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }

}


exports.getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not exists', success: false })
        }
        return res.status(200).json({ message: 'User found By Id', success: true, user })
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}