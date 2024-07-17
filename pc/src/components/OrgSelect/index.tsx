import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Select, Space } from "antd";
import { useOrganizations } from "../../services/org";
import _ from "lodash";
import withUser, {
  WithUserDataProps,
} from "../../utils/context/WithUserContext";
import { useNavigate } from "react-router-dom";
import { currentOrg } from "../../utils";

interface OrgSelectorProps extends WithUserDataProps {
  // Define your props here
}

const OrgSelector: React.FC<OrgSelectorProps> = ({ userData, setUserData }) => {
  const { data, refetch } = useOrganizations(1, 10, true);
  const Navi = useNavigate();

  useEffect(() => {
    if (currentOrg()?.value) {
      setUserData({ ...userData, currentOrg: currentOrg().value });
    } else {
      Navi("/noorg");
    }
  }, []);
  const onSearchHandler = _.debounce((name: string) => {
    refetch({ name });
  }, 500);

  const onChangeHandler = (value: { value: string; label: string }) => {
    setUserData({ ...userData, currentOrg: value.value });
    localStorage.setItem("currentOrg", JSON.stringify(value));
  };

  return (
    <div className={styles.container}>
      <Space>
        Select Org:
        <Select
          style={{ width: 200 }}
          showSearch
          onSearch={onSearchHandler}
          filterOption={false}
          onChange={onChangeHandler}
          defaultValue={userData.currentOrg || currentOrg()}
          placeholder="Select an Org"
          labelInValue //the return value will include the name
        >
          {data?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Space>
    </div>
  );
};

export default withUser(OrgSelector);
