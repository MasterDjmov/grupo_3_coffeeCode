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

const userController = {
    //muestro formulario de login
    formLogin: (req, res) => {      
      const msg = "";
      
      res.render('users/login', { msg, user:req.session.user || null });
  },
      // valido el login
      login: async (req, res) => {
        try {
            // Busca el usuario en la base de datos por su email
            const user = await db.Usuarios.findOne({
              where: {email:req.body.email}
            });
    
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
          msg:"", user: req.session.user || null  
        });
    },
    create: async (req, res) => {
      const msg="";
      const imagen=req.originalFileName;
      let {nombre, apellido, email, telefono, dni, calle, numero, piso, departamento, barrio, cuil_t, clave }=req.body;
       //encripto clave
     
      const compresion = 10;
      
       // Encripto la clave
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
  
          // Obtener información adicional de la base de datos
          const usuario = await db.Usuarios.findOne({
              where: { id_usuario: user.id_usuario }, // Asegúrate de usar el ID correcto
              include: [
                  {
                      association: 'localidad' // Usa el alias de la asociación
                  },
                  {
                      association: 'rol' // Usa el alias de la asociación
                  }
              ]
          });
  
          res.render('users/edit_profile', {
              msg: "",
              user: usuario // Envía el usuario completo con localidad y rol
          });
          console.log(usuario);
      } else {
          res.redirect('/user/login'); // Redirige si no hay sesión
      }
  },
    updateProfile: async (req, res) => {      
     const { id_usuario, nombre, dni,apellido, email, telefono, barrio, calle, numero, piso, departamento, 
      id_localidad, id_estado, cuil_t, clave } = req.body;
      
     
      try {
        // Busca el usuario por ID
        const usuario = await db.Usuarios.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Actualiza los campos proporcionados
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

        // Actualiza los datos en la base de datos
        await usuario.update(updatedData);

        
        res.render('users/login', { msg: "Perfil actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        res.status(500).send("Error al actualizar el perfil");
    }
  }
}

module.exports = userController;