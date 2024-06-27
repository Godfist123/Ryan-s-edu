import { gql } from "@apollo/client";

export const sendOTP = gql`
  mutation SendOTP($tel: String!) {
    sendOTP(tel: $tel) {
      code
      message
    }
  }
`;

export const checkOTP = gql`
  mutation CheckOTP($tel: String!, $code: String!) {
    checkOTP(tel: $tel, code: $code) {
      code
      message
      data
    }
  }
`;

export const getUserByTel = gql`
  query GetUserByTel($tel: String!) {
    findOneByTel(tel: $tel) {
      name
      desc
      account
    }
  }
`;

export const getUserByToken = gql`
  query GetUserByToken($token: String!) {
    getUserByToken(token: $token) {
      data {
        tel
        id
        name
        desc
        account
        avatarUrl
      }
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser($id: String!, $params: UserInput!) {
    update(id: $id, params: $params) {
      code
      message
    }
  }
`;
