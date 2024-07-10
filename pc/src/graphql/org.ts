import { gql } from "@apollo/client";

export const getOrgList = gql`
  query getOrganizations($page: PageInput!) {
    getOrganizations(page: $page) {
      code
      message
      page {
        total
        pageSize
        pageNum
      }
      data {
        id
        logo
        name
        address
        tags
      }
    }
  }
`;
export const getSimpleOrgList = gql`
  query getOrganizations($page: PageInput!, $name: String) {
    getOrganizations(page: $page, name: $name) {
      code
      message
      data {
        id
        name
      }
    }
  }
`;

export const getOrgDetail = gql`
  query getOrganizationInfo($id: String!) {
    getOrganizationInfo(id: $id) {
      code
      message
      data {
        id
        name
        logo
        tags
        description
        address
        tel
        longitude
        latitude
        identityCardBackImg
        identityCardFrontImg
        businessLicense
        orgRoomImg {
          url
          id
        }
        orgFrontImg {
          url
          id
        }
      }
    }
  }
`;

export const COMMIT_ORG = gql`
  mutation commitOrganization($params: OrganizationInput!, $id: String) {
    commitOrganization(params: $params, id: $id) {
      code
      message
    }
  }
`;
