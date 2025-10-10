import HelperService from "@/shared/service/helper.ts";
import { useDebouncedSelectQuery } from "@/utils/hooks/filter/useDebounce.tsx";

interface UseBorderingData {
  name: string;
  id: string;
}

export const useBorderingPoint = () =>
  useDebouncedSelectQuery<UseBorderingData>({
    queryKeyPrefix: ["bordering-point"],
    fetchFn: HelperService.helperBordering,
    mapFn: (item) => ({ label: item.name ?? "", value: item.id }),
    loadInitial: true
  });
