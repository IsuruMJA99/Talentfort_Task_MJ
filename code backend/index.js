const express=require('express');
const app=express();
const dbconnection=require('./db');
const bodyParser = require('body-parser');




app.use(bodyParser.json());

const port = 5000;

dbconnection();

app.use('/api',require('./router/userRouter'));

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});
