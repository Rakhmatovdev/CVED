export interface ResidencePermit {
  id: number;
}

export type ResidencePermitResponse = {
  data: ResidencePermit[];
  total: number;
  page: number;
  limit: number;
};
