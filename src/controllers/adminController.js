const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
const { Association, where } = require('sequelize');
const { emit } = require('process');
const { error } = require('console');
const { validationResult } = require('express-validator');

const adminController = {
    //formulario con GET
    formEditProduct: async (req, res) => {
        try {
            const id = req.params.id;
            
            
            const cafe = await db.Productos.findByPk(id, {
                include: [
                    { association: 'pais' },
                    { association: 'tipocafe' },
                    { association: 'unidad_de_medida' },
                    { association: 'productor' }
                ]
            });
            
            if (!cafe) {
                return res.status(404).render('errors/404');
            }

            
            const tiposCafes = await db.TiposCafes.findAll();
            const unidadesMedida = await db.UnidadesDeMedidas.findAll();
            const paises = await db.Paises.findAll();
            const productores = await db.Productores.findAll();

            
            res.render('admin/editProduct', {
                cafe,
                tiposCafes,
                unidadesMedida,
                paises,
                productores,
                msg: "",
                rol: req.session.user,
                errors: {},
                oldData: {}
            });
        } catch (error) {
            console.error("Error al cargar el producto:", error);
            res.status(404).render('errors/404');
        }
    },
     //formulario con POST
    editProduct: async (req, res) => {
        const {
            nombre_producto,
            descripcion_corta,
            descripcion_larga,
            precio,
            cantidad,
            idunidad_medida,
            id_pais,
            idproductor,
            region,
            procesamiento_natural,
            procesamiento_lavado,
            altitud
        } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Si hay errores, obtenemos nuevamente los datos del producto y las listas de opciones
            const id = req.params.id;
            const cafe = await db.Productos.findByPk(id, {
                include: [
                    { association: 'pais' },
                    { association: 'tipocafe' },
                    { association: 'unidad_de_medida' },
                    { association: 'productor' }
                ]
            });
    
            const tiposCafes = await db.TiposCafes.findAll();
            const unidadesMedida = await db.UnidadesDeMedidas.findAll();
            const paises = await db.Paises.findAll();
            const productores = await db.Productores.findAll();
    
            
            return res.render('admin/editProduct', {
                cafe,
                tiposCafes,
                unidadesMedida,
                paises,
                productores,
                errors: errors.mapped(),  
                oldData: req.body,          
                msg: "",                    
                rol: req.session.user
            });
        }
    
        try {
            const id = req.params.id;
            const cafe = await db.Productos.findByPk(id);
    
            if (!cafe) {
                console.log("Producto no encontrado");
                return res.status(404).render("errors/404", { msg: "Producto no encontrado" });
            }
    
            
            const unidadesMedida = await db.UnidadesDeMedidas.findAll();
            const productores = await db.Productores.findAll();
            const paises = await db.Paises.findAll();


            const updatedData = {
                nombre_producto,
                descripcion_corta,
                descripcion_larga,
                precio,
                cantidad,
                idunidad_medida,
                id_pais,
                idproductor,
                region,
                procesamiento_natural,
                procesamiento_lavado,
                altitud
            };
    
            // Para saber si cargar una nueva imagen o dejar la que ya esta al actualizar
            if (req.file) {
                console.log("Imagen principal recibida: ", req.file.filename);
                updatedData.imagen_principal = req.file.filename;
            } else {
                updatedData.imagen_principal = cafe.imagen_principal;
            }
    
            if (req.files && req.files.imagen_secundaria) {
                console.log("Imagen secundaria recibida: ", req.files.imagen_secundaria[0].filename);
                updatedData.imagen_secundaria = req.files.imagen_secundaria[0].filename;
            } else {
                updatedData.imagen_secundaria = cafe.imagen_secundaria;
            }
    
            //Actualizo
            await cafe.update(updatedData);
            const updatedCafe = await db.Productos.findByPk(id);

            console.log("Producto actualizado correctamente");

            res.render('admin/editProduct', { cafe: updatedCafe, unidadesMedida, productores,paises ,msg: 'Edición exitosa', errors: {}, oldData: {} });
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
             res.render('admin/editProduct', {
                msg: "Error al actualizar el producto",
                rol: "",
                errors: {},
                oldData: req.body
            });
        }
    },
    // listProduct: (req, res) => {        

    //    //res.sendFile(path.resolve(__dirname,'../views/admin/listProduct.html'));
    //    res.render('admin/listProduct');
    // },
    formRegisterProduct: async (req, res) => {
        if (req.session.user && req.session.user.id_rol === 1) {
            try {
                const paises = await db.Paises.findAll();
                const tiposCafes = await db.TiposCafes.findAll();
                const unidades = await db.UnidadesDeMedidas.findAll();
                const productores = await db.Productores.findAll();

                const oldData = req.session.oldData || {}; 
                const errors = req.session.errors || {};

                req.session.oldData = null;
                req.session.errors = null;
    
                res.render('admin/registerProduct', {
                    paises,
                    tiposCafes,
                    unidades,
                    productores,
                    msg: "",
                    user: req.session.user,
                    oldData,
                    errors
                });
            } catch (error) {
                console.error("Error cargar el fomulario:", error);
                res.status(404).render('errors/404');
            }
        } else {
            res.redirect('../user/login'); 
        }
    },
    registerProduct: async (req, res) => {
        try {

            const errors = validationResult(req);
        if (!errors.isEmpty() || req.fileValidationErrors) {
            const tiposCafes = await db.TiposCafes.findAll();
            const unidades = await db.UnidadesDeMedidas.findAll();
            const paises = await db.Paises.findAll();
            const productores = await db.Productores.findAll();

            res.locals.oldData = req.body; 
            res.locals.errors = errors.mapped();
            
            return res.render('admin/registerProduct', {
                fileErrors: req.fileValidationErrors,
                tiposCafes,
                unidades,
                paises,
                productores,
                rol: req.session.user,
                msg: ""
            });
        }



            const {
                nombre_producto,
                descripcion_corta,
                descripcion_larga,
                precio,
                cantidad,
                idunidad_medida,
                id_pais,
                idproductor,
                region,
                procesamiento_natural,
                procesamiento_lavado,
                altitud
            } = req.body;
    
            const nuevoProducto = {
                nombre_producto,
                descripcion_corta,
                descripcion_larga,
                precio,
                cantidad,
                idunidad_medida,
                id_pais,
                idproductor,
                region,
                procesamiento_natural,
                procesamiento_lavado,
                altitud
            };

            //console.log("Datos del nuevo producto:", nuevoProducto);
            //console.log("Datos recibidos:", req.body)
    
            if (req.files && req.files.imagen_principal) {
                nuevoProducto.imagen_principal = req.files.imagen_principal[0].filename;
            }
    
            if (req.files && req.files.imagen_secundaria) {
                nuevoProducto.imagen_secundaria = req.files.imagen_secundaria[0].filename;
            }
    
            await db.Productos.create(nuevoProducto);
    
            console.log("Producto registrado correctamente");
    
            const tiposCafes = await db.TiposCafes.findAll();
            const unidades = await db.UnidadesDeMedidas.findAll();
            const paises = await db.Paises.findAll();
            const productores = await db.Productores.findAll();

            
    
            res.render('admin/registerProduct', {
                msg: "Producto registrado exitosamente",
                tiposCafes,
                unidades,
                paises,
                productores,
                rol: req.session.user,
                oldData: {}
            });
        } catch (error) {
            console.error("Error al registrar el producto:", error);
            res.render('admin/registerProduct', {  
                msg: "Error al registrar el producto",
                rol: req.session.user,
                oldData: req.body
            });
        }
    },
    deleteProduct1:(req, res) => {
        console.log("Se Borro por get El producto N° "+req.params.id);
        
        res.redirect('/');
    },
    deleteProduct2: (req, res) => {
        const id = req.params.id;
    
        db.Productos.destroy({
            where: { id_producto: id }
        })
        .then(() => {
            res.redirect('/'); 
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
            res.status(404).render('errors/404');
        });
    },
}

module.exports = adminController;