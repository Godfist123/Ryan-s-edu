import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import { ICourse, useCourses } from "../../services/course";
import { getColumns } from "../../utils/constants";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditCourse from "./components/EditCourse";
import AvailableTime from "./components/AvailableTime";

interface CourseProps {
  // Define your props here
}

const Course: React.FC<CourseProps> = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState("");
  const { data, refetch } = useCourses();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAvailableTime, setShowAvailableTime] = useState(false);

  const onClickHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId("");
    }
    setShowDrawer(true);
  };

  const onAvailableTimeHandler = (id: string) => {
    setCurId(id);
    setShowAvailableTime(true);
  };

  const closeAndRefetchHandler = () => {
    console.log("closeAndRefetchHandler");
    setShowDrawer(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer header={{ title: "courses in this store" }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns(onClickHandler, onAvailableTimeHandler)}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => {
          return [
            <Button
              key="add"
              type="primary"
              onClick={() => onClickHandler()}
              icon={<PlusOutlined />}
            >
              new
            </Button>,
          ];
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
      <EditCourse
        id={curId}
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        onCloseAndRefetch={closeAndRefetchHandler}
      />
      <AvailableTime
        id={curId}
        open={showAvailableTime}
        onClose={() => setShowAvailableTime(false)}
        onCloseAndRefetch={closeAndRefetchHandler}
      />
    </PageContainer>
  );
};

export default Course;
