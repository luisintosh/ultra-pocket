export const isUwaxInstalled = "ultra" in window;
export const uwaxApi = window.ultra;

export function formatTokenAmount(
  value: string,
  tokenSymbol: string,
  fractionDigits: number,
  useGrouping: boolean = true,
) {
  const numFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    useGrouping,
  });
  const amount = numFormat.format(parseFloat(value));
  return `${amount} ${tokenSymbol}`;
}
