import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
  }

  type Feed {
    id: Int!
    name: String!
    desc: String!
    created_ts: String!
    type: String!
    avatar_url: String!
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    feed(after: String, fellowshipType: String): FeedConnection!
  }

# distance between two nodes in a graph
  type Edge {
    cursor: String
    node: Feed
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  type FeedConnection {
    edges: [Edge!]!
    pageInfo: PageInfo!
  }

  
`;

export const server = new ApolloServer({typeDefs, resolvers})
