type IHotelType = "first" | "second" | "third";
type IHotelStatus = "stopped" | "working";

export interface IHotel {
  id: number;
  region: string;
  district: string;
  name: string;
  contract_number: number;
  hotel_type: IHotelType;
  status: IHotelStatus;
  stars: number;
  inn: number;
  number_of_rooms: number;
  koek: number;
  address: string;
  phone_number: string;
}
