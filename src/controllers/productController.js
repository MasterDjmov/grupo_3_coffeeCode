const express = require('express');
const path = require('path');

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
        res.render('products/productDetail');
    }
    
}

module.exports = productController;