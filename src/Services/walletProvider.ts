import { SafeEventEmitterProvider } from "@web3auth/base";
import polygonProvider from "./polygonProvider";
// import ethProvider from "./ethProvider";
// import solanaProvider from "./solanaProvider";
// import tezosProvider  from "./tezosProvider";

export interface IWalletProvider {
  getAccounts: () => Promise<any>;
  getBalance: () => Promise<any>;
  signAndSendTransaction: () => Promise<void>;
  signTransaction: () => Promise<void>;
  signMessage: () => Promise<void>;
}

export const getWalletProvider = (chain: string, provider: SafeEventEmitterProvider, uiConsole: any): IWalletProvider => {
  ////
  // TODO: support hese at some point, install relevant packages https://github.com/Web3Auth/Web3Auth/blob/master/demo/react-app/package.json
  ////
  // if (chain === "solana") {
  //   return solanaProvider(provider, uiConsole);
  // } else if (chain === "tezos") {
  //   return tezosProvider(provider, uiConsole);
  // }
  return polygonProvider(provider, uiConsole);
};