import { User } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const { data, isLoading } = useGetBalance(props.account);
  const shareAccount = () => {
    const account = props.account.toUpperCase();
    const message = {
      text: shareMessage.replace("ACCOUNT", account),
    };
    window.navigator.share(message);
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
          {isLoading ? (
            "..."
          ) : (
            <Typography className="text-3xl">{data}</Typography>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Transfer</Button>
        <Button variant="outline" onClick={() => shareAccount()}>
          Share
        </Button>
        <Button variant="destructive">Disconnect</Button>
      </CardFooter>
    </Card>
  );
}

export default Balance;
