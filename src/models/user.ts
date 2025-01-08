import { Sequelize } from "sequelize";

const { DataTypes } = require('sequelize');

module.exports = (sequelize: typeof Sequelize, Sequelize: Sequelize) => {

    const Users = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Users

}

