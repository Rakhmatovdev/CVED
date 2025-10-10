type status =
  | "Доработан"
  | "Отклонен"
  | "Новый"
  | "Процессе"
  | "Одобрено"
  | "Возврат";

const useColor = (status: status | string) => {
  // const { t } = useTranslation();

  // // Dynamic translation key
  // const translatedPaid = t('table.paid');
  // const translatedNew = t('table.new');
  // const translatedPending = t('table.pending');
  // const translatedFinalized = t('table.finalized');
  // const translatedSuccess = t('table.success');
  // const translatedCancelled = t('table.cancelled');

  let bgColor = "";

  switch (status) {
    case "Отклонен":
      // case translatedPaid:
      bgColor = "text-darkRed bg-lightRed";
      break;
    case "Новый":
      // case translatedNew:
      bgColor = "text-mediumGray bg-lightTest";
      break;
    case "В процессе":
      // case translatedPending:
      bgColor = "text-goldYellow bg-lightYellow";
      break;
    case "Доработан":
      // case translatedFinalized:
      bgColor = "text-bluePrimary bg-blue-100";
      break;
    case "Одобрено":
      // case translatedSuccess:
      bgColor = "text-lightGreen bg-boldGreen";
      break;
    case "Возврат":
      // case translatedCancelled:
      bgColor = "text-primary bg-gray-100";
      break;
    default:
      bgColor = "";
  }

  return bgColor;
};

export default useColor;
