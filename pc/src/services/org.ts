import { useMutation, useQuery } from "@apollo/client";
import {
  COMMIT_ORG,
  getOrgDetail,
  getOrgList,
  getSimpleOrgList,
} from "../graphql/org";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { message } from "antd";

export interface IImgs {
  id: string;
  url: string;
  remark: string;
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface IOrganization {
  id: string;
  orgFrontImg?: IImgs[];
  orgRoomImg?: IImgs[];
  orgOtherImg?: IImgs[];
  name: string;
  logo: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  identityCardBackImg: string;
  identityCardFrontImg: string;
  businessLicense: string;
}

export type TOrgsQuery = {
  //Type definition for the query response
  [key: string]: { __typename?: "Query"; data: IOrganization[]; page: IPage };
};

export type TOrgQuery = {
  [key: string]: { __typename?: "Query"; data: IOrganization };
};

export type TBaseOrganization = Partial<IOrganization>;

export const useOrganizations = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  isSimple = false
) => {
  const { data, loading, refetch } = useQuery<TOrgsQuery>(
    isSimple ? getSimpleOrgList : getOrgList,
    {
      variables: {
        page: {
          pageNum,
          pageSize,
        },
      },
    }
  );
  return {
    loading,
    refetch,
    page: data?.getOrganizations.page,
    data: data?.getOrganizations.data,
  };
};

export const useOrganization = (id: string) => {
  const { data, loading } = useQuery<TOrgQuery>(getOrgDetail, {
    variables: {
      id,
    },
  });
  return {
    loading,
    data: data?.getOrganizationInfo.data,
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEditInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_ORG);

  const handleEdit = async (id: number, params: TBaseOrganization) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    message.info(res.data.commitOrganization.message);
  };

  return [handleEdit, loading];
};
