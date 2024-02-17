import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  useInstantSearch,
} from "react-instantsearch";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ALGOLIA_INDEX_NAME } from "@/constants/constants";

import { searchClient } from "../client";
import AlgoliaSearchItem from "./algolia-search-item";

function LoadingResults() {
  const { status } = useInstantSearch();
  if (status === "loading" || status === "stalled") {
    return (
      <div className="flex flex-1 justify-center items-center">Loading...</div>
    );
  }
}

const input =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

enum SearchType {
  COLLECTIBLE = "COLLECTIBLE",
  GAME = "GAME",
}

type AlgoliaSearchBoxProps = {
  results: "INVENTORY" | "MARKET";
  inventoryAccount?: string;
};

function AlgoliaSearchBox(props: AlgoliaSearchBoxProps) {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [typeValue, setTypeValue] = useState<SearchType>(
    SearchType.COLLECTIBLE,
  );

  useEffect(() => {
    const typeFilter = `AND type:${typeValue}`;
    let filterByOwner = "";
    if (props.inventoryAccount) {
      filterByOwner = `AND owner_on_chain_id:${props.inventoryAccount}`;
    }
    let filterByOnSale = "";
    if (props.results === "MARKET") {
      filterByOnSale = "AND status:ON_SALE";
    }
    setSearchFilter(
      `meta_available:true ${typeFilter} ${filterByOwner} ${filterByOnSale}`,
    );
  }, [typeValue, props]);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={ALGOLIA_INDEX_NAME}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure filters={searchFilter} />
      <SearchBox
        placeholder="Search..."
        searchAsYouType={false}
        submitIconComponent={({ classNames }) => (
          <Search className={classNames.submitIcon} />
        )}
        classNames={{
          form: "flex gap-3",
          submit: "hidden",
          input,
        }}
      />
      <Tabs className="my-5 flex justify-center" defaultValue={typeValue}>
        <TabsList>
          <TabsTrigger
            value={SearchType.COLLECTIBLE}
            onClick={() => setTypeValue(SearchType.COLLECTIBLE)}
          >
            Collectibles
          </TabsTrigger>
          <TabsTrigger
            value={SearchType.GAME}
            onClick={() => setTypeValue(SearchType.GAME)}
          >
            Games
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <LoadingResults />
      <Hits
        hitComponent={AlgoliaSearchItem}
        classNames={{ list: "flex flex-wrap justify-between gap-5" }}
      />
      <div className="pt-10">
        <Pagination
          totalPages={2}
          classNames={{
            list: "flex justify-center gap-3 mt-4",
            link: "p-3 bg-secondary",
          }}
        />
      </div>
    </InstantSearch>
  );
}

export default AlgoliaSearchBox;
