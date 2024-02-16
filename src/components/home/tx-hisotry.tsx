import { BLOCKCHAIN_EXPLORER } from "@/constants/constants";

import Icon, { IconProps } from "../shared/lucide-dynamic-icon";
import { Button } from "../ui/button";
import useGetAccountHistory, {
  WalletTransactionHistory,
} from "./hooks/useGetAccountHistory";
import { TransactionRowDetailsBuilder } from "./utils/transaction-row-details-builder";

type TxRowProps = {
  title: string;
  description: string;
  icon: IconProps["name"];
};

function TxRow(props: TxRowProps) {
  return (
    <div className="flex border-b pb-2">
      <div className="flex items-center px-3">
        <Icon name={props.icon} />
      </div>
      <div className="flex-1">
        <div className="title">{props.title}</div>
        <div className="description text-muted-foreground text-sm">
          {props.description}
        </div>
      </div>
    </div>
  );
}

function TxHistory(props: { account: string }) {
  const { data } = useGetAccountHistory(props.account);
  const transactions: WalletTransactionHistory["transactions"] =
    data?.transactions;
  const explorerUrl = `${BLOCKCHAIN_EXPLORER}/account/${props.account}`;

  return (
    <div className="flex flex-col gap-3">
      {transactions?.map((txObj) => {
        const tx = txObj.lifecycle.execution_trace.action_traces[0].act;
        const txTitle = `${tx.account}@${tx.name}`;
        const txDetails = new TransactionRowDetailsBuilder()
          .setContract(tx.account)
          .setAction(tx.name)
          .setData(tx.data)
          .build();

        return (
          <TxRow
            key={txObj.lifecycle.id}
            icon={txDetails.icon as IconProps["name"]}
            title={txTitle}
            description={txDetails.details}
          />
        );
      })}
      <div className="text-center mt-5">
        <Button variant="outline" asChild>
          <a href={explorerUrl} target="_blank">
            Open explorer
          </a>
        </Button>
      </div>
    </div>
  );
}

export default TxHistory;
