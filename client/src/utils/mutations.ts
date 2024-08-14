import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        lastName
        email
        location
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($name: String!, $lastName: String!, $email: String!, $location: String!) {
    updateUser(name: $name, lastName: $lastName, email: $email, location: $location) {
      token
      user {
        _id
        name
        lastName
        email
        location
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        lastName
        email
        location
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation addJob($company: String!, $position: String!, $location: String!, $status: String!, $type: String!) {
    addJob(company: $company, position: $position, location: $location, status: $status, type: $type) {
      _id
    }
  }
`;

export const DELETE_JOB = gql`
  mutation deleteJob($id: ID) {
    deleteJob(_id: $id) {
      _id
      company
      position
      status
      type
      location
    }
  }
`;

export const EDIT_JOB = gql`
  mutation editJob(
    $company: String!
    $position: String!
    $location: String!
    $status: String!
    $type: String!
    $id: ID
  ) {
    editJob(company: $company, position: $position, location: $location, status: $status, type: $type, _id: $id) {
      _id
      company
      position
      status
      type
      location
    }
  }
`;
