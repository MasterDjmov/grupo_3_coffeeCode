const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const mainController = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
        const datos = {
            titulo: "CoffeCode-Inicio"
        }
       
        
        
        res.render('index',{'datos':datos,'listaProductos':productos});
    }
}

module.exports = mainController;