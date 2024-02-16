import { Button } from "../ui/button";

type TxRowProps = { title: string; description: string };

function TxRow(props: TxRowProps) {
  return (
    <div className="border-b pb-2">
      <div className="title">{props.title}</div>
      <div className="description text-muted-foreground text-sm">
        {props.description}
      </div>
    </div>
  );
}

function TxHistory() {
  return (
    <div className="flex flex-col gap-3">
      <TxRow title="token@transfer" description="From X to Y, $45.9" />
      <TxRow title="token@transfer" description="From X to Y, $45.9" />
      <TxRow title="token@transfer" description="From X to Y, $45.9" />
      <div className="text-center mt-5">
        <Button asChild>
          <a href="#" target="_blank">
            Open explorer
          </a>
        </Button>
      </div>
    </div>
  );
}

export default TxHistory;
