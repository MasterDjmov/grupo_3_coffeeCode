const express = require('express');
const dbusers = require('../data/user.json');
const path = require('path');

const userController = {
    //muestro formulario de login
    formLogin: (req, res) => {      
        const msg="";
        res.render('users/login',{msg});
      },
      // valido el login
    login: (req, res) => {
      console.log(req.body.email);
      let existe = dbusers.find((usuario)=>{
        return usuario.email==req.body.email && usuario.clave==req.body.clave;
        //console.log(usuario.email, usuario.clave);
      });
      console.log(existe);
        if(existe != undefined){
            res.redirect('/');
        }else{
            const msg="Error! El usuario No Pudo Ser Validado";
            res.render('users/login',{msg});
        }
    },
    register: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/users/register.html'));
        res.render('users/register');
    },
    recuperarClave: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/users/recuperarClave.html'));
       res.render('users/recuperarClave');
    }
}

module.exports = userController;