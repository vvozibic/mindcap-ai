import { EthereumProvider } from "@walletconnect/ethereum-provider";
import UniversalProvider from "@walletconnect/universal-provider";
import { useCallback, useState } from "react";

type ChainType = "ethereum" | "bnb" | "arbitrum" | "solana";

const EVM_CHAINS = {
  ethereum: 1,
  bnb: 56,
  arbitrum: 42161,
};

export function useMultiChainWallet() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [network, setNetwork] = useState<ChainType | null>(null);

  let evmProvider: EthereumProvider | null = null;
  let solanaProvider: any = null;

  // 🔹 Универсальный connect
  const connect = useCallback(async (chain: ChainType) => {
    const { walletConnectProjectId } = await fetch("/config").then((r) =>
      r.json()
    );

    if (chain === "solana") {
      solanaProvider = await UniversalProvider.init({
        projectId: walletConnectProjectId,
        metadata: {
          name: "Mindoshare",
          description: "Wallet Integration",
          url: "https://mindoshare.ai",
          icons: ["https://mindoshare.ai/android-chrome-512x512.png"],
        },
      });

      await solanaProvider.connect({
        namespaces: {
          solana: {
            methods: ["solana_signTransaction", "solana_signMessage"],
            chains: ["solana:mainnet"],
            events: [],
          },
        },
      });

      setAddresses(solanaProvider.accounts || []);
      setNetwork("solana");
    } else {
      evmProvider = await EthereumProvider.init({
        projectId: walletConnectProjectId,
        chains: [1, 56, 42161],
        showQrModal: true,
      });

      await evmProvider.enable();
      setAddresses(evmProvider.accounts || []);
      setNetwork(chain);
    }
  }, []);

  // 🔹 Disconnect
  const disconnect = useCallback(async () => {
    if (evmProvider) await evmProvider.disconnect();
    if (solanaProvider) await solanaProvider.disconnect();
    setAddresses([]);
    setNetwork(null);
  }, []);

  return { addresses, network, connect, disconnect };
}
