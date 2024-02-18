const ACCOUNT_KEY = "account";

export function getAccountStored() {
  return window.localStorage.getItem(ACCOUNT_KEY) || "";
}

export function setAccountStorage(value: string) {
  window.localStorage.setItem(ACCOUNT_KEY, value.toLowerCase());
}

export function removeAccountStored() {
  window.localStorage.setItem(ACCOUNT_KEY, "");
}
