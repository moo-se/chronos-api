// import http from 'http';
import dotenv from 'dotenv';
import app from './server';

dotenv.config();
import config from './config';

const PORT = process.env.PORT || 9000;


app.listen(config.port, ()=>{
    console.log(`server is listening on port ${config.port}`)
} )

// const server = http.createServer(async(req,res)=>{
//     res.write('<h1>Hello, World!</h1>')
//     res.statusCode=200
//     res.end()
// })

// server.listen(PORT, ()=>{
//     console.log(`server is listening on port ${PORT}`)
// })