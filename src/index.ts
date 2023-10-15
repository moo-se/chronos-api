import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT =  3001

const server = http.createServer(async(req,res)=>{
    res.write('<h1>Hello, World!</h1>')
    res.statusCode=200
    res.end()
})

server.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})