import { gql } from "@apollo/client";

export const FIND = gql`
  query findOne($id: String!) {
    findOne(id: $id) {
      id
      name
      desc
    }
  }
`;

export const UPDATE = gql`
  mutation update($id: String!, $params: UserInput!) {
    update(id: $id, params: $params)
  }
`;
