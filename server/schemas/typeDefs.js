const typeDefs = `
  type User {
    _id: ID
    username: String
    password: String
    completedStory: [CompletedStory]
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
    user(userId: ID!): User
    story(storyId: ID!): UnfinishedStory
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    createStory(finishedText: String!): CompletedStory
  }
`;

module.exports = typeDefs;
