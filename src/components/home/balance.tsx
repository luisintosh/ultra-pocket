import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";

function Balance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>123.987 UOS</CardTitle>
        <CardDescription>Total balance</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Copy address</Button>
        <Button variant="outline">Transfer</Button>
        <Button variant="outline">Open explorer</Button>
      </CardFooter>
    </Card>
  );
}

export default Balance;
