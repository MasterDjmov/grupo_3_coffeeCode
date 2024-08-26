const express = require('express');
const dbusers = require('../data/users.json');
const path = require('path');
const session = require('express-session');


const userController = {
    //muestro formulario de login
    formLogin: (req, res) => {      
        const msg="";
        res.render('users/login',{msg});
      },
      // valido el login
    login: (req, res) => {
      //console.log(req.body.email);
    
      let user = dbusers.find((usuario)=>{
        return usuario.email==req.body.email && usuario.clave==req.body.clave;
        //console.log(usuario.email, usuario.clave);
      });
     // console.log( req.session.user);
        if(user != undefined){
          req.session.user = user;
         console.log(req.session.user);
            res.redirect('/');
        }else{
            const msg="Error! El usuario No Pudo Ser Validado";
            res.render('users/login',
              {
                msg,
                'rol':"No Log"
              });
        }
    },
    register: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/users/register.html'));
        res.render('users/register');
    },
    recuperarClave: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/users/recuperarClave.html'));
       res.render('users/recuperarClave');
    },
    formProfile: (req, res) => {      
      const msg="";
      res.render('users/edit_profile',{msg});
    },
    updateProfile: (req, res) => {      
      const msg="";
      res.render('users/edit_profile',{msg});
    }
}

module.exports = userController;