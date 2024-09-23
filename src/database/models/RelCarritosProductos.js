module.exports = (Sequelize, DataTypes) => {
    const RelCarritosProductos = Sequelize.define('RelCarritosProductos', {
        id_rel_carrito_producto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_carrito: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
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
        id_tipo_cafe: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idunidad_medida: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        tableName: 'rel_carrito_productos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return RelCarritosProductos;
};
