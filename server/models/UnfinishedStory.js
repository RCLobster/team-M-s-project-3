const { Schema, model } = require('mongoose');

const unfinishedStorySchema = new Schema({
    unfinishedText: String,
    blanks: [{
        type: String
    }]
});

const UnfinishedStory = model('UnfinishedStory', unfinishedStorySchema);

module.exports = UnfinishedStory;