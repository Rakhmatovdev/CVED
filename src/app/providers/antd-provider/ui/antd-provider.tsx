import { App, ConfigProvider } from "antd";
import useApp from "antd/es/app/useApp";
// i18n.js or locale.js
import dayjs from "dayjs";
import { PropsWithChildren } from "react";
import { antdTheme } from "@/app/providers/antd-provider/config/theme";
import { setNotificationApi } from "@/shared/lib/notification.ts";
import useDarkMode from "@/utils/hooks/useDarkMode.tsx";
import "dayjs/locale/ru";
import "dayjs/locale/uz";

// Antd locales
import ruRU from "antd/locale/ru_RU";
import uzUZ from "antd/locale/uz_UZ";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n.ts";

export const antdLocales = {
  ru: ruRU,
  uz: uzUZ
};

dayjs.locale(i18n.language);

export const AntdProvider = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useDarkMode();

  return (
    <ConfigProvider
      theme={antdTheme(isDarkMode)}
      locale={antdLocales[i18n.language]}
    >
      <App>
        <AntdBridge>{children}</AntdBridge>
      </App>
    </ConfigProvider>
  );
};

const AntdBridge = ({ children }: PropsWithChildren) => {
  const { notification } = useApp();
  setNotificationApi(notification);
  return children;
};
