const ACCOUNT_KEY = "account";

function useGetAccount() {
  const account = window.localStorage.getItem(ACCOUNT_KEY);
  const setAccount = (value: string) =>
    window.localStorage.setItem(ACCOUNT_KEY, value);
  return { account, setAccount };
}

export default useGetAccount;
