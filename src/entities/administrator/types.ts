// types.ts yoki shu fayl ichida
export type StatusType = "Активный" | "Не активный";

export interface IAdministrator {
  id: number;
  avatar: string;
  hotel: string;
  role: string;
  rooms: number;
  client: {
    name: string;
    email: string;
  };
  status: StatusType;
  checkInDate: string;
  amount: number;
}
