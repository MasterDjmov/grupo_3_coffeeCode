module.exports = (Sequelize, DataTypes) => {
    const MediosDePagos = Sequelize.define('MedioPagos', {
        id_medio_pago: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_pago: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'medio_pagos',
        timestamps: false
    });

    return MediosDePagos;
};
