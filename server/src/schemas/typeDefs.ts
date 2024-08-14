import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    lastName: String
    email: String
    password: String
    location: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Job {
    _id: ID
    company: String
    position: String
    status: String
    type: String
    location: String
    createdBy: User
    createdAt: String
  }

  type Stats {
    _id: String
    count: Int
  }

  type YearMonth {
    year: String
    month: String
  }

  type Applications {
    _id: YearMonth
    count: Int
  }

  type Query {
    me: User
    getAllUsers: [User]
    getUserById(_id: ID): User
    getAllJobs: [Job]
    getJobById(_id: ID): Job
    showStats: [Stats]
    monthlyApplications: [Applications]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!): Auth
    updateUser(name: String!, lastName: String!, email: String!, location: String!): Auth
    addJob(company: String!, position: String!, location: String!, status: String!, type: String!): Job
    deleteJob(_id: ID): Job
    editJob(_id: ID, company: String!, position: String!, location: String!, status: String!, type: String!): Job
  }
`;

export default typeDefs;
