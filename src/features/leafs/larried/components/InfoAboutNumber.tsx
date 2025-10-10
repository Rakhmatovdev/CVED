import { Rate } from "antd";
import Row from "../../../../shared/ui/Row";

export default function InfoAboutNumber() {
  return (
    <div className="rounded-2xl border border-dborder p-4 space-y-3 shadow shadow-[#0000000D]">
      <h2 className="text-xl font-semibold">Инфо о носмера</h2>
      <Row label="Гостиница" value="Hilton Tashkent City" dir="row" />
      <Row label="Адрес" value="г. Ташкент, ул. Ислама Каримова, 2" dir="row" />
      <Row
        label="Категория"
        value={<Rate tooltips={["", "", "", "", ""]} />}
        dir="row"
      />
      <Row label="Зарегистрировал" value="Абдугаффаров З." dir="row" />
      <Row label="Номер комнаты" value="1505" dir="row" />
      <Row label="Тип номера" value="Deluxe Twin" dir="row" />
      <Row label="Этаж / корпус" value="15 этаж, восточный корпус" dir="row" />
      <Row label="Вместимость" value="2 взрослых + 1 ребёнок" dir="row" />
      <Row label="Размещение" value="С завтраком" dir="row" />
    </div>
  );
}
