import { User } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Route } from "@/routes";

import useBlockchainTransaction from "../shared/blockchain/hooks/useBlockchainTransaction";
import { removeAccountStored } from "../shared/hooks/useGetAccount";
import { formatTokenAmount } from "../shared/uwax/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Typography from "../ui/typography";
import useGetBalance from "./hooks/useGetBalance";

type Props = { account: string };

function AccountTag(props: Props) {
  return (
    <div className="flex items-center gap-x-3 bg-background text-sm border rounded-md h-11 px-3">
      <span className="uppercase tracking-wider">{props.account}</span>
      <Separator orientation="vertical" />
      <span className="rounded-md">
        <User size={16} />
      </span>
    </div>
  );
}

const shareMessage =
  'Excited to share my Ultra blockchain account with you "ACCOUNT"!! Discover the power of decentralized digital assets with Ultra Pocket app. https://ultra-pocket.luis.best';

function Balance(props: Props) {
  const navigate = useNavigate();
  const { transferToken, isLoading, error, transactionHash } =
    useBlockchainTransaction();
  const { data, isLoading: isBalanceLoading } = useGetBalance(props.account);
  const shareAccount = () => {
    const account = props.account.toUpperCase();
    const message = {
      text: shareMessage.replace("ACCOUNT", account),
    };
    window.navigator.share(message);
  };

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

  const onTransferToken = () => {
    const to = prompt("Account to transfer");
    const amount = prompt("Amount of UOS");
    const memo = prompt("Write a memo (Optional)");
    if (to && amount) {
      transferToken({
        from: props.account,
        to,
        quantity: formatTokenAmount(amount, "UOS", 8, false),
        memo: String(memo),
      });
    }
  };

  const onDisconnect = () => {
    if (confirm("Are you sure?")) {
      removeAccountStored();
      navigate(Route.LOGIN);
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Balance</CardTitle>
        <AccountTag account={props.account} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-end">
          <div className="text-sm text-muted-foreground">Total balance</div>
          {isBalanceLoading ? (
            "..."
          ) : (
            <Typography className="text-3xl">{data}</Typography>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onTransferToken()}>
          Transfer
        </Button>
        <Button variant="outline" onClick={() => shareAccount()}>
          Share
        </Button>
        <Button variant="destructive" onClick={() => onDisconnect()}>
          Disconnect
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Balance;
