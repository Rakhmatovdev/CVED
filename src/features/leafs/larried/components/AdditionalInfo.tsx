import Row from "../../../../shared/ui/Row";

export default function AdditionalInfo() {
  return (
    <div className="w-full space-y-4">
      <Row label="Тип документа" value="ID карта АВ 12458721" dir="row" />
      <Row label="Дата выдачи паспорта" value="05.05.2025" dir="row" />
      <Row
        label="Орган, выдавший паспорт"
        value="Фаргона вилояти ИИБ"
        dir="row"
      />
      <Row label="Визит" value="Трудовая диятельность" dir="row" />
      <Row label="Тип гостя" value="Другое" dir="row" />
      <Row label="Виза № (Кем выдана)" value="Не указано" dir="row" />
      <Row label="Срок визы" value="05.05.2025" dir="row" />
      <Row label="КПП и дата" value="05.05.2025" dir="row" />
    </div>
  );
}
