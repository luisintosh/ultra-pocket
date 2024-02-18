import { useState } from "react";

import { BLOCKCHAIN_PROMOTER_ACCOUNT } from "@/constants/constants";

import { isUwaxInstalled, uwaxApi } from "../../uwax/utils";

interface SmartContractParams {
  contract: string;
  action: string;
  data: unknown;
}

interface TransferTokenArgs {
  from: string;
  to: string;
  quantity: string;
  memo: string;
}

interface TransferArgs {
  from: string;
  to: string;
  memo: string;
  token_ids: number[];
}

interface BuyArgs {
  buyer: string;
  receiver: string;
  memo: string;
  token_id: number;
  max_price: string;
}

interface ResellArgs {
  seller: string;
  price: string;
  token_id: number;
}

class BlockchainTransactionBuilder {
  private tx: SmartContractParams = {
    contract: "eosio.nft.ft",
    action: "",
    data: {},
  };

  transferToken(data: TransferTokenArgs) {
    this.tx.contract = "eosio.token";
    this.tx.action = "transfer";
    this.tx.data = data;
    return this;
  }

  transfer(data: TransferArgs) {
    this.tx.action = "transfer";
    this.tx.data = {
      [this.tx.action]: data,
    };
    return this;
  }

  buy(data: BuyArgs) {
    this.tx.action = "buy";
    this.tx.data = {
      [this.tx.action]: {
        ...data,
        promoter_id: BLOCKCHAIN_PROMOTER_ACCOUNT,
      },
    };
    return this;
  }

  resell(data: ResellArgs) {
    this.tx.action = "resell";
    this.tx.data = {
      [this.tx.action]: {
        ...data,
        promoter_basis_point: 250,
        memo: "",
      },
    };
    return this;
  }

  cancelResell(token_id: string) {
    this.tx.action = "cancelresell";
    this.tx.data = {
      [this.tx.action]: {
        token_id,
        memo: "",
      },
    };
    return this;
  }

  build(): SmartContractParams {
    return this.tx;
  }
}

function useBlockchainTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const signTx = async (tx: SmartContractParams) => {
    setError("");
    setTransactionHash("");
    if (!isUwaxInstalled) {
      setError("Ultra Wallet Extension is not installed");
      return;
    }

    setIsLoading(true);
    try {
      const resp = await uwaxApi.signTransaction(tx);
      setTransactionHash(resp.data.transactionHash);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.status) {
        console.error(`Error details`, err.data);
        setError(err.message);
      } else {
        setError(err.toString());
      }
    } finally {
      setIsLoading(false);
    }
  };
  // https://developers.ultra.io/blockchain/contracts/token-contract/token-actions/transfer.html
  const transferToken = (data: TransferTokenArgs) => {
    const tx = new BlockchainTransactionBuilder().transferToken(data).build();
    signTx(tx);
  };
  // https://developers.ultra.io/blockchain/contracts/nft-contract/nft-actions/transfer.html
  const transfer = (data: TransferArgs) => {
    const tx = new BlockchainTransactionBuilder().transfer(data).build();
    signTx(tx);
  };
  // https://developers.ultra.io/blockchain/contracts/nft-contract/nft-actions/buy.html
  const buy = (data: BuyArgs) => {
    const tx = new BlockchainTransactionBuilder().buy(data).build();
    signTx(tx);
  };
  // https://developers.ultra.io/blockchain/contracts/nft-contract/nft-actions/resell.html
  const resell = (data: ResellArgs) => {
    const tx = new BlockchainTransactionBuilder().resell(data).build();
    signTx(tx);
  };
  // https://developers.ultra.io/blockchain/contracts/nft-contract/nft-actions/cancelresell.html
  const cancelResell = (tokenId: string) => {
    const tx = new BlockchainTransactionBuilder().cancelResell(tokenId).build();
    signTx(tx);
  };

  return {
    transferToken,
    transfer,
    buy,
    resell,
    cancelResell,
    isLoading,
    error,
    transactionHash,
  };
}

export default useBlockchainTransaction;
