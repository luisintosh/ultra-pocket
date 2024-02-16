export class TransactionRowDetailsBuilder {
  private action: string | undefined;
  private contract: string | undefined;
  private data: unknown;

  private buildNftBuy() {
    const data = this.data as { buy: { token_id: string } };
    return { details: `Token ${data.buy.token_id}`, icon: "shopping-basket" };
  }

  private buildNftCancelResell() {
    const data = this.data as { cancelresell: { token_id: string } };
    return {
      details: `Token ${data.cancelresell.token_id}`,
      icon: "ticket-x",
    };
  }

  private buildNftResell() {
    const data = this.data as { resell: { token_id: string } };
    return { details: `Token ${data.resell.token_id}`, icon: "ticket" };
  }

  private buildNftTransfer() {
    const data = this.data as { transfer: { token_ids: string[] } };
    return {
      details: `Tokens ${data.transfer.token_ids.join(", ")}`,
      icon: "send-to-back",
    };
  }

  private buildTokenTransfer() {
    const data = this.data as { quantity: string; to: string };
    const quantity = data.quantity.split(" ");
    const quantityValue = parseFloat(quantity[0]).toFixed(2);
    return {
      details: `${quantityValue} ${quantity[1]} → ${data.to}`,
      icon: "coins",
    };
  }

  build() {
    let data = {
      details: "Contract interaction",
      icon: "info",
    };
    if (this.contract === "eosio.token" && this.action === "transfer") {
      data = this.buildTokenTransfer();
    } else if (this.contract === "eosio.nft.ft") {
      if (this.action === "transfer") {
        data = this.buildNftTransfer();
      } else if (this.action === "resell") {
        data = this.buildNftResell();
      } else if (this.action === "cancelresell") {
        data = this.buildNftCancelResell();
      } else if (this.action === "buy") {
        data = this.buildNftBuy();
      }
    }
    return data;
  }

  setAction(action: string): TransactionRowDetailsBuilder {
    this.action = action;
    return this;
  }

  setContract(contract: string): TransactionRowDetailsBuilder {
    this.contract = contract;
    return this;
  }

  setData(data: unknown): TransactionRowDetailsBuilder {
    this.data = data;
    return this;
  }
}
