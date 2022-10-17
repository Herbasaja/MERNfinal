import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.cookies.access_token; 
    if(!token){
        return res.json('no token available');
    }
    return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            return res.json('invalid token');
        }else{
            req.user = decoded;
            return next();
        }
    })
}