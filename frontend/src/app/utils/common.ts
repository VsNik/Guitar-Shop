import dayjs from "dayjs";

const INTL_OPTION = {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
};

export const formatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY');
}

export const formatPrice = (price: number) => {
  const numberFormat = new Intl.NumberFormat("ru-RU", INTL_OPTION);
  return numberFormat.format(price);
}
