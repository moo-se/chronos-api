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

const PORT = process.env.PORT || 9000;

/**
 * Custom Middleware
const mid = (msg) => (req,res,next)=>{
    console.log(msg)
    next()
}
app.use(mid('Hi, World!'))
 */

app.use('/api',protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.get('/', (req,res)=>{
     res.sendFile(path.resolve("pages/index.html"))
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
} )