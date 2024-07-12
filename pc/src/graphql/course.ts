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

export const COMMIT_COURSE = gql`
  mutation commitCourseInfo($params: CourseInput!, $id: String) {
    commitCourseInfo(params: $params, id: $id) {
      code
      message
    }
  }
`;

export const get_course_info = gql`
  query getCourseInfo($id: String!) {
    getCourseInfo(id: $id) {
      code
      message
      data {
        id
        name
        desc
        group
        prerequisites
        maximum
        duration
        appointment
        refund
        other
      }
    }
  }
`;
