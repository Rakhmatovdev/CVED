import { Dropdown, MenuProps } from "antd";
import { useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/Button";
import DotsOnlyIcon from "@/shared/ui/icons/DotsIcon";
import PencilIcon from "@/shared/ui/icons/PencilIcon";
import TrashIcon from "@/shared/ui/icons/TrushIcon";

export default function ActionDropdown({ id }: { id: number }) {
  const { t } = useTranslation();
  const [_, setShowUpdateModal] = useQueryState("immigrant_id", {
    defaultValue: ""
  });

  const items: MenuProps["items"] = [
    {
      label: (
        <Button variant="ghost" size="xs">
          <PencilIcon />
          {t("statics.edit")}
        </Button>
      ),
      key: "update"
    },
    {
      label: (
        <Button variant="ghost" size="xs">
          <TrashIcon />
          {t("statics.delete")}
        </Button>
      ),
      key: "delete"
    }
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "update") {
      setShowUpdateModal(String(id));
    } else if (e.key === "delete") {
      console.log("delete clicked", id);
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <button title="Actions" type="button" onClick={(e) => e.preventDefault()}>
        <DotsOnlyIcon />
      </button>
    </Dropdown>
  );
}
