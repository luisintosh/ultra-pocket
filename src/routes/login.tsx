import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import FullBackground from "@/components/shared/full-background";
import {
  getAccountStored,
  setAccountStorage,
} from "@/components/shared/hooks/useGetAccount";
import { isUwaxInstalled, uwaxApi } from "@/components/shared/uwax/utils";
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
import { BLOCKCHAIN_PROMOTER_LINK } from "@/constants/constants";
import { Route } from "@/routes";

function Login() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const [id, setId] = useState("");

  useEffect(() => {
    setId(getAccountStored() || "");
  }, []);

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
    if (!isUwaxInstalled) {
      alert("Ultra Wallet Extension is not installed");
      return;
    }
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
      <div>
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
                disabled={!isUwaxInstalled}
                onClick={() => connectWallet()}
              >
                Connect Ultra Wallet
              </Button>
              <Button type="submit">Enter</Button>
            </CardFooter>
          </form>
        </Card>
        <div className="mt-4 text-muted-foreground">
          Don't Have an Account?{" "}
          <Button variant="link" asChild>
            <a href={BLOCKCHAIN_PROMOTER_LINK} target="_blank">
              Sign up here
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
