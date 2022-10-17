import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.json('required fields: name, email, password')
    };
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        const newUser = new user({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json('New user created')
    } catch (error) {
        console.log(error)
        return res.json('Server error')
    }

}

export const login = async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.json('required fields: email, password')
    };
    try {
        const user = await User.findOne({email: req.body.email}).select(
            'name email password'
        );
        if(!user){
            return res.status(404).json("no user found");
        }
        const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.json('Incorrect password')
        }
        const payload = {
            id: user._id,
            name: user.name
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        return res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({'message': "login successful"})
    } catch (error) {
        console.log(error);
        return res.json('server error');
    }
}
