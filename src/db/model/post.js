const Sequelize = require('sequelize');
const database = require('../db');
 
const Post = database.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    website_url: {
        type: Sequelize.STRING
    },
    title: Sequelize.STRING,
    subtitle: Sequelize.STRING,
    topics: Sequelize.STRING,
})
 
module.exports = Post;