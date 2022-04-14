import { gql } from "@apollo/client";


export const FEEDS_QUERY = gql`
  query feed($fellowshipType: String, $after: String){
    feed(fellowshipType: $fellowshipType, after: $after) {
        edges {
        node {
          id
          name 
          desc
          type
          avatar_url
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const PROJECT_QUERY = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      name
      description
      icon_url
      users {
        id
        name
        avatar_url
      }
    }
  }
`;

export const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`;
