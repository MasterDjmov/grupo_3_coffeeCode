const express = require('express');
const dbusers = require('../data/users.json');
const path = require('path');
const session = require('express-session');
const dataUsers = require('../data/datasourceUsers');
const crypto =require('node:crypto');
const bcrypt = require('bcrypt');

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
const { Association, where } = require('sequelize');
const { emit } = require('process');
const { error } = require('console');
const { validationResult } = require('express-validator');

const userController = {
    //muestro formulario de login
    formLogin: (req, res) => {      
        const msg = "";
      
        res.render('users/login', {
            msg, user:req.session.user || null,
            oldData:null,
            errors:null
    });
  },
      // valido el login
      login: async (req, res) => {
        // Verifica si hay errores
        const errors = validationResult(req);
        if (errors.isEmpty()) {
           
            try {
                const user = await db.Usuarios.findOne({
                    where: { email: req.body.email }
                });
        
                if (user) {
                    // Compara la clave ingresada con la clave encriptada almacenada
                    const claveValida = await bcrypt.compare(req.body.clave, user.clave);
        
                    if (claveValida) {
                        req.session.user = user;
                        return res.redirect('/?log=1');
                    } else {
                        return res.render('users/login', {
                            msg: "Error! La clave es incorrecta",
                            'rol': "No Log",
                            oldData: req.body
                        });
                    }
                } else {
                    return res.render('users/login', {
                        msg: "Error! El usuario no fue encontrado",
                        'rol': "No Log",
                        oldData: req.body
                    });
                }
            } catch (err) {
                console.error("Error en el proceso de login:", err);
                return res.status(500).render('users/login', {
                    msg: "Error en el proceso de login",
                    'rol': "No Log",
                    oldData: req.body
                });
            }
        }else{
            const msg = "";
            //console.log(errors.array())
            return res.render('users/login', {
                msg, user:req.session.user || null,
                errors: errors.mapped(), 
                oldData: req.body 
            });
        }
    
        

    },
    
    
    register: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/users/register.html'));
        
        res.render('users/register',{
          msg:"", user: req.session.user || null  
        });
    },
    create: async (req, res) => {
      const msg="";
      const imagen=req.originalFileName;
      let {nombre, apellido, email, telefono, dni, calle, numero, piso, departamento, barrio, cuil_t, clave }=req.body;
       
     
      const compresion = 10;
      
       
       const hashedClave = await bcrypt.hash(clave, compresion);
       try {
        await db.Usuarios.create({
          nombre,
          apellido,
          email,
          telefono,
          dni,                       
          calle,                     
          numero,                    
          piso,                      
          departamento,              
          barrio,                    
          cuil_t,                    
          clave: hashedClave,         
          imagen_perfil: 'avatar-mini2.jpg',  
          id_rol: 2,                 // Rol cliente
          id_estado: 1,             // Estado activo       
        });

        res.render('users/login', { msg: "Registro Exitoso" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).render('users/register', { msg: "Error al crear el usuario" });
    }
},
    recuperarClave: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/users/recuperarClave.html'));
       res.render('users/recuperarClave');
    },
    formProfile: async (req, res) => {
      if (req.session.user) {
          const user = req.session.user;
  
          
          const usuario = await db.Usuarios.findOne({
              where: { id_usuario: user.id_usuario }, 
              include: [
                  {
                      association: 'localidad' 
                  },
                  {
                      association: 'rol' 
                  }
              ]
          });
  
          res.render('users/edit_profile', {
              msg: "",
              user: usuario 
          });
          //console.log(usuario);
      } else {
          res.redirect('/user/login'); 
      }
  },
    updateProfile: async (req, res) => {      
     const { id_usuario, nombre, dni,apellido, email, telefono, barrio, calle, numero, piso, departamento, 
      id_localidad, id_estado, cuil_t, clave } = req.body;
      
     
      try {
        
        const usuario = await db.Usuarios.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Actualizo los campos
        const updatedData = {
            nombre,
            apellido,
            email,
            dni,
            telefono,
            barrio,
            calle,
            numero,
            piso,
            departamento,
            id_localidad,
            id_estado,
            cuil_t
        };

        if (req.file) {
          updatedData.imagen_perfil = req.file.filename;
      }

        if (clave) {
            updatedData.clave = await bcrypt.hash(clave, 10);
        }


        await usuario.update(updatedData);

        
        res.render('users/login', { msg: "Perfil actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        res.status(500).send("Error al actualizar el perfil");
    }
  }
}

module.exports = userController;