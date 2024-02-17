import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface AlgoliaSearchItemProps {
  hit: {
    image: string;
    name: string;
    subName: string;
    status: string;
    selling_price_UOS: number;
    on_chain_id: number;
    factory_id: number;
    minimum_price: { amount: number; currency: string };
    owner_on_chain_id: string;
    creator_blockchain_id: string;
    description: string;
  };
}

function AlgoliaSearchItem({ hit }: AlgoliaSearchItemProps) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex flex-col gap-1 w-[160px] md:w-[200px] text-center">
          <div className="relative w-full -z-10">
            <img
              src={hit.image}
              alt={hit.name}
              className="w-full aspect-square object-cover border rounded-md"
            />
            {hit.status === "ON_SALE" && (
              <Badge
                variant="secondary"
                className="line-clamp-1 absolute top-0 left-0 m-3"
              >
                {hit.selling_price_UOS} UOS
              </Badge>
            )}
          </div>
          <div className="line-clamp-1 text-sm">{hit.name}</div>
          <div className="line-clamp-1 text-xs text-muted-foreground">
            {hit.subName}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-w-xl mx-auto">
        <DrawerHeader>
          <DrawerTitle>{hit.name}</DrawerTitle>
          <DrawerDescription>{hit.subName}</DrawerDescription>
        </DrawerHeader>
        <DrawerDescription>
          <div className="flex flex-col gap-4 p-4">
            <ul className="max-w-md space-y-1 list-disc list-inside">
              <li>ID: {hit.on_chain_id}</li>
              <li>Factory ID: {hit.factory_id}</li>
              <li>Selling Price: {hit.selling_price_UOS} UOS</li>
              <li>
                Min Price: {hit.minimum_price.amount}{" "}
                {hit.minimum_price.currency}
              </li>
              <li>Owner: {hit.owner_on_chain_id}</li>
              <li>Creator: {hit.creator_blockchain_id}</li>
            </ul>
            <p className="text-pretty">{hit.description}</p>
          </div>
        </DrawerDescription>
        <DrawerFooter>
          <Button>Buy</Button>
          <Button>Resell</Button>
          <Button variant="destructive">Cancel Resell</Button>
          <Button variant="outline">Transfer</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AlgoliaSearchItem;
