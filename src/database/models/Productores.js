module.exports = (Sequelize, DataTypes) => {
    const Productores = Sequelize.define('Productores', {
        id_productor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_productor: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'productores',
        timestamps: false
    });

    return Productores;
};
