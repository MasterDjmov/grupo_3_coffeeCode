const express = require('express');
const dbusers = require('../data/users.json');
const path = require('path');
const session = require('express-session');
const dataUsers = require('../data/datasourceUsers');
const crypto =require('node:crypto');

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
      if(req.session.user){
        user= req.session.user;
      }else{
          user="";
      }
    //  const id=req.session.user.id;
    //  let user = dbusers.find((usuario)=>{
    //   return usuario.id===id;
    //   //console.log(usuario.email, usuario.clave);
    // });
      const msg="";
      res.render('users/edit_profile',{msg,user});
    },
    updateProfile: async(req, res) => {      
      const msg="";
     const imagen=req.originalFileName;
      const {id, nombre, apellido, email,telefono, pais, ciudad, codigo_postal,clave, categoria}=req.body;
      const perfil = {
        id:id,
        nombre,
        apellido,
        imagen,
        email,
        clave,
        categoria,
        telefono,
        pais,
        ciudad,
        codigo_postal
      }
      //traigo todos los usuarios distinto al mio
      let users = dbusers.filter((usuario)=>{
        return usuario.id!=id;
      })
     
      //Leer el JSON
      const info = await dataUsers.load();
      //console.log(info);
      users.push(perfil);
      
      //actualizar el users.json
      await dataUsers.save(users);
      res.redirect('/user/login');
    }
}

module.exports = userController;