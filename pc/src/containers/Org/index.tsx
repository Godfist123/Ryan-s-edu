import React, { useState } from "react";
import styles from "./index.module.scss";
import { PageContainer, ProList } from "@ant-design/pro-components";
import { Button, Popconfirm, Tag } from "antd";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useOrganizations } from "../../services/org";
import EditOrg from "./components/EditOrg";

interface OrgProps {
  // Define your props here
}

const Org: React.FC<OrgProps> = (props) => {
  const { loading, data, page, refetch } = useOrganizations();
  //   const [delHandler, delLoading] = useDeleteOrg();

  const [showEdit, setShowEdit] = useState(false);
  const [curId, setCurId] = useState("");

  const editInfoHandler = (id: string) => {
    setCurId(id);
    setShowEdit(true);
  };

  //   const delInfoHandler = async (id: string) => {
  //     delHandler(id, refetch);
  //   };

  const addInfoHandler = () => {
    setCurId("");
    setShowEdit(true);
  };

  const onCloseHandler = () => {
    setShowEdit(false);
    refetch();
  };

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  const dataSource = data?.map((item) => ({
    ...item,
    key: item.id,
    subTitle: (
      <div>
        {item.tags?.split(",").map((tag) => (
          <Tag key={tag} color="#5BD8A6">
            {tag}
          </Tag>
        ))}
      </div>
    ),
    actions: [
      <Button type="link" onClick={() => editInfoHandler(item.id)}>
        Edit
      </Button>,
      <Popconfirm
        okText="Yes"
        cancelText="No"
        title="warning"
        //   okButtonProps={{
        //     loading: delLoading,
        //   }}
        description={`Delete ${item.name} ?`}
        // onConfirm={() => delInfoHandler(item.id)}
      >
        <Button type="link">Delete</Button>
      </Popconfirm>,
    ],
    content: item.address,
  }));

  return (
    <div className={styles.container}>
      <PageContainer
        loading={loading}
        header={{
          title: "Organizations Management",
        }}
        extra={[
          <Button key="1" type="primary" onClick={addInfoHandler}>
            Add new org
          </Button>,
        ]}
      >
        <ProList<any>
          pagination={{
            defaultPageSize: DEFAULT_PAGE_SIZE,
            showSizeChanger: false,
            total: page?.total,
            onChange: onPageChangeHandler,
          }}
          grid={{ gutter: 10, column: 2 }}
          showActions="always"
          rowSelection={false}
          metas={{
            title: {
              dataIndex: "name",
            },
            subTitle: {},
            type: {},
            avatar: {
              dataIndex: "logo",
            },
            content: {
              dataIndex: "address",
            },
            actions: {
              cardActionProps: "extra",
            },
          }}
          dataSource={dataSource}
        />
        {showEdit && <EditOrg id={curId} onClose={onCloseHandler} />}
      </PageContainer>
    </div>
  );
};

export default Org;
