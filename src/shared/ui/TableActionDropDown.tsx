import { Dropdown, MenuProps } from "antd";
import Button from "./Button";
import DotsOnlyIcon from "./icons/DotsIcon";

export function TableActionDropdown({ items }: { items: MenuProps["items"] }) {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        variant="ghost"
        className="f-full"
        type="button"
        onClick={(e) => e.preventDefault()}
      >
        <DotsOnlyIcon />
      </Button>
    </Dropdown>
  );
}
