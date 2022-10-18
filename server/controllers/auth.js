import createError from '../utils/createError.js'
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(createError({ status: 400, message: 'Name, email and password are required' }));
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
        return next(error)
    }

}

export const login = async (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return next(createError({ status: 400, message: 'Email and password are required' }));
    };
    try {
        const user = await User.findOne({email: req.body.email}).select(
            'name email password'
        );
        if(!user){
            return next(createError({status: 404, message: 'No user found'}));
        }
        const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return next(createError({status: 400, message: 'Incorrect password'}));
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
        return next(error);
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token');
    return res.status(200).json({message: 'Logout successful'});
};

export const isLoggedIn = (req, res) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if(err){
            return res.json(false);
        }else{
            return res.json(true);
        }
    })
};