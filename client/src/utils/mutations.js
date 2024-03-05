import { gql } from '@apollo/client';

// Front end mutations for logging in a user, signing up, and creating a completed story
// Will take information from the pages and send to the backend
// Matches backend models/typedefs/resolvers

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_STORY = gql`
  mutation createStory($title: String!, $finishedText: String!) {
    createStory(title: $title, finishedText: $finishedText) {
      _id
      title
      finishedText
      userId
    }
  }
`;

export const DELETE_STORY = gql`
mutation Mutation($storyId: ID!) {
  deleteStory(storyId: $storyId) {
    _id
    stories{
      _id
    }
  }
}
`;
