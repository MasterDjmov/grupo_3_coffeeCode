module.exports = (Sequelize, DataTypes) => {
    const Carritos = Sequelize.define('Carritos', {
        id_carrito: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_estado: {
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
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        id_medio_pago: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_forma_envio: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        carrito_id_carrito: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'carrito',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Carritos.associate = models => {
        Carritos.belongsTo(models.Usuarios, {
            as: 'usuario',
            foreignKey: 'id_usuario'
        });

        Carritos.belongsTo(models.Estados, {
            as: 'estado',
            foreignKey: 'id_estado'
        });

        Carritos.belongsToMany(models.Productos, {
            as: 'productos',
            through: 'rel_carrito_productos',
            foreignKey: 'id_carrito',
            otherKey: 'id_producto'
        });

        Carritos.belongsTo(models.MediosDePagos, {
            as: 'medio_de_pago',
            foreignKey: 'id_medio_pago'
        });

        Carritos.belongsTo(models.FormasEnvios, {
            as: 'forma_de_envio',
            foreignKey: 'id_forma_envio'
        });

        Carritos.hasMany(models.Facturas, {
            as: 'facturasCarritos',
            foreignKey: 'id_carrito'
        });
    };
    
    return Carritos;
};
