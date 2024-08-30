const express = require('express');
const dbusers = require('../data/users.json');
const path = require('path');
const session = require('express-session');
const dataUsers = require('../data/datasourceUsers');
const crypto =require('node:crypto');
const bcrypt = require('bcrypt');
const userController = {
    //muestro formulario de login
    formLogin: (req, res) => {      
        const msg="";
        res.render('users/login',{msg, user: dbusers.find((usuario) => usuario.email === '1')});
      },
      // valido el login
      login: async (req, res) => {
        try {
            // Busca el usuario en la base de datos por su email
            let user = dbusers.find((usuario) => usuario.email === req.body.email);
    
            if (user) {
                // Compara la clave ingresada con la clave encriptada almacenada
                const claveValida = await bcrypt.compare(req.body.clave, user.clave);
    
                if (claveValida) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    const msg = "Error! La clave es incorrecta";
                    res.render('users/login', {
                        msg,
                        'rol': "No Log"
                    });
                }
            } else {
                const msg = "Error! El usuario no fue encontrado";
                res.render('users/login', {
                    msg,
                    'rol': "No Log"
                });
            }
        } catch (err) {
            console.error("Error en el proceso de login:", err);
            res.status(500).render('users/login', {
                msg: "Error en el proceso de login",
                'rol': "No Log"
            });
        }
    },
    
    register: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/users/register.html'));
        res.render('users/register',{
          msg:""       
        });
    },
    create: async(req, res) => {
      const msg="";
      const imagen=req.originalFileName;
      let {nombre, apellido, email,telefono, clave}=req.body;
       //encripto clave
     
      const compresion = 10;
      
       // Encripto la clave
       clave = await bcrypt.hash(clave, compresion);

       const perfil = {
         id:crypto.randomUUID(),
         nombre,
         apellido,
         imagen:'avatar-mini2.jpg',
         email,
         clave,
         categoria:"CLIENTE",
         telefono,
         pais:"Agregar",
         ciudad:"Agregar",
         codigo_postal:"Agregar"
       }
        
       //Leer el JSON
       const info = await dataUsers.load();
       //console.log(info);
       info.push(perfil);
       
       //actualizar el users.json
       await dataUsers.save(info);
       res.render('users/login',{msg:"Registro Exitoso"});;
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
      // if (req.session.usuario != null) {
      //   req.session.usuario = null;
      //   res.redirect("/user/login");
      // }
      //res.redirect('/logout');
    res.redirect('/user/login');
    //res.render('users/login',{msg:"Perfil Acualizado Correctamente"})
    }
}

module.exports = userController;