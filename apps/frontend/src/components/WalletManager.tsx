import { Wallet } from "lucide-react";
import { useMultiChainWallet } from "../hooks/useMultiChainWallet";
import { User } from "../types";
import { shortAddress } from "../utils/shortAddress";

export function WalletButton({ user }: { user: User }) {
  const { addresses, connect, disconnect } = useMultiChainWallet(user);

  console.log(user);

  return (
    <div>
      {Boolean(addresses.length) ? (
        <>
          <button
            onClick={disconnect}
            className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto"
          >
            <Wallet className="h-5 w-5 mr-2" />
            Disconnect {shortAddress(addresses[0])}
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto"
        >
          <Wallet className="h-5 w-5 mr-2" />
          Connect Wallet
        </button>
      )}
    </div>
  );
}
