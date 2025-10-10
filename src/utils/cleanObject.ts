import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";

const flatObject = (object: any): any => {
  return omitBy(object, (value) => isNil(value) || value === "");
};

export default flatObject;

export const deepFlatObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    const cleaned = obj
      .map(deepFlatObject)
      .filter(
        (v) =>
          v !== undefined &&
          v !== null &&
          v !== "" &&
          !(Array.isArray(v) && v.length === 0)
      );

    return cleaned.length === 0 || cleaned.every((v) => v == null || v === "")
      ? undefined
      : cleaned;
  }

  if (typeof obj === "object" && obj !== null) {
    const result: any = {};

    for (const key in obj) {
      const cleanedValue = deepFlatObject(obj[key]);

      const shouldRemove =
        cleanedValue === undefined ||
        cleanedValue === null ||
        cleanedValue === "" ||
        (Array.isArray(cleanedValue) &&
          (cleanedValue.length === 0 ||
            cleanedValue.every((v) => v == null || v === "")));

      if (!shouldRemove) {
        result[key] = cleanedValue;
      }
    }

    return Object.keys(result).length === 0 ? undefined : result;
  }

  return obj;
};
