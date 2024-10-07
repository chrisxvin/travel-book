export const getPriceFormat = (currency: string = "CNY", locales = "zh-CN") =>
(new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}));
