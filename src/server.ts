import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors'
import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

dotenv.config();

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(express.static("static"));

/**
 * Custom Middleware
const mid = (msg) => (req,res,next)=>{
    console.log(msg)
    next()
}
app.use(mid('Hi, World!'))
 */


app.get('/', (req,res)=>{
    res.json({message: 'hello'})
     //res.sendFile(path.resolve("pages/index.html"))
})

app.use('/api',protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next)=>{
    if(err.type === 'auth'){
        return res.status(401).json({message: 'unauthorized'})
    } else if(err.type === 'input'){
        return res.status(400).json({message: 'you messed up'})
    } else{
        return res.status(500).json({message: 'opps! that\'s on us'})
    }
})

export default app;
