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

function Balance(props: Props) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>Balance</CardTitle>
        <AccountTag account={props.account} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-end">
          <div className="text-sm text-muted-foreground">Total balance</div>
          <div className="text-4xl font-semibold">
            123.987 <span className="text-primary">UOS</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Copy address</Button>
        <Button variant="outline">Transfer</Button>
        <Button variant="outline">Disconnect</Button>
      </CardFooter>
    </Card>
  );
}

export default Balance;
