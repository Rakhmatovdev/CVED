import { ICitizenship } from "@/entities/immigrant/immigrant/types.ts";

export interface IGuestHistory {
  id: number;
  person_id: number;
  fio: string;
  photo: string;
  citizenship: ICitizenship;
  hotel: string;
  passport: string;
  birth_date: string; // empty string for now
  arrived: string; // empty string for now
  status: "Активный" | "Не активный";
  client: {
    name: string;
    email: string;
  };
  checkInDate: string;
  amount: number;
}
