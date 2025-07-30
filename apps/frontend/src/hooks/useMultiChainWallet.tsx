import { EthereumProvider } from "@walletconnect/ethereum-provider";
import UniversalProvider from "@walletconnect/universal-provider";
import { useCallback, useEffect, useRef, useState } from "react";
import { User } from "../types";

/* prettier-ignore */
export const EVM_CHAINS_FULL = [
  { id: 1, name: "Ethereum", symbol: "ETH", rpcUrl: "https://rpc.ankr.com/eth", explorer: "https://etherscan.io" },
  { id: 56, name: "BNB Chain", symbol: "BNB", rpcUrl: "https://rpc.ankr.com/bsc", explorer: "https://bscscan.com" },
  { id: 137, name: "Polygon", symbol: "MATIC", rpcUrl: "https://rpc.ankr.com/polygon", explorer: "https://polygonscan.com" },
  { id: 42161, name: "Arbitrum", symbol: "ARB", rpcUrl: "https://arb1.arbitrum.io/rpc", explorer: "https://arbiscan.io" },
  { id: 10, name: "Optimism", symbol: "OP", rpcUrl: "https://mainnet.optimism.io", explorer: "https://optimistic.etherscan.io" },
  { id: 43114, name: "Avalanche", symbol: "AVAX", rpcUrl: "https://api.avax.network/ext/bc/C/rpc", explorer: "https://snowtrace.io" },
  { id: 250, name: "Fantom", symbol: "FTM", rpcUrl: "https://rpc.ankr.com/fantom", explorer: "https://ftmscan.com" },
  { id: 100, name: "Gnosis", symbol: "xDAI", rpcUrl: "https://rpc.gnosischain.com", explorer: "https://gnosisscan.io" },
  { id: 25, name: "Cronos", symbol: "CRO", rpcUrl: "https://evm.cronos.org", explorer: "https://cronoscan.com" },
  { id: 324, name: "zkSync Era", symbol: "ETH", rpcUrl: "https://mainnet.era.zksync.io", explorer: "https://explorer.zksync.io" },
  { id: 8453, name: "Base", symbol: "ETH", rpcUrl: "https://mainnet.base.org", explorer: "https://basescan.org" },
  { id: 5000, name: "Mantle", symbol: "MNT", rpcUrl: "https://rpc.mantle.xyz", explorer: "https://mantlescan.xyz" },
  { id: 534352, name: "Scroll", symbol: "ETH", rpcUrl: "https://rpc.scroll.io", explorer: "https://scrollscan.com" },
  { id: 1284, name: "Moonbeam", symbol: "GLMR", rpcUrl: "https://rpc.api.moonbeam.network", explorer: "https://moonscan.io" },
  { id: 1285, name: "Moonriver", symbol: "MOVR", rpcUrl: "https://rpc.api.moonriver.moonbeam.network", explorer: "https://moonriver.moonscan.io" },
  { id: 2222, name: "Kava EVM", symbol: "KAVA", rpcUrl: "https://evm.kava.io", explorer: "https://kavascan.com" },
  { id: 42220, name: "Celo", symbol: "CELO", rpcUrl: "https://forno.celo.org", explorer: "https://celoscan.io" },
  { id: 9001, name: "Evmos", symbol: "EVMOS", rpcUrl: "https://evmos-evm.publicnode.com", explorer: "https://evmosscan.io" },
  { id: 204, name: "opBNB", symbol: "BNB", rpcUrl: "https://opbnb-mainnet-rpc.bnbchain.org", explorer: "https://opbnbscan.com" },
  { id: 40, name: "Telos", symbol: "TLOS", rpcUrl: "https://mainnet.telos.net/evm", explorer: "https://teloscan.io" },
  { id: 66, name: "OKT Chain", symbol: "OKT", rpcUrl: "https://exchainrpc.okex.org", explorer: "https://www.oklink.com/en/okc" }
];

const chainIds = EVM_CHAINS_FULL.map((c) => c.id);

export function useMultiChainWallet(user?: User) {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [network, setNetwork] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.primaryWallet?.address) {
      setAddresses([user.primaryWallet.address]);
    }
  }, [user]);

  // @ts-ignore
  const evmProviderRef = useRef<EthereumProvider | null>(null);
  const solanaProviderRef = useRef<any>(null);

  const connect = useCallback(async () => {
    setLoading(true);
    const { walletConnectProjectId } = await fetch("/config").then((r) =>
      r.json()
    );
    setLoading(false);

    try {
      // @ts-ignore
      const evm = await EthereumProvider.init({
        projectId: walletConnectProjectId,
        chains: chainIds,
        showQrModal: true,
      });

      await evm.enable();

      evmProviderRef.current = evm;

      const addr = evm.accounts?.[0];
      setAddresses(evm.accounts || []);
      setNetwork(`eip155:${evm.chainId}`);

      if (addr) {
        const chainInfo = EVM_CHAINS_FULL.find((c) => c.id === evm.chainId);
        setLoading(true);

        await fetch("/api/wallets/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user?.username,
            address: addr,
            chain: `eip155:${evm.chainId}`,
            label: chainInfo?.name,
            symbol: chainInfo?.symbol,
            explorer: chainInfo?.explorer,
          }),
        });
        setLoading(false);
      }

      return;
    } catch (err) {
      console.warn("⚠️ EVM connect failed", err);
      setLoading(false);
    }

    // Solana fallback
    try {
      const solana = await UniversalProvider.init({
        projectId: walletConnectProjectId,
        metadata: {
          name: "Mindoshare",
          description: "Wallet Integration",
          url: "https://mindoshare.ai",
          icons: ["https://mindoshare.ai/android-chrome-512x512.png"],
        },
      });

      await solana.connect({
        namespaces: {
          solana: {
            methods: ["solana_signTransaction", "solana_signMessage"],
            chains: ["solana:mainnet"],
            events: [],
          },
        },
      });

      solanaProviderRef.current = solana;
      const addr = solana.accounts?.[0];

      setAddresses(solana.accounts || []);
      setNetwork("solana:mainnet");

      if (addr) {
        setLoading(true);
        await fetch("/api/wallets/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user?.username,
            address: addr,
            chain: "solana:mainnet",
          }),
        });
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Solana connect failed", err);
      setLoading(false);
    }
  }, [user?.username]);

  const disconnect = useCallback(async () => {
    const addr = addresses[0];
    if (evmProviderRef.current) await evmProviderRef.current.disconnect();
    if (solanaProviderRef.current) await solanaProviderRef.current.disconnect();

    // ✅ Чистим localStorage WalletConnect
    Object.keys(localStorage)
      .filter((key) => key.startsWith("@appkit/"))
      .forEach((key) => localStorage.removeItem(key));

    setAddresses([]);
    setNetwork(null);

    if (addr) {
      setLoading(true);
      await fetch("/api/wallets/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.username, address: addr }),
      });
      setLoading(false);
    }
  }, [addresses, user?.username]);

  return { addresses, network, connect, loading, disconnect };
}
