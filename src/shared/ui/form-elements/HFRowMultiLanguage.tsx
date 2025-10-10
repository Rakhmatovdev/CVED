import { Button, Flex } from "antd";

function HFRowWithMultiLanguage({ activeTab, setActiveTab }: any): JSX.Element {
  return (
    <Flex className="w-full py-[16px]">
      <Flex className="p-[2px] rounded-[10px] bg-[#F1F2F4] w-full">
        <Button
          style={{
            backgroundColor: activeTab === "ru" ? "#FFF" : "#F1F2F4"
          }}
          onClick={() => {
            setActiveTab("ru");
          }}
          className="p-[13px_37px] rounded-[10px] text-[#1E1E1E] text-base font-medium h-auto w-full"
        >
          RU
        </Button>

        <Button
          onClick={() => {
            setActiveTab("uz");
          }}
          style={{
            backgroundColor: activeTab === "uz" ? "#FFF" : "#F1F2F4"
          }}
          className="p-[13px_37px] rounded-[10px] text-[#1E1E1E] text-base font-medium h-auto w-full"
        >
          UZ
        </Button>
      </Flex>
    </Flex>
  );
}

export default HFRowWithMultiLanguage;
