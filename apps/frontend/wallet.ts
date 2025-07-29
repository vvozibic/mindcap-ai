import { configureChains, createClient } from "@wagmi/core";
import { mainnet, polygon } from "@wagmi/core/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";

const projectId = (await fetch("/config").then((r) => r.json()))
  .walletConnectProjectId;

const chains = [mainnet, polygon];
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);
export const web3modal = new Web3Modal({ projectId }, ethereumClient);
