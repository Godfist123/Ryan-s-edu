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
      token
    }
  }
`;
