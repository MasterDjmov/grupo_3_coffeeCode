module.exports = (Sequelize, DataTypes) => {
    const Provincia = Sequelize.define('Provincia', {
        id_provincia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_provincia: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        id_pais: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'provincias',
        timestamps: false
    });

    return Provincia;
};
