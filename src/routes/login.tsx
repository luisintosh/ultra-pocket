import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import FullBackground from "@/components/shared/full-background";
import { setAccountStorage } from "@/components/shared/hooks/useGetAccount";
import { uwaxApi } from "@/components/shared/uwax/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Route } from "@/routes";

function Login() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [id, setId] = useState("");

  useEffect(() => {
    if (id) {
      setAccountStorage(id);
      navigate(Route.ROOT);
    }
  }, [id, navigate]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setId(ref.current?.value || "");
  };

  const connectWallet = () => {
    uwaxApi
      .connect()
      .then((response) => {
        setId(response.data.blockchainid);
      })
      .then(() => navigate(Route.ROOT))
      .catch((reason) => alert(`Error: ${reason}`));
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <FullBackground />
      <Card>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Welcome to the Ultra-verse</CardTitle>
            <CardDescription>
              Log in with Your Blockchain Account or Connect Your Ultra Wallet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input ref={ref} placeholder="Blockchain account" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => connectWallet()}
            >
              Connect Ultra Wallet
            </Button>
            <Button type="submit">Enter</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
