module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                len: [2,10]
            }
        },
        password: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        wallet: DataTypes.STRING,
        truename: DataTypes.STRING,
        gender: DataTypes.STRING
    
    },{
        freezeTableName: true
    })
  }