import Balance from "@/components/home/balance";
import TxHistory from "@/components/home/tx-hisotry";
import UOSTicketWidget from "@/components/home/uos-ticker-widget";
import Typography from "@/components/ui/typography";

function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Balance account="aa1bb2cc3" />
      <UOSTicketWidget />
      <Typography variant="h3">History</Typography>
      <TxHistory />
    </div>
  );
}

export default Home;
