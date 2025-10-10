import { Spin, Table, TableProps } from "antd";
import { createStyles } from "antd-style";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils.ts";
import Button from "@/shared/ui/Button";
import { HTableSpinner } from "@/shared/ui/form-elements/HTableSpinner";
import ArrowLeftIcon from "@/shared/ui/icons/pagination/ArrowLeft.tsx";
import ArrowRightIcon from "@/shared/ui/icons/pagination/ArrowRight.tsx";
import { useCurrentLang } from "@/widgets/app-header/model/store";
import NoData from "../NoData";

const useStyle = createStyles(({ css }) => {
  const antCls = ".ant";
  return {
    customPaginationStyle: css`
      * {
        transition:
          background 0.2s ease-out,
          color 0.2s ease-out,
          border 0.2s ease-out;
      }
    `,
    customTable: css`
      ${antCls}-table {
        transition: all 0.2s ease-out;

        * {
          transition: all 0.2s ease-out;
        }

        ${antCls}-table-container {
          border-inline: none !important;
          transition: all 0.2s ease-out;
          border-radius: 0;

          ${antCls}-table-thead tr th {
            height: 40px;
            padding-inline: 16px;
            padding-block: 0;
            transition: all 0.2s ease-out;
          }

          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: rgba(100, 116, 139, 0.4) transparent;
          }

          .ant-table-row .ant-table-cell {
            transition: all 0.2s ease-out;
          }

          ${antCls}-table-body::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ${antCls}-table-body::-webkit-scrollbar-track {
            background: transparent;
          }

          ${antCls}-table-body::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: rgba(100, 116, 139, 0.4);
            transition:
              background-color 0.2s,
              opacity 0.3s;
            opacity: 0;
          }

          .dark & {
            ${antCls}-table-body {
              scrollbar-color: rgba(148, 163, 184, 0.5) transparent;
            }

            ${antCls}-table-body::-webkit-scrollbar-thumb {
              background-color: rgba(148, 163, 184, 0.5);
            }

            ${antCls}-table-body:hover::-webkit-scrollbar-thumb {
              opacity: 1;
            }
          }
        }
      }

      .hf-table-header,
      .hf-table-footer,
      .hf-table-control-panel {
        margin-bottom: 8px;
        padding: 4px 8px;
        background: #fafafa;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
      }

      .hf-table-control-panel {
        margin-bottom: 16px;
      }
    `
  };
});

export interface HFTableProps<T> extends TableProps<T> {
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  controlPanel?: React.ReactNode;
  total?: number;
  tableParams?: any;
  customPagination?: boolean;
  isFetching?: boolean;
  loading?: boolean;
}

// export function HTable<T extends { key: React.Key }>({
export function HTable<T>({
  headerComponent,
  footerComponent,
  controlPanel,
  className,
  loading,
  total,
  tableParams,
  customPagination,
  pagination = false,
  isFetching,
  dataSource,
  ...tableProps
}: HFTableProps<T>) {
  const { styles } = useStyle();
  const { t } = useTranslation();
  const lang = useCurrentLang((state) => state.lang);

  const defaultPagination = useMemo(() => {
    if (!customPagination || total < 10) return pagination;
    return {
      ...tableParams?.pagination,
      position: ["bottomRight"] as const,
      locale: {
        page: "",
        // prev_page: t("table.prev"),
        // next_page: t("table.next"),
        items_per_page: "",
        jump_to: "",
        jump_to_confirm: ""
      },
      total: total || 0,
      showSizeChanger: true,
      showQuickJumper: true,
      className: cn("custom-pagination", styles.customPaginationStyle),
      showTotal: (total, range) => {
        return (
          <div className="py-2 mr-4 transition">
            {lang === "ru"
              ? `${range[0]}–${range[1]} ${t("table.pagination.of")} ${total}`
              : `Jami ${total} ${t("table.pagination.of")} ${range[0]}-${range[1]} ko'rsatilmoqda`}
          </div>
        );
      },
      prevIcon: (
        <Button
          className="mt-[2px] transition-colors rounded-md dark:border-dborder  dark:bg-dbody "
          size="md"
        >
          <ArrowLeftIcon className={" text-primary dark:text-dprimary"} />
          <p className={"text-primary dark:text-dprimary font-medium"}>
            {t("table.prev")}
          </p>
        </Button>
      ),
      nextIcon: (
        <Button
          className="mt-[2px] transition-colors rounded-md dark:border-dborder dark:bg-dbody"
          size="md"
        >
          <ArrowRightIcon className={"text-primary dark:text-dprimary"} />
          <p className={"text-primary dark:text-dprimary font-medium "}>
            {t("table.next")}
          </p>
        </Button>
      ),
      ...pagination
    };
  }, [customPagination, tableParams, total, pagination, t, lang]);

  return (
    <div className="hf-table-wrapper transition-all relative  w-full">
      {loading ? (
        <Spin className="absolute flex backdrop-blur-sm items-center justify-center z-20 inset-0" />
      ) : null}
      {controlPanel && (
        <div className="hf-table-control-panel">{controlPanel}</div>
      )}
      {headerComponent && (
        <div className="hf-table-header">{headerComponent}</div>
      )}
      {!loading && !isFetching && !dataSource?.length ? (
        <div className="flex-grow h-full">
          <NoData />
        </div>
      ) : (
        <Table<T>
          className={`[&_.ant-pagination-total-text]:hidden [&_.ant-pagination-options]:ml-0 ${styles.customTable} ${className || ""}`}
          pagination={defaultPagination}
          dataSource={dataSource}
          scroll={{ x: "max-content" }}
          loading={loading || isFetching}
          {...tableProps}
        />
      )}

      {footerComponent && (
        <div className="hf-table-footer">{footerComponent}</div>
      )}
      <HTableSpinner show={isFetching} />
    </div>
  );
}

export default HTable;
