import { Flag } from "@/shared/ui/Flag";
import Row from "../../../../shared/ui/Row";

export default function Children() {
  return (
    <div className="space-y-3 w-full">
      <div className="rounded-2xl border border-dborder p-4 space-y-3 shadow shadow-[#0000000D]">
        <h2 className="text-xl font-semibold">Рахматов Жасурбек Икрамович</h2>
        <Row label="Дата рождения" value="31.12.1980" dir="row" />
        <Row
          label="Паспорт или свидетельство о рождении"
          value="АВ1278511"
          dir="row"
        />
        <Row label="Национальность" value="Узбекистан" dir="row" />
        <Row label="Пол" value="Мужской" dir="row" />
      </div>
      <div className="rounded-2xl border border-dborder p-4 space-y-3 shadow shadow-[#0000000D]">
        <h2 className="text-xl font-semibold">Рахматов Жасурбек Икрамович</h2>
        <Row label="Дата рождения" value="31.12.1980" dir="row" />
        <Row
          label="Паспорт или свидетельство о рождении"
          value="АВ1278511"
          dir="row"
        />
        <Row
          label="Национальность"
          value={
            <div className="flex gap-2 items-center">
              <Flag code="UZ" />
              Узбекистан
            </div>
          }
          dir="row"
        />
        <Row label="Пол" value="Мужской" dir="row" />
      </div>
    </div>
  );
}
