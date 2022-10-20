const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt')


router.get('/login',(req,res)=>{
    res.render('../views/login/login')
})

router.get('/register',(req,res)=>{
    res.render('../views/login/signup')
})

router.post('/register',async (req,res)=>{
    const {username, password} = req.body;
    const user = new User({username, password});
    await user.save(err=>{
        if (err) {
            //res.status(500).send('ERROR AL REGISTRAR EL USUARIO');
        } else {
            //res.status(200).send('USUARIO REGISTRADO');
            res.redirect('articles/resgistrook')
        }
    })
})
router.post('/authenticate',async (req,res)=>{
    
    const {username, password} = req.body;
    
           User.findOne({username}, (err,user)=>{ 
            
            if (err) {
               res.status(500).send('ERROR AL AUTENTICAR EL USUARIO');
                
            } else if(!user){
                res.status(500).send('NO EXISTE EL USUARIO');
                
            }else{
                user.isCorrectPassword(password,(err,result)=>{
                    if(err) {
                        //res.status(500).send('ERROR AL AUTENTICAR EL USUARIO');
                        res.redirect('/');
                    } else if(result) {
                        //res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE');
                        res.redirect('articles/home');
                        
                           
                    }else{
                        res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA')
                        
                    }
                })
            }
            
            
    })   

    
    
})

module.exports = router;