module.exports = (Sequelize, DataTypes) => {
    const Carrito = Sequelize.define('Carrito', {
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

    return Carrito;
};
