const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
const { Association, where } = require('sequelize');

const mainController = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
        if(req.session.user){
            user= req.session.user;
        }else{
            user="";
        }
        db.Productos.findAll()
        .then(function(listaProductos){

            res.render('index',{
                listaProductos,
                'user':user
            });
        })
    },
    about: (req, res) => {
        if(req.session.user){
            user= req.session.user
        }else{
            user="";
        }
       
        res.render('about',
            {
                'user':user
            }

        );
    },
    info: (req, res) => {
        if(req.session.user){
            user= req.session.user
        }else{
            user="";
        }
       
        res.render('info',
            {
                'user':user
            }

        );
    }
}

module.exports = mainController;