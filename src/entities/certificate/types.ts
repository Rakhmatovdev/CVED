// types.ts yoki shu fayl ichida
export type StatusType = "Приостановлено" | "Работает";

export interface ICertificates {
  id: number;
  region: string;
  nationality: string;
  fullName: string;
  inn: string;
  rating: 1 | 2 | 3 | 4 | 5;
  roomCount: number;
  bedCount: number;
  passportNumber: string;
  arrivalDate: string;
  departureDate: string;
  status: StatusType;
  createdAt: string;
}
