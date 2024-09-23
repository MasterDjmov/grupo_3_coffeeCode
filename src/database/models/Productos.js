module.exports = (Sequelize, DataTypes) => {
    const Productos = Sequelize.define('Productos', {
        id_producto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_producto: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        descripcion_corta: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        descripcion_larga: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_tipo_cafe: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idunidad_medida: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id_pais: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idproductor: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        region: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        procesamiento_natural: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        procesamiento_lavado: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        imagen_principal: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        imagen_secundaria: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        altitud: {
            type: DataTypes.STRING(65),
            allowNull: true
        }
    }, {
        tableName: 'productos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Productos.associate = models => {
        Productos.belongsTo(models.Paises, {
            as: 'pais',
            foreignKey: 'id_pais'
        });

        Productos.belongsTo(models.TiposCafes, {
            as: 'tipocafe',
            foreignKey: 'id_tipo_cafe'
        });

        Productos.belongsTo(models.UnidadesDeMedidas, {
            as: 'unidad_de_medida',
            foreignKey: 'idunidad_medida'
        });

        Productos.belongsTo(models.Productores, {
            as: 'productor',
            foreignKey: 'idproductor'
        });

        Productos.belongsToMany(models.Carritos, {
            as: 'carritos',
            through: 'rel_carrito_productos',
            foreignKey: 'id_producto',
            otherKey: 'id_carrito'
        });

    };

    return Productos;
};
