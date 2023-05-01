const express= require('express')
const router=express.Router()

router.get('/index',(req,res)=>{
    //res.send(`<h1>home page</h1>`)
    res.render('../views/index') 
})

router.get('/register',(req,res)=>{
    res.render('../views/register')
})

router.get('/profile',(req,res)=>{
    res.render('../views/profile')
})

router.get('/home',(req,res)=>{
    res.render('../views/home')
})

module.exports=router;
