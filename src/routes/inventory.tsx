import AlgoliaSearchBox from "@/components/shared/algolia/uniqs/algolia-search-box";
import useGetAccount from "@/components/shared/hooks/useGetAccount";
import Typography from "@/components/ui/typography";

function Inventory() {
  const { account } = useGetAccount();

  return (
    <>
      <Typography variant="h3" className="mb-5">
        Your Inventory
      </Typography>
      <AlgoliaSearchBox results="INVENTORY" inventoryAccount={account!} />
    </>
  );
}

export default Inventory;
