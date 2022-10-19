import User from '../models/user.js'

export const getUserInfo = async (req, res, next) => {
    try {
        const data = await User.findById(req.user.id).select('name email customers');
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            email: req.body.email,
        },{
            new: true
        }).select('name email');
        return res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
}
