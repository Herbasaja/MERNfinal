import User from '../models/user.js'

export const getUserInfo = async (req, res, next) => {
    try {
        const data = await User.findById(req.user.id).select('name email customers');
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
};