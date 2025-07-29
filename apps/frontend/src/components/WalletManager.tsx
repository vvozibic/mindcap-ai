import { useMultiChainWallet } from "../hooks/useMultiChainWallet";

export function WalletManager() {
  const { addresses, network, connect, disconnect } = useMultiChainWallet();

  return (
    <div>
      {addresses.length ? (
        <>
          <p>✅ Connected to {network}</p>
          <ul>
            {addresses.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <>
          <button onClick={() => connect("ethereum")}>Connect Ethereum</button>
          <button onClick={() => connect("bnb")}>Connect BNB</button>
          <button onClick={() => connect("arbitrum")}>Connect Arbitrum</button>
          <button onClick={() => connect("solana")}>Connect Solana</button>
        </>
      )}
    </div>
  );
}
