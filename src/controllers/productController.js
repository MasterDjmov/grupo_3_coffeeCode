const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
const { Association, where } = require('sequelize');
const { error } = require('console');

const productController = {
    productCart: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart.html'));
       res.render('products/productCart');
    },
    productCart_detalle: (req, res) => {

      const id = req.params.id;
      let user = "";

      if(req.session.user){
         user = req.session.user;
      }
      db.Productos.findByPk(id,{
         include: [
            {association: 'pais'},
            {association: 'tipocafe'},
            {association: 'unidad_de_medida'},
            {association: 'productor'}
         ]
      })
      .then(function(cafe){
         if(!cafe){
            return res.status(400).send('Producto no encontrado');
         }
         res.render('products/productCart_detalle',{
            'cafe': cafe,
            'user': user,
            'msg': 'Usted debe iniciar session para Agregar al Carrito' 
         });
      })
      .catch(error =>{
         console.error("Error al buscar el procuto", error)
         res.status(500).send('Error en el servidor');
      })
    },
    productCart_facturacion: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart_facturacion.html'));
       res.render('products/productCart_facturacion');
    },
    productDetail: (req, res) => {
        const id =req.params.id;
        let user = "";

        if(req.session.user){
               user= req.session.user
         } 

         db.Productos.findByPk(id,{
            include: [
               {association: 'pais'},
               {association: 'tipocafe'},
               {association: 'unidad_de_medida'},
               {association: 'productor'}
            ]
         })
         .then(function(cafe){
            if(!cafe){
               return res.status(404).send('Producto no encontrado')
            }
            res.render('products/productDetail',
             {
                'cafe':cafe,
                'user':user,
                 'msg':"Usted debe iniciar Sesión para Agregar al Carrito"
             });
         })
         .catch(error => {
            console.error("Error al buscar el producto:", error);
            res.status(500).send('Error en el servidor');
        });

    }
    
}

module.exports = productController;