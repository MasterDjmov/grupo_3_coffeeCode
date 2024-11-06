const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');
const { Op } = require("sequelize");

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
// const { Association, where } = require('sequelize');
// const { error } = require('console');

const productController = {
    productCart: (req, res) => {
        const id = req.params.id;
        let user = req.session || "";
        let carrito = req.session.carrito || [];
       
        // if (req.session.carrito) {
        //     carrito = req.session.carrito;
        // } else {
        //     carrito = null;
        // }
        // if (req.session.user) {
        //     user = req.session.user;
        // }
         

        res.render('products/productCart', {
            'cafe': null,
            'user': user,
            carrito
        });
    },
    productCart_agregar: (req, res) => {
        if(req.session.carrito){
            carrito= req.session.carrito;
        }else{
            carrito=null;
        }
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
         carrito.push({cafe})
 *       res.redirect('/products/edit'); 
      })
      .catch(error =>{
         console.error("Error al buscar el procuto", error)
         res.status(404).render('errors/404');
      })
    },
    productCart_detalle: (req, res) => {
        if(req.session.carrito){
            carrito= req.session.carrito;
        }else{
            carrito=null;
        }
     
      let user = "";

      if(req.session.user){
         user = req.session.user;
      }
      console.log(carrito.length)
         res.render('products/productCart_detalle',{
            'user': user,           
            'msg': 'Usted debe iniciar session para Agregar al Carrito',
            carrito            
         });
    },


    productCart_facturacion: (req, res) => {
        res.render('products/productCart_facturacion');
    },

    productDetail: (req, res) => {
        const id = req.params.id;
        let user = req.session.user || "";
        let carrito = req.session.carrito || []
        // if (req.session.user) {
        //     user = req.session.user;
        // }
        // if (req.session.carrito) {
        //     carrito = req.session.carrito;
        // } else {
        //     carrito = null;
        // }
        db.Productos.findByPk(id, {
            include: [
                { association: 'pais' },
                { association: 'tipocafe' },
                { association: 'unidad_de_medida' },
                { association: 'productor' }
            ]
        })
            .then(function (cafe) {
                if (!cafe) {
                    return res.status(404).render('errors/404');
                }

                return db.TiposCafes.findAll()
                    .then(function (tiposCafes) {
                        res.render('products/productDetail', {
                            'cafe': cafe,
                            'user': user,
                            'tiposCafes': tiposCafes,
                            'msg': "Usted debe iniciar sesión para agregar al carrito",
                            carrito
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
                        // [db.Sequelize.Op.like]: `%${key}%`
                        [Op.like]: `%${key}%`
                    }
                }
            });
            let carrito = req.session.carrito || [];
            // if (req.session.carrito) {
            //     carrito = req.session.carrito;
            // } else {
            //     carrito = null;
            // }
            res.render('products/searchResults', {
                productos: productos,
                key: key,
                carrito
            });
        } catch (error) {
            console.error("Error al realizar la búsqueda:", error);
            res.status(404).render('errors/404');
        }
    }
}

module.exports = productController;