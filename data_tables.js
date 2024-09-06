const http = require('http');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');


const dataBase = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db'
})

const dataBaseUser = dataBase.define('dataBaseUser', {
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
        tableName: 'dataBaseUser',
        timestamps: false,
        freezeTableName: true,

    })


const dataBaseUserTask = dataBase.define('dataBaseUserTask', {
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
            model: dataBaseUser,
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
        tableName: 'dataBaseUserTask',
        timestamps: false,
        freezeTableName: true,

    })

dataBase.sync({ force : true })

module.exports = {
    dataBase,
    dataBaseUser,
    dataBaseUserTask
}

