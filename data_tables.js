const { Sequelize, DataTypes } = require('sequelize');


const dataBase = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
})

const User = dataBase.define('User', {
    userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userPassword: {
        type: DataTypes.STRING,
        alloeNull: false,
    }

},
    {
        tableName: 'User',
        timestamps: false,
        freezeTableName: true,

    })


const Tasks = dataBase.define('Tasks', {
    taskID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
            model: User,
            key: 'userID'
        }
    },

    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taskDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName: 'Tasks',
        timestamps: false,
        freezeTableName: true,

    })

dataBase.sync({ force: true })

module.exports = {
    dataBase,
    User,
    Tasks
}

