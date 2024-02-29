const { Schema, model } = require('mongoose');

const completedStorySchema = new Schema({
    finishedText: String,
    userid: String
});

const CompletedStory = model('CompletedStory', completedStorySchema);

module.exports = CompletedStory;