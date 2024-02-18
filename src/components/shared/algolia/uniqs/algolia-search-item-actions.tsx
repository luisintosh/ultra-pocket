import { useEffect } from "react";

import { Button } from "@/components/ui/button";

import useBlockchainTransaction from "../../blockchain/hooks/useBlockchainTransaction";
import useGetAccount from "../../hooks/useGetAccount";
import { formatTokenAmount, isUwaxInstalled } from "../../uwax/utils";
import { AlgoliaSearchItemProps } from "./algolia-search-item";

function SearchItemActions({ hit }: AlgoliaSearchItemProps) {
  const {
    transfer,
    buy,
    resell,
    cancelResell,
    isLoading,
    error,
    transactionHash,
  } = useBlockchainTransaction();
  const { account } = useGetAccount();
  const owned = account === hit.owner_on_chain_id;
  const onSale = hit.status === "ON_SALE";

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        alert(`Error: ${error}`);
      }
      if (transactionHash) {
        alert(`Success! Transaction hash: ${transactionHash}`);
      }
    }
  }, [isLoading, error, transactionHash]);

  const onTransfer = () => {
    const to = prompt("Account to transfer");
    if (to) {
      transfer({ from: account, to, token_ids: [hit.on_chain_id], memo: "" });
    }
  };

  const onBuy = () => {
    buy({
      buyer: account,
      receiver: account,
      max_price: formatTokenAmount(
        String(hit.selling_price_UOS),
        "UOS",
        8,
        false,
      ),
      token_id: hit.on_chain_id,
      memo: "",
    });
  };

  const onResell = () => {
    const price = prompt("Resell price");
    if (price) {
      resell({
        price: formatTokenAmount(price, "UOS", 8, false),
        seller: account,
        token_id: hit.on_chain_id,
      });
    }
  };

  const onCancelResell = () => {
    cancelResell(hit.on_chain_id);
  };

  return (
    <>
      {!owned && onSale && (
        <Button
          disabled={isLoading || !isUwaxInstalled}
          onClick={() => onBuy()}
        >
          Buy
        </Button>
      )}
      {owned && !onSale && (
        <Button
          disabled={isLoading || !isUwaxInstalled}
          onClick={() => onResell()}
        >
          Resell
        </Button>
      )}
      {owned && onSale && (
        <Button
          variant="destructive"
          disabled={isLoading || !isUwaxInstalled}
          onClick={() => onCancelResell()}
        >
          Cancel Resell
        </Button>
      )}
      {owned && !onSale && (
        <Button
          variant="secondary"
          disabled={isLoading || !isUwaxInstalled}
          onClick={() => onTransfer()}
        >
          Transfer
        </Button>
      )}
    </>
  );
}

export default SearchItemActions;
