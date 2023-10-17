import prisma from '../db'
import { createToken, hashPassword, comparePassword } from '../modules/auth'

export const createNewUser = async (req,res, next)=>{
    try{
        const hash = await hashPassword(req.body.password)
        const user = await prisma.user.create({
            data:{
                username: req.body.username,
                password: hash
            }
        })
        const token = createToken(user)
        res.status(201).json({success: true , token})
    }catch(e){

        e.type = 'input';
        next(e)
    }
}

export const signin = async (req,res)=>{

    const user = await prisma.user.findUnique({
        where:{
            username: req.body.username
        }
    })

    const isValid = await comparePassword(req.body.password, user.password)
    if(!isValid){
        return res.status(401).json({success: false, message: 'Incorrect username or password'})
    }
    const token = createToken(user)
    res.status(201).json({success: true , token})

}