import Balance from "@/components/home/balance";
import TxHistory from "@/components/home/tx-hisotry";
import UOSTicketWidget from "@/components/home/uos-ticker-widget";
import useGetAccount from "@/components/shared/hooks/useGetAccount";
import Typography from "@/components/ui/typography";

function Home() {
  const { account } = useGetAccount();

  return (
    <div className="flex flex-col gap-5">
      <Balance account={account} />
      <UOSTicketWidget />
      <Typography variant="h3">History</Typography>
      <TxHistory account={account} />
    </div>
  );
}

export default Home;
