const { Schema, model } = require('mongoose');

const blankSchema = new Schema({

});

const Blanks = model('Blanks', Schema);

module.exports = Blanks;