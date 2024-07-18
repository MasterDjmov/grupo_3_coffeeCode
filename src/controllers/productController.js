const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');


const productController = {
    productCart: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart.html'));
       res.render('products/productCart');
    },
    productCart_detalle: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart_detalle.html'));
       res.render('products/productCart_detalle');
    },
    productCart_facturacion: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart_facturacion.html'));
       res.render('products/productCart_facturacion');
    },
    productDetail: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/products/productDetail.html'));
        const id =req.params.id;
       
     const cafe = productos.find(e=>e.id==id);
     //console.log(cafe);
        res.render('products/productDetail',{'cafe':cafe});
    }
    
}

module.exports = productController;