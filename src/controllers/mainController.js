const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
const { Association, where } = require('sequelize');

const mainController = {
    index: (req, res) => {
        let log=0;
        if(req.session.logExito){
            log = 1;
            delete req.session.logExito;
        }
        
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
        if(req.session.user){
            user= req.session.user;
        }else{
            user="";
        }

        if(req.session.carrito){
            carrito= req.session.carrito;
        }else{
            carrito=null;
        }

        db.Productos.findAll()
        .then(function(listaProductos){
            console.log(carrito);    
            res.render('index',{
                listaProductos,
                'user':user,
                log,
                productos:null,
                carrito
            });
        })
    },
    about: (req, res) => {
        if(req.session.user){
            user= req.session.user
        }else{
            user="";
        }
        if(req.session.carrito){
            carrito= req.session.carrito;
        }else{
            carrito=null;
        }
        
        res.render('about',
            {
                'user':user,
                carrito
            }

        );
    },
    info: (req, res) => {
        if(req.session.user){
            user= req.session.user
        }else{
            user="";
        }
        if(req.session.carrito){
            carrito= req.session.carrito;
        }else{
            carrito=null;
        }
        res.render('info',
            {
                'user':user,
                carrito
            }

        );
    }
}

module.exports = mainController;