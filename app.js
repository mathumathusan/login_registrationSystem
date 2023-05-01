const express= require('express')
const app= express()
const mysql= require('mysql')
const dotenv= require('dotenv')
const path = require('path')
const  hbs = require('hbs')
const router=require('./routes/pages.js')


//console.log(__dirname);

app.use(express.urlencoded({ extended: false }));
app.use('/',router)
app.use('/auth',require('./routes/auth'))


const location=path.join(__dirname,'./public')
app.use(express.static(location))
app.set('view engine','hbs')

const partialspath=path.join(__dirname,'./views/partials')
hbs.registerPartials(partialspath)


dotenv.config({
    path:'./.env'
})

// const db= mysql.createConnection({
//     host:process.env.DATABASE_HOST,
//     user:process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASS,
//     database:process.env.DATABASE
// })
const db= mysql.createConnection({
    host:"localhost",
    user: "root",
    password:'',
    database:'login_crud' 
})

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`mysql connection success`);
    }
})


app.listen(5000,()=>{
    console.log(`server run on port 5000`);
})