const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const mainController = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
       
        res.render('index',{'listaProductos':productos});
    },
    about: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
       
        res.render('about');
    }
}

module.exports = mainController;