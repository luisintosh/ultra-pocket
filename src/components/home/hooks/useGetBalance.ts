import { useQuery } from "@tanstack/react-query";

import blockchainApi from "@/components/shared/blockchain/blockchain-api";
import { BLOCKCHAIN_TOKEN_CODE } from "@/constants/constants";

function useGetBalance(account: string) {
  return useQuery({
    queryKey: ["GetBalance"],
    queryFn: () =>
      blockchainApi.rpc
        .get_currency_balance("eosio.token", account, BLOCKCHAIN_TOKEN_CODE)
        .then((r) => r[0]),
    refetchInterval: 10_000,
  });
}

export default useGetBalance;
