module.exports = (Sequelize, DataTypes) => {
    const Facturas = Sequelize.define('Facturas', {
        id_factura: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_carrito: {
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
        titular_tarjeta: {
            type: DataTypes.STRING(65),
            allowNull: true
        },
        dni_titular: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        numero_tarjeta: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        vencimiento_tarjeta: {
            type: DataTypes.DATE,
            allowNull: true
        },
        codigo_tarjeta: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        codigo_rapipago: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        codigo_pago_facil: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        cbu: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        cvu: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        alias: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        id_forma_envio: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'facturas',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Facturas.associate = models => {
        Facturas.belongsTo(models.Carritos, {
            as: 'factura_carrito',
            foreignKey: 'id_carrito'
        });
    };

    return Facturas;
};
