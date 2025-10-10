import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import type { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import { SIDEBAR_WIDTH } from "@/widgets/app-sidebar/model/constants.ts";
import AppSidebar from "@/widgets/app-sidebar/ui";
import AppHeader from "../../widgets/app-header/ui";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Layout className="transition bg-lightTest dark:bg-dbody">
      <AppSidebar />
      <ToastContainer />
      <Layout
        className={`transition bg-lightTest dark:bg-dbody w-[calc(100%-${SIDEBAR_WIDTH}px)]`}
      >
        <AppHeader />
        <Content className="transition">{children}</Content>
      </Layout>
    </Layout>
  );
}
