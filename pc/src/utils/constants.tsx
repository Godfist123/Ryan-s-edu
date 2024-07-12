import { ProColumns } from "@ant-design/pro-components";
import { ICourse } from "../services/course";
import { ReactElement } from "react";
import { Button } from "antd";

export const AUTH_TOKEN = "auth_token";
export const DEFAULT_PAGE_SIZE = 10;

export const getColumns = (
  onEditHandler: (id: string) => void
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
      title: "操作",
      valueType: "option",
      dataIndex: "id",
      align: "center",
      width: 200,
      render: (text, entity) => [
        <Button key="edit" type="link" onClick={() => onEditHandler(entity.id)}>
          Edit
        </Button>,
      ],
    },
  ];
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
