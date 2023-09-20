const express=require('express');
const router=express.Router();
const credentials={
    email:'sabith@gmail.com',
    password:'sabith123'
}
const products=require('./data')
router.post('/login',(req,res)=>{
    console.log(req.body);
    if(req.body.email===credentials.email&&req.body.password===credentials.password){
        req.session.user=req.body.email;
        res.redirect('/route/home');
        console.log('login suceessful');
    }else{
        res.render('login',{message:'Username or Password is incorrect'});
    }
})
router.get('/home',(req,res)=>{
    console.log(req.session.user);
    if(req.session.user){
        res.render('home',{user:req.session.user,data:products});
    }else{
        res.redirect('/');
    }
})
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send('Error');
        }else{
            res.render('login',{message:'Logged out successfully'});
        }
    })
})
module.exports=router;