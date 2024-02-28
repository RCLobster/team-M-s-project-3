const typeDefs = `
  type User {
    _id: ID
    username: String
    password: String
    completedStories: [CompletedStory]
  }

  type UnfinishedStory {
    _id: ID
    unfinishedText: String
    blanks: [String]!
  }

  type CompletedStory {
    _id: ID
    finishedText: String
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    users: [User]
    unfinishedStory(storyId: ID!): UnfinishedStory
    unfinishedStories: [UnfinishedStory]
    completedStory(storyId: ID!): CompletedStory
    completedStories: [CompletedStory]
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createStory(finishedText: String!): CompletedStory
  }
`;

module.exports = typeDefs;
