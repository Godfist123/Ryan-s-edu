import { ProColumns } from "@ant-design/pro-components";
import { ICourse } from "../services/course";
import { Button, Popconfirm, Space } from "antd";
export const AUTH_TOKEN = "auth_token";
export const DEFAULT_PAGE_SIZE = 10;

export const getColumns = (
  onEditHandler: (id: string) => void,
  onAvailableTimeHandler: (id: string) => void
): ProColumns<ICourse>[] => {
  return [
    {
      title: " name",
      dataIndex: "name",
    },
    {
      title: "Maximum number of people",
      dataIndex: "maximum",
      search: false,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      search: false,
    },
    {
      title: "actions",
      valueType: "option",
      dataIndex: "id",
      align: "center",
      width: 200,
      render: (text, entity) => [
        <Button key="edit" type="link" onClick={() => onEditHandler(entity.id)}>
          Edit
        </Button>,
        <Button
          key="availableTime"
          type="link"
          onClick={() => onAvailableTimeHandler(entity.id)}
        >
          Available Time
        </Button>,
      ],
    },
  ];
};

export interface IWeek {
  key: string;
  label: string;
}

export type TWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const DAY_OF_WEEK: IWeek[] = [
  {
    key: "monday",
    label: "Monday",
  },
  {
    key: "tuesday",
    label: "Tuesday",
  },
  {
    key: "wednesday",
    label: "Wednesday",
  },
  {
    key: "thursday",
    label: "Thursday",
  },
  {
    key: "friday",
    label: "Friday",
  },
  {
    key: "saturday",
    label: "Saturday",
  },
  {
    key: "sunday",
    label: "Sunday",
  },
];

export const getAvailableTimeColumns = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  onDeleteHandler: Function
): ProColumns[] => [
  {
    title: "Index",
    dataIndex: "key",
    width: 50,
    align: "center",
  },
  {
    title: "StartTime",
    dataIndex: "startTime",
    valueType: "time",
    width: 160,
    align: "center",
  },
  {
    title: "EndTime",
    dataIndex: "endTime",
    valueType: "time",
    width: 160,
    align: "center",
  },
  {
    title: "Option",
    valueType: "option",
    width: 160,
    align: "center",
    render: (text, record, _, action) => (
      <Space>
        <a key="edit" onClick={() => action?.startEditable(record.key)}>
          Edit
        </a>
        <Popconfirm
          title="Alert"
          description="This action can't be recover"
          onConfirm={() => onDeleteHandler(record.key)}
        >
          <a key="delete">Delete</a>
        </Popconfirm>
      </Space>
    ),
  },
];

export interface IAvailableTime {
  startTime: string;
  endTime: string;
  key: number;
}

export interface IWeekCourse {
  week: TWeek;
  availableTime: IAvailableTime[];
}

export const isWorkDays = (day: string): boolean => {
  return (
    day === "monday" ||
    day === "tuesday" ||
    day === "wednesday" ||
    day === "thursday" ||
    day === "friday"
  );
};

export const getMaxKey = (availableTime: IAvailableTime[]): number => {
  if (availableTime === undefined || availableTime.length === 0) {
    return 1;
  }
  let max = 0;
  availableTime.forEach((item) => {
    if (item.key > max) {
      max = item.key;
    }
  });
  return max + 1;
};

// export const COLUMN: ProColumns<ICourse>[] = [
//   {
//     title: " name",
//     dataIndex: "name",
//   },
//   {
//     title: "Maximum number of people",
//     dataIndex: "maximum",
//     search: false,
//   },
//   {
//     title: "Duration",
//     dataIndex: "duration",
//     search: false,
//   },
//   {
//     title: "actions",
//     valueType: "option",
//     key: "option",
//     render: (text: any, record: any, _: any, action: any): ReactElement[] => [
//       <Button>Edit</Button>,
//     ],
//   },
// ];
