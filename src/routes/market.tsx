import AlgoliaSearchBox from "@/components/shared/algolia/uniqs/algolia-search-box";
import Typography from "@/components/ui/typography";

function Market() {
  return (
    <>
      <Typography variant="h3" className="mb-5">
        Marketplace
      </Typography>
      <AlgoliaSearchBox results="MARKET" />
    </>
  );
}

export default Market;
