import { ThemeConfig, theme } from "antd";

export const antdTheme = (dark: boolean): ThemeConfig => ({
  algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  components: {
    Notification: {
      borderRadiusLG: 20
    },
    Modal: {
      headerBg: dark ? "#001529" : "#fff",
      titleColor: dark ? "#fff" : "#000",
      titleFontSize: 26
    }
  }
});
