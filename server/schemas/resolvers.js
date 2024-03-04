const { User, CompletedStory, UnfinishedStory } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('stories');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('stories');
        },
        unfinishedStory: async (parent, { storyId }) => {
            return UnfinishedStory.findOne({ _id: storyId });
        },
        unfinishedStories: async () => {
            return UnfinishedStory.find();
        },
        completedStory: async (parent, { storyId }) => {
            return CompletedStory.findOne({ _id: storyId });
        },
        completedStories: async () => {
            return CompletedStory.find();
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('stories');
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        addUser: async (parent, { username, password }) => {
            const user = await User.create({ username, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        createStory: async (parent, { title, finishedText }, context) => {
            if (context.user) {
                const completedStory = await CompletedStory.create({
                    title,
                    finishedText,
                    userId: context.user._id,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { stories: completedStory._id } }
                );

                return completedStory
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;