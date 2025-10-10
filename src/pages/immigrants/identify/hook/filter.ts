import { ArmValues } from "@/shared/types/form.type";

export const filterImmigrantValues = (values: ArmValues): ArmValues => {
  const filtered = { ...values };
  const textFields = ["first_name", "last_name", "middle_name"] as const;

  textFields.forEach((field) => {
    if (
      filtered[field] &&
      typeof filtered[field] === "string" &&
      filtered[field].length < 3
    ) {
      filtered[field] = "";
    }
  });

  return filtered;
};
