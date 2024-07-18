const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');

const mainController = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
        if(req.session.user){
            user= req.session.user;
        }else{
            user="";
        }
        res.render('index',{
            'listaProductos':productos,
            'user':user
        });
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
    }
}

module.exports = mainController;