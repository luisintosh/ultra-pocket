import AlgoliaSearchBox from "@/components/shared/algolia/uniqs/algolia-search-box";
import { getAccountStored } from "@/components/shared/utils/account";
import Typography from "@/components/ui/typography";

function Inventory() {
  const account = getAccountStored();

  return (
    <>
      <Typography variant="h3" className="mb-5">
        Your Inventory
      </Typography>
      <AlgoliaSearchBox results="INVENTORY" inventoryAccount={account} />
    </>
  );
}

export default Inventory;
