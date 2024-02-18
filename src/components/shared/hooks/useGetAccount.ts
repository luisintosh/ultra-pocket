const ACCOUNT_KEY = "account";

export function getAccountStored() {
  return window.localStorage.getItem(ACCOUNT_KEY);
}

export function setAccountStorage(value: string) {
  window.localStorage.setItem(ACCOUNT_KEY, value);
}

export function removeAccountStored() {
  window.localStorage.setItem(ACCOUNT_KEY, "");
}

function useGetAccount() {
  const account = getAccountStored();
  const setAccount = (value: string) =>
    window.localStorage.setItem(ACCOUNT_KEY, value);
  return { account: String(account), setAccount };
}

export default useGetAccount;
