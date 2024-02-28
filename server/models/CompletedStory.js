const { Schema, model } = require('mongoose');

const completedStorySchema = new Schema({
    finishedText: String,
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

const CompletedStory = model('CompletedStory', completedStorySchema);

module.exports = CompletedStory;