import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json())
app.use(express.static("static"));

const PORT = process.env.PORT || 9000;



app.get('/', (req,res)=>{
     res.sendFile(path.resolve("pages/index.html"))
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
} )