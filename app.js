const sql = require('mssql');
const dotenv = require('dotenv');
const express = require('express')
const cors = require('cors')
const app = express()
dotenv.config();


app.use(cors())
app.use(express.json())


const config = {
    user: process.env.user,
    password: process.env.password,
    server: process.env.server,
    database: process.env.database,
    options: {
        encrypt: false, 
        enableArithAbort: true 
    }
};


const poolPromise = sql.connect(config)
if(poolPromise){
    console.log("Connect database success");
}else{
    console.log('error');
}



app.get('/',(req,res)=>{
    res.send("Test database")
})

app.get('/get',async(req,res)=>{
    try{
        
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.query('SELECT top(1000)* FROM ErpitemCodes');
        
        res.send(result.recordset)
    }catch(error){
        res.send(error)
    }
})



app.listen(3308,()=>{
    console.log("Server start ");
})
