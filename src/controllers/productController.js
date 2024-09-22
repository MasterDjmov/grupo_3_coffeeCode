const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');
const { Op } = require("sequelize");

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
            return res.status(404).render('errors/404');
         }
         res.render('products/productCart_detalle',{
            'cafe': cafe,
            'user': user,
            'msg': 'Usted debe iniciar session para Agregar al Carrito' 
         });
      })
      .catch(error =>{
         console.error("Error al buscar el procuto", error)
         res.status(404).render('errors/404');
      })
    },
    productCart_facturacion: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart_facturacion.html'));
       res.render('products/productCart_facturacion');
    },
    productDetail:  (req, res) => {
      const id = req.params.id;
      let user = "";
  
      if (req.session.user) {
          user = req.session.user;
      }
  
      db.Productos.findByPk(id, {
          include: [
              { association: 'pais' },
              { association: 'tipocafe' },
              { association: 'unidad_de_medida' },
              { association: 'productor' }
          ]
      })
      .then(function(cafe) {
          if (!cafe) {
              return res.status(404).render('errors/404');
          }
          
          return db.TiposCafes.findAll()
              .then(function(tiposCafes) {
                  res.render('products/productDetail', {
                      'cafe': cafe,
                      'user': user,
                      'tiposCafes': tiposCafes, 
                      'msg': "Usted debe iniciar sesión para agregar al carrito"
                  });
              });
      })
      .catch(error => {
          console.error("Error al buscar el producto:", error);
          res.status(404).render('errors/404');
      });
   },
   search: async (req, res) => {
      try {
          const key = req.query.query; 
          const productos = await db.Productos.findAll({
              where: {
                  nombre_producto: {
                      [db.Sequelize.Op.like]: `%${key}%`
                  }
              }
          });
  
          res.render('products/searchResults', {
              productos: productos,
              key: key 
          });
      } catch (error) {
          console.error("Error al realizar la búsqueda:", error);
          res.status(404).render('errors/404');
      }
   }
}

module.exports = productController;