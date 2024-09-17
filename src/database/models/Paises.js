module.exports = (Sequelize, DataTypes) => {
    const Paises = Sequelize.define('Paises', {
        id_pais: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_pais: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'paises',
        timestamps: false
    });

    return Paises;
};
