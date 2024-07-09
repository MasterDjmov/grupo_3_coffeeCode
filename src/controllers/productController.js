const express = require('express');
const path = require('path');

const productController = {
    productCart: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/products/productCart.html'));
    },
    productCart_detalle: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/products/productCart_detalle.html'));
    },
    productCart_facturacion: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/products/productCart_facturacion.html'));
    },
    productDetail: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/products/productDetail.html'));
    }
    
}

module.exports = productController;