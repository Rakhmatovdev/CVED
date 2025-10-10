import { Divider, Modal } from "antd";
import { useQueryState } from "nuqs";

export default function DetailsModal() {
  const [immigrantId, setImmigrantId] = useQueryState("immigrant_id", {
    defaultValue: ""
  });

  return (
    <Modal
      centered
      open={!!immigrantId && immigrantId !== ""}
      onOk={() => setImmigrantId("")}
      onCancel={() => setImmigrantId("")}
      closable={false}
      footer={null}
    >
      <h2 className="text-2xl font-medium text-center">
        Рахимова Азиза Икрамовна
      </h2>
      <Divider />
      <h3 className="text-lg font-medium mb-3">Персональная информация</h3>
      <div className="space-y-4">
        <Row label="ID" value="2430483" />
        <Row label="Person ID" value="2430483" />
        <Row label="Гражданство" value="Узбекистан" />
        <Row label="Дата рождения" value="12.12.2012" />
        <Row label="Регистрироваться" value="12.12.2012" />
        <Row label="Паспорт" value="АВ1278511" />
      </div>
    </Modal>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <p className="text-base text-[#6B7280] font-medium">{label}</p>
      <p className="text-base font-medium">{value || "-"}</p>
    </div>
  );
};
