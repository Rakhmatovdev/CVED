import { Flex } from "antd";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface CommonPageWrapperProps extends React.PropsWithChildren {
  i18nTitle?: string;
}
export const CommonPageWrapper: FC<CommonPageWrapperProps> = ({
  i18nTitle,
  children
}) => {
  const { t } = useTranslation();
  return (
    <Flex
      vertical
      className="h-full w-full p-6 bg-[#F8FAFC] dark:bg-[#1F2135] gap-6 transition"
    >
      {i18nTitle && (
        <h1 className="text-2xl font-semibold text-[#1F2937] dark:text-white transition">
          {t(i18nTitle)}
        </h1>
      )}
      {children}
    </Flex>
  );
};
