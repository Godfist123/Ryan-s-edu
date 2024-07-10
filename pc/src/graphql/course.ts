import { gql } from "@apollo/client";

export const getCourses = gql`
  query getCourses($page: PageInput!, $name: String) {
    getCourses(page: $page, name: $name) {
      code
      message
      page {
        total
        pageSize
        pageNum
      }
      data {
        id
        maximum
        duration
        name
      }
    }
  }
`;
