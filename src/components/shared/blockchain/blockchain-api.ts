import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig"; // development only

import { BLOCKCHAIN_API } from "@/constants/constants";

const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"; // bob

const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc(BLOCKCHAIN_API); //required to read blockchain state
const blockchainApi = new Api({ rpc, signatureProvider }); //required to submit transactions

export default blockchainApi;
