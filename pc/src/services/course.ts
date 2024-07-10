import { useQuery } from "@apollo/client";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { getCourses } from "../graphql/course";
import { IPage } from "./org";

export interface ICourse {
  id: string;
  name: string;
  desc?: string;
  group?: string;
  prerequisites?: string;
  maximum: number;
  duration: number;
  appointment?: string;
  refund?: string;
  other?: string;
}
export type TCourseQuery = {
  [key: string]: {
    __typename?: "Query";
    data: ICourse[];
    page: IPage;
  };
};

export const useCourses = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  isSimple = false
) => {
  const { data, loading, refetch } = useQuery<TCourseQuery>(getCourses, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });

  const refetchHandler = async (pn = 1, ps = DEFAULT_PAGE_SIZE, name = "") => {
    const { data: res, errors } = await refetch({
      name,
      page: {
        pageNum: pn,
        pageSize: ps,
      },
    });
    if (errors) {
      return {
        flag: false,
      };
    }
    return {
      page: res.getCourses.page,
      data: res.getCourses.data,
    };
  };
  return {
    loading,
    refetch: refetchHandler,
    page: data?.getCourses.page,
    data: data?.getCourses.data,
  };
};
