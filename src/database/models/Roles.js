module.exports = (Sequelize, DataTypes) => {
    const Roles = Sequelize.define('Roles', {
        id_rol: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_rol: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'roles',
        timestamps: false
    });

    Roles.associate = models => {
        Roles.hasMany(models.Usuarios, {
            as: 'usuarios',
            foreignKey: 'id_rol'
        });
    };
    
    return Roles;
};
