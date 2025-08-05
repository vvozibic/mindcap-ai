import { EthereumProvider } from "@walletconnect/ethereum-provider";
import UniversalProvider from "@walletconnect/universal-provider";
import { useCallback, useRef, useState } from "react";
import { useGlobalStore } from "../store/useGlobalStore";
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

// ✅ Определяем браузер
const isFirefox =
  typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent);
const isChrome =
  typeof navigator !== "undefined" && /chrome/i.test(navigator.userAgent);

export function useMultiChainWallet(
  user?: User,
  afterConnectCallback?: () => void
) {
  const [addresses, setAddresses] = useState<string[]>(
    user?.primaryWallet?.address ? [user.primaryWallet.address] : []
  );

  const [network, setNetwork] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { fetchUserAndKol, walletUpdating, setWalletUpdating } =
    useGlobalStore(); // ✅ стор для обновления user

  const evmProviderRef = useRef<any>(null);
  const solanaProviderRef = useRef<any>(null);

  /** ✅ Слушатели MetaMask */
  const setupMetamaskListeners = (provider: any) => {
    if (!provider?.on) return;
    provider.on("accountsChanged", (accounts: string[]) =>
      setAddresses(accounts)
    );
    provider.on("chainChanged", (chainId: string) =>
      setNetwork(`eip155:${parseInt(chainId, 16)}`)
    );
    provider.on("disconnect", () => {
      console.warn("MetaMask disconnected");
      setAddresses([]);
      setNetwork(null);
    });
  };

  /** ✅ Отправка данных на бэкенд + обновление стора */
  const registerWallet = async (data: any) => {
    setWalletUpdating(true);

    try {
      await fetch("/api/wallets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await fetchUserAndKol(true); // 🔄 подтягиваем финальные данные
    } finally {
      setWalletUpdating(false); // 🟢 завершаем локальное обновление
    }
  };

  /** ✅ Удаление кошелька */
  const unregisterWallet = async (address: string) => {
    setWalletUpdating(true);

    try {
      await fetch("/api/wallets/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.username, address }),
      });
      await fetchUserAndKol(true); // 🔄 обновляем user глобально
    } finally {
      setWalletUpdating(false); // 🟢 завершаем локальное обновление
    }
  };

  /** ✅ Подключение MetaMask */
  const connectMetamask = async () => {
    try {
      const metamask = (window as any).ethereum;
      if (!metamask?.isMetaMask) return false;

      const accounts: string[] = await metamask.request({
        method: "eth_requestAccounts",
      });
      const chainId = await metamask.request({ method: "eth_chainId" });

      setAddresses(accounts);
      setNetwork(`eip155:${parseInt(chainId, 16)}`);
      evmProviderRef.current = metamask;

      setupMetamaskListeners(metamask);

      if (accounts[0]) {
        const chainInfo = EVM_CHAINS_FULL.find(
          (c) => c.id === parseInt(chainId, 16)
        );
        await registerWallet({
          username: user?.username,
          address: accounts[0],
          chain: `eip155:${parseInt(chainId, 16)}`,
          label: chainInfo?.name,
          symbol: chainInfo?.symbol,
          explorer: chainInfo?.explorer,
        });
      }

      afterConnectCallback?.();
      return true;
    } catch (err) {
      console.error("⚠️ MetaMask error:", err);
      return false;
    }
  };

  /** ✅ WalletConnect fallback */
  const connectWalletConnect = async (projectId: string) => {
    try {
      const wcProvider = await EthereumProvider.init({
        projectId,
        chains: chainIds,
        showQrModal: true,
        qrModalOptions: { themeMode: "dark" },
      });

      wcProvider.on("connect", () => afterConnectCallback?.());
      wcProvider.on("session_delete", () => setAddresses([]));

      await wcProvider.enable();
      evmProviderRef.current = wcProvider;
      setAddresses(wcProvider.accounts || []);
      setNetwork(`eip155:${wcProvider.chainId}`);

      if (wcProvider.accounts?.[0]) {
        const chainInfo = EVM_CHAINS_FULL.find(
          (c) => c.id === wcProvider.chainId
        );
        await registerWallet({
          username: user?.username,
          address: wcProvider.accounts[0],
          chain: `eip155:${wcProvider.chainId}`,
          label: chainInfo?.name,
          symbol: chainInfo?.symbol,
          explorer: chainInfo?.explorer,
        });
      }
    } catch (err) {
      console.error("❌ WalletConnect failed:", err);
    }
  };

  /** ✅ Solana fallback */
  const connectSolana = async (projectId: string) => {
    try {
      const solana = await UniversalProvider.init({
        projectId,
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
      setAddresses(solana.accounts || []);
      setNetwork("solana:mainnet");

      if (solana.accounts?.[0]) {
        await registerWallet({
          username: user?.username,
          address: solana.accounts[0],
          chain: "solana:mainnet",
        });
      }
    } catch (err) {
      console.error("❌ Solana connect failed:", err);
    }
  };

  /** ✅ Основная функция подключения */
  const connect = useCallback(async () => {
    setLoading(true);
    const { walletConnectProjectId } = await fetch("/config").then((r) =>
      r.json()
    );
    setLoading(false);

    if (isFirefox) await new Promise((res) => setTimeout(res, 500));
    const metamaskConnected = await connectMetamask();
    if (!metamaskConnected)
      await connectWalletConnect(walletConnectProjectId).catch(() =>
        connectSolana(walletConnectProjectId)
      );
  }, [user?.username]);

  /** ✅ Disconnect */
  const disconnect = useCallback(
    async (address?: string) => {
      const addr = addresses[0] || address;
      if (evmProviderRef.current?.disconnect)
        await evmProviderRef.current.disconnect();
      if (solanaProviderRef.current?.disconnect)
        await solanaProviderRef.current.disconnect();

      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith("@appkit/") || k.includes("walletconnect"))
          localStorage.removeItem(k);
      });

      setAddresses([]);
      setNetwork(null);

      if (addr) await unregisterWallet(addr); // 🟢 удаляем + обновляем стор
    },
    [addresses, user?.username]
  );

  /** ✅ Восстановление MetaMask-сессии */
  // useEffect(() => {
  //   const metamask = (window as any).ethereum;
  //   if (metamask?.selectedAddress) {
  //     setAddresses([metamask.selectedAddress]);
  //     metamask
  //       .request({ method: "eth_chainId" })
  //       .then((chainId: string) =>
  //         setNetwork(`eip155:${parseInt(chainId, 16)}`)
  //       );
  //     setupMetamaskListeners(metamask);
  //   }
  // }, []);

  return { addresses, network, connect, loading, walletUpdating, disconnect };
}
