import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const comparePassword = (password, hash) =>{
    return bcrypt.compare(password, hash);
}
export const hashPassword = (password) =>{
    return bcrypt.hash(password, 5);
}

export const createToken = (user) =>{
    const token = jwt.sign({id: user.id, username:user.username}, process.env.JWT_SECRET)
    return token;   
}

export const protect = (req, res, next)=>{

    const bearer = req.headers.authorization;

    if(!bearer){
        return res.status(401).json({ message: 'Not authorized-bearer'});
    } 

    const token = bearer.split(" ")[1];

    if(!token) {
        console.log('here');
        return res.status(401).json({ message: 'Not authorized-token'});
    } 

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        console.log(payload);
        next();
        return;
    }
    catch(e){
        console.error(e);
        res.status(401).json({ message: 'Not valid token'});
        return;
    }


}