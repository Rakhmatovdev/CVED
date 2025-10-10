import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates
} from "nuqs";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { FieldValues, Path, UseFormReturn, useWatch } from "react-hook-form";
import { useDebounce } from "use-debounce";

export type FilterConfig<T extends FieldValues> = {
  [K in keyof T]: "string" | "number" | "date" | "boolean";
};

export type FilterValueType<TType> = TType extends "number"
  ? number
  : TType extends "date"
    ? string | Date
    : string;

export type FiltersFromConfig<
  T extends FieldValues,
  C extends Partial<FilterConfig<T>>
> = {
  [K in keyof C]: FilterValueType<C[K]>;
};

export interface UseFiltersResult<
  T extends FieldValues,
  C extends Partial<FilterConfig<T>>
> {
  filters: FiltersFromConfig<T, C>;
  resetFilters: () => void;
}

function inferFilterTypes<T extends FieldValues>(values: T): FilterConfig<T> {
  const config = {} as FilterConfig<T>;
  for (const key in values) {
    const currentValue = values[key as keyof T] as unknown;
    if (currentValue instanceof Date) {
      config[key] = "date";
    } else if (
      typeof currentValue === "object" &&
      currentValue !== null &&
      "value" in currentValue
    ) {
      config[key] =
        typeof (currentValue as any).value === "number" ? "number" : "string";
    } else if (typeof currentValue === "number") {
      config[key] = "number";
    } else if (typeof currentValue === "boolean") {
      config[key] = "boolean";
    } else {
      config[key] = "string";
    }
  }
  return config;
}

export function useFilters<
  T extends FieldValues,
  C extends Partial<FilterConfig<T>> = Partial<FilterConfig<T>>
>(formMethods: UseFormReturn<T>, config?: C): UseFiltersResult<T, C> {
  const { setValue, control, reset } = formMethods;

  const values = useWatch({ control, exact: true }) || {};
  const [debouncedValues] = useDebounce(values, 400);
  console.log(values);

  const finalConfig = useMemo<FilterConfig<T>>(
    () => ({ ...inferFilterTypes(values as T), ...config }),
    [config, values]
  );

  // Parser by type
  const parserByType = {
    string: parseAsString.withDefault(""),
    number: parseAsInteger.withDefault(null),
    date: parseAsString.withDefault(""),
    boolean: parseAsBoolean.withDefault(null)
  };

  const queryConfig = useMemo(
    () =>
      Object.fromEntries(
        Object.keys(finalConfig).map((key) => [
          key,
          parserByType[finalConfig[key as keyof T] ?? "string"]
        ])
      ),
    [finalConfig]
  );

  const [queryValues, setQuery] = useQueryStates(queryConfig);

  const effectiveValues = useMemo(() => {
    const obj: Record<string, any> = {};
    for (const key in values) {
      const type = finalConfig[key as keyof T];

      const rawVal = type === "string" ? debouncedValues[key] : values[key];

      if (rawVal != null && rawVal !== undefined) {
        obj[key] =
          typeof rawVal === "object" && "value" in rawVal
            ? rawVal.value
            : rawVal;
      }
    }
    return obj;
  }, [values, debouncedValues, finalConfig]);

  // First load: sync query → form (one time only)
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    for (const key in queryValues) {
      const qVal = queryValues[key];
      if (qVal != null) {
        setValue(key as Path<T>, qVal as any, {
          shouldDirty: false,
          shouldTouch: false
        });
      }
    }
  }, [queryValues, setValue]);

  const prevValuesRef = useRef<Record<string, any>>({});
  const effectiveValuesJson = JSON.stringify(effectiveValues);

  useEffect(() => {
    const prev = prevValuesRef.current;
    const diff: Record<string, any> = {};
    let hasDiff = false;

    const allKeys = new Set([
      ...Object.keys(prev),
      ...Object.keys(effectiveValues)
    ]);

    for (const key of allKeys) {
      if (prev[key] !== effectiveValues[key]) {
        diff[key] = effectiveValues[key] ?? null;
        hasDiff = true;
      }
    }

    if (hasDiff) {
      prevValuesRef.current = effectiveValues;
      setQuery(diff);
    }
  }, [effectiveValuesJson]);

  const resetFilters = useCallback(() => {
    reset();
    setQuery(Object.fromEntries(Object.keys(config).map((key) => [key, null])));
    prevValuesRef.current = {};
  }, [reset, setQuery]);

  return { filters: effectiveValues, resetFilters } as UseFiltersResult<T, C>;
}
