import { Button, Col, Drawer, Row, Space, Tabs } from "antd";

import React, { useMemo, useState } from "react";
import {
  DAY_OF_WEEK,
  IWeek,
  IWeekCourse,
  TWeek,
  getAvailableTimeColumns,
} from "../../../utils/constants";
import { EditableProTable } from "@ant-design/pro-components";
import { ChromeOutlined, RedoOutlined } from "@ant-design/icons";
import styles from "./AvailableTime.module.scss";
import { useCourseInfo, useEditCourseInfo } from "../../../services/course";
import _ from "lodash";

interface AvailableTimeProps {
  id?: string;
  onClose: () => void;
  open: boolean;
  onCloseAndRefetch: () => void;
}

const AvailableTime: React.FC<AvailableTimeProps> = ({
  open,
  onClose,
  id,
  onCloseAndRefetch,
}) => {
  const [currentDay, setCurrentDay] = useState<IWeek>(DAY_OF_WEEK[0]);
  const { refetch, data, loading } = useCourseInfo(id as string);
  const [edit, editLoading] = useEditCourseInfo();

  const availableTime = useMemo(() => {
    return (data?.appointmentTime || []).find(
      (item) => item.week === currentDay.key
    )?.availableTime as IAvailableTime[];
  }, [data]);

  const onTabChangeHandler = (key: string) => {
    const current = DAY_OF_WEEK.find((item) => item.key === key);
    if (current) {
      setCurrentDay(current);
    }
  };

  const onDeleteHandler = (key: number) => {
    console.log("onDeleteHandler", key);
  };

  const onSaveHandler = (availableTime: IAvailableTime[]) => {
    const newAppointmentTime = [...(data?.appointmentTime || [])];
    const index = newAppointmentTime.findIndex(
      (item) => item.week === currentDay.key
    );
    if (index > -1) {
      newAppointmentTime[index] = {
        week: currentDay.key as TWeek,
        availableTime,
      };
    } else {
      newAppointmentTime.push({
        week: currentDay.key as TWeek,
        availableTime,
      });
    }
    edit(
      id,
      {
        appointmentTime: newAppointmentTime,
      },
      () => {
        refetch();
      }
    );
  };

  return (
    <div>
      <Drawer
        title={"Available Time"}
        width={720}
        open={open}
        onClose={onClose}
      >
        <Tabs
          type="card"
          items={DAY_OF_WEEK}
          onChange={onTabChangeHandler}
        ></Tabs>
        <EditableProTable<IAvailableTime>
          headerTitle={
            <Space>
              Select Courses on <span>{currentDay.label}</span>
            </Space>
          }
          rowKey="key"
          value={availableTime}
          recordCreatorProps={{
            record: (index: number) => ({
              key: index + 1,
              startTime: "12:00:00",
              endTime: "12:30:00",
            }),
          }}
          columns={getAvailableTimeColumns(onDeleteHandler)}
          editable={{
            onSave: async (key, row) => {
              const newRowStart =
                row.startTime.split(" ").length > 1
                  ? row.startTime.split(" ")[1]
                  : row.startTime;
              const newRowEnd =
                row.endTime.split(" ").length > 1
                  ? row.endTime.split(" ")[1]
                  : row.endTime;
              const newRow = {
                ...row,
                startTime: newRowStart,
                endTime: newRowEnd,
              };
              console.log("onSave", key, row);
              if (
                availableTime === undefined ||
                availableTime?.findIndex((item) => item.key === key) === -1
              ) {
                if (availableTime === undefined)
                  onSaveHandler([_.omit(newRow, "index")]);
                else {
                  const newData = [...availableTime, _.omit(newRow, "index")];
                  onSaveHandler(newData);
                }
              } else {
                const newData = availableTime.map((item) =>
                  item.key === key ? _.omit(newRow, "index") : { ...item }
                );
                onSaveHandler(newData);
              }
            },
          }}
        />
        <Row gutter={20} className={styles.button}>
          <Col span={12} style={{}}>
            <Button
              icon={<RedoOutlined />}
              style={{ width: "100%" }}
              type="primary"
            >
              Sync to workdays
            </Button>
          </Col>
          <Col span={12}>
            <Button
              icon={<ChromeOutlined />}
              style={{ width: "100%" }}
              type="primary"
              danger
            >
              Sync to whole week
            </Button>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default AvailableTime;
