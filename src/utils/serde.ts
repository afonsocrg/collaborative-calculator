export function formatCurrency(
  value: number | undefined,
  currency: string = "USD"
) {
  if (value === undefined) {
    return "";
  }
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
  }).format(value);
}

export function formatPercentage(value: number | undefined) {
  if (value === undefined) {
    return "";
  }
  return `${value}%`;
}

export function formatNumber(value: number | undefined) {
  if (value === undefined) {
    return "";
  }
  return new Intl.NumberFormat(undefined, {
    style: "decimal",
  }).format(value);
}

export function parseCurrency(value: string | undefined) {
  if (value === undefined) {
    return 0;
  }
  value = value.replace(/[^0-9.]/g, "");
  if (value === "") {
    return 0;
  }
  return parseFloat(value) ?? 0;
}
