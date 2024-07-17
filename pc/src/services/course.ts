import { useMutation, useQuery } from "@apollo/client";
import { DEFAULT_PAGE_SIZE, IWeekCourse } from "../utils/constants";
import { COMMIT_COURSE, getCourses, get_course_info } from "../graphql/course";
import { IPage } from "./org";
import { message } from "antd";

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
  appointmentTime: IWeekCourse[];
}
export type TCourseQuery = {
  [key: string]: {
    __typename?: "Query";
    data: ICourse[];
    page: IPage;
  };
};

export type TCourseSingleQuery = {
  [key: string]: {
    __typename?: "Query";
    data: ICourse;
    page: IPage;
  };
};
export type TBaseCourse = Partial<ICourse>;

export const useCourses = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
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

export const useEditCourseInfo = (): [
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleEdit: Function,
  loading: boolean
] => {
  const [edit, { loading }] = useMutation(COMMIT_COURSE);

  const handleEdit = async (
    id: number,
    params: TBaseCourse,
    callback: () => void
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitCourseInfo.code === 200) {
      message.info(res.data.commitCourseInfo.message);
      callback();
      return;
    }
    message.error(res.data.commitCourseInfo.message);
  };

  return [handleEdit, loading];
};

export const useGetCourseInfo = () => {
  const { data, refetch } = useQuery(get_course_info, { skip: true });
  return { data, refetch };
};

export const useCourseInfo = (id: string) => {
  const { data, loading, refetch } = useQuery<TCourseSingleQuery>(
    get_course_info,
    {
      variables: {
        id,
      },
    }
  );
  return { data: data?.getCourseInfo.data, loading, refetch };
};
