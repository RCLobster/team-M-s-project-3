import { gql } from '@apollo/client';

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
