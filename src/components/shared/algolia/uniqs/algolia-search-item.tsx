import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import SearchItemActions from "./algolia-search-item-actions";

export interface AlgoliaSearchItemProps {
  hit: {
    image: string;
    name: string;
    subName: string;
    status: string;
    selling_price_UOS: number;
    on_chain_id: string;
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
        <div className="flex flex-col gap-1 w-[160px] md:w-[200px] pb-2 text-center border rounded-md">
          <div className="relative w-full -z-10">
            <img
              src={hit.image}
              alt={hit.name}
              className="w-full aspect-square object-cover rounded-t"
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
          <DrawerDescription>
            <strong>{hit.subName}</strong>
          </DrawerDescription>
          <DrawerDescription>by {hit.creator_blockchain_id}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground p-4">
          <ul className="grid grid-cols-3 gap-3 [&>li>*]:block [&>li>span]:text-muted-foreground text-foreground">
            <li>
              <span>Token ID</span> <strong>{hit.on_chain_id}</strong>
            </li>
            <li>
              <span>Factory ID</span> <strong>{hit.factory_id}</strong>
            </li>
            <li>
              <span>Owner</span> <strong>{hit.owner_on_chain_id}</strong>
            </li>
            <li>
              <span>Selling Price</span>
              <strong>{hit.selling_price_UOS} UOS</strong>
            </li>
            <li>
              <span>Min Price</span>
              <strong>
                {hit.minimum_price.amount} {hit.minimum_price.currency}
              </strong>
            </li>
          </ul>
          <span className="text-pretty line-clamp-6">{hit.description}</span>
        </div>
        <DrawerFooter>
          <SearchItemActions hit={hit} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AlgoliaSearchItem;
