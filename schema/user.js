module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        mobile: DataTypes.INTEGER,
        email: DataTypes.STRING,
        wallet: DataTypes.STRING,
        truename: DataTypes.STRING,
        gender: DataTypes.STRING
    })
}