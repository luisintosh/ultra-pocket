import { useQuery } from "@tanstack/react-query";

import blockchainApi from "@/components/shared/blockchain/blockchain-api";

function useGetInventory(account: string) {
  return useQuery({
    queryKey: ["GetInventory"],
    queryFn: () =>
      blockchainApi.rpc
        .get_table_rows({
          code: "eosio.nft.ft",
          json: true,
          limit: 1000,
          scope: account,
          table: "token.b",
        })
        .then((r) => r.rows),
  });
}

export default useGetInventory;
