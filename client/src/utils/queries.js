import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      stories {
        _id
        finishedText
      }
    }
  }
`;

export const QUERY_USERS = gql`
query users {
    users {
      _id
      username
      stories {
        _id
        finishedText
      }
    }
  }
`;

export const QUERY_SINGLE_UNFINISHED_STORY = gql`
  query getSingleUnfinishedStory($storyId: ID!) {
    unfinishedStory(storyId: $storyId) {
      _id
      unfinishedText
      blanks {
        _id
        blankType
      }
    }
  }
`;

export const QUERY_UNFINISHED_STORIES = gql`
  query getUnfinishedStories {
    unfinishedStories {
      _id
      unfinishedText
      blanks {
        _id
        blankType
      }
    }
  }
`;

export const QUERY_SINGLE_COMPLETED_STORY = gql`
  query getSingleCompletedStory($storyId: ID!) {
    completedStory(storyId: $storyId) {
      _id
      finishedText
      userId
    }
  }
`;

export const QUERY_COMPLETED_STORIES = gql`
  query getCompletedStories {
    completedStories {
      _id
      finishedText
      userId
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      stories {
        _id
        finishedText
      }
    }
  }
`;
