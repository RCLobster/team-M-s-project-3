const { Schema, model } = require('mongoose');

const completedStorySchema = new Schema({

});

const CompletedStory = model('CompletedStory', completedStorySchema);

module.exports = CompletedStory;