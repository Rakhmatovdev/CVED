import { Modal, Tabs, TabsProps } from "antd";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import AdditionalInfo from "./AdditionalInfo";
import Children from "./Children";
import InfoAboutNumber from "./InfoAboutNumber";
import InfoTab from "./InfoTab";
import Reviews from "./Reviews";

export default function LarrivedDetails() {
  const [immigrant_id, setImmigrantId] = useQueryState("immigrant_id", {
    defaultValue: ""
  });
  const [active_tab, setActiveTab] = useQueryState("active_tab", {
    defaultValue: ""
  });

  const [activeKey, setActiveKey] = useState("1");
  const [height, setHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);

  const items: TabsProps["items"] = [
    { key: "1", label: "Информация", children: <InfoTab /> },
    { key: "2", label: "Доп. информации", children: <AdditionalInfo /> },
    { key: "3", label: "Отзывы", children: <Reviews /> },
    { key: "4", label: "Дети", children: <Children /> },
    { key: "5", label: "Номера", children: <InfoAboutNumber /> }
  ];

  const onChange = (key: string) => {
    setActiveKey(key);
    setActiveTab(key);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [activeKey]);

  const currentItem = items.find((item) => item.key === activeKey);

  return (
    <Modal
      open={immigrant_id !== ""}
      title={
        <p className="text-2xl font-semibold text-secondary dark:text-dvalue">
          Рахимова Азиза Икрамовна
        </p>
      }
      onCancel={() => setImmigrantId("")}
      footer={null}
      width={"max-content"}
      className="custom-modal"
    >
      <Tabs
        defaultActiveKey={active_tab}
        activeKey={activeKey}
        items={items.map(({ key, label }) => ({ key, label }))}
        onChange={onChange}
        className={"w-[700px]"}
      />

      <motion.div
        animate={{ height }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div ref={contentRef}>{currentItem?.children}</div>
      </motion.div>
    </Modal>
  );
}
