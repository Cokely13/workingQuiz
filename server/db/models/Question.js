const Sequelize = require('sequelize')
const db = require('../db')


const Question = db.define('Question', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  options: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  correctAnswer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


module.exports = Question
