import { LoaderIcon, Wallet } from "lucide-react";
import { useMultiChainWallet } from "../hooks/useMultiChainWallet";
import { User } from "../types";
import { shortAddress } from "../utils/shortAddress";

export function WalletButton({ user }: { user: User }) {
  const { addresses, connect, loading, disconnect } = useMultiChainWallet(user);

  console.log(user);

  return (
    <div>
      {Boolean(addresses.length) ? (
        <>
          <button
            disabled={loading}
            onClick={disconnect}
            className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto"
          >
            {!loading && <Wallet className="h-5 w-5 mr-2" />}

            {loading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              `Disconnect ${shortAddress(addresses[0])}`
            )}
          </button>
        </>
      ) : (
        <button
          disabled={loading}
          onClick={connect}
          className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto"
        >
          {!loading && <Wallet className="h-5 w-5 mr-2" />}
          {loading ? <LoaderIcon className="animate-spin" /> : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}
