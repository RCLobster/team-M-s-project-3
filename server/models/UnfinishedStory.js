const { Schema, model } = require('mongoose');

const unfinishedStorySchema = new Schema({

});

const UnfinishedStory = model('UnfinishedStory', unfinishedStorySchema);

module.exports = UnfinishedStory;