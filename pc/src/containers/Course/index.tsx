import { PageContainer, ProTable } from "@ant-design/pro-components";
import React from "react";
import { ICourse, useCourses } from "../../services/course";
import { COLUMN } from "../../utils/constants";

interface CourseProps {
  // Define your props here
}

const Course: React.FC<CourseProps> = (props) => {
  const { data, refetch } = useCourses();
  return (
    <PageContainer header={{ title: "courses in this store" }}>
      <ProTable<ICourse>
        columns={COLUMN}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
        request={async (params: {
          pageSize?: number;
          current?: number;
          name?: string;
        }) => {
          const msg = await refetch(
            params.current,
            params.pageSize,
            params.name
          );
          return {
            data: msg.data,
            success: msg.flag,
            total: msg.page?.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default Course;
