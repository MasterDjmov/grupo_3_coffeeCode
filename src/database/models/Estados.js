module.exports = (Sequelize, DataTypes) => {
    const Estados = Sequelize.define('Estado', {
        id_estado: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_estado: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'estado',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Estados;
};
