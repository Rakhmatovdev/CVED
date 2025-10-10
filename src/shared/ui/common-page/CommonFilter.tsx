// import { Flex } from "antd";
import React, { FC } from "react";

// import { useTranslation } from "react-i18next";

interface CommonFilterProps {
  filter?: React.ReactNode;
}
export const CommonFilter: FC<CommonFilterProps> = ({ filter }) => {
  // const { t } = useTranslation();

  if (!filter) {
    return <></>;
  }
  return <div>{filter}</div>;
};
