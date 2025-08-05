import { LoaderIcon, Wallet } from "lucide-react";
import { useMultiChainWallet } from "../hooks/useMultiChainWallet";
import { User } from "../types";
import { shortAddress } from "../utils/shortAddress";

export function WalletButton({
  user,
  afterConnectCallback,
}: {
  user: User;
  afterConnectCallback?: () => void;
}) {
  const { addresses, connect, loading, walletUpdating, disconnect } =
    useMultiChainWallet(user, afterConnectCallback);

  return (
    <div>
      {Boolean(addresses.length) || user.primaryWallet?.address ? (
        <>
          <button
            disabled={loading}
            onClick={() => disconnect(user.primaryWallet?.address)}
            className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto"
          >
            {!loading && !walletUpdating && <Wallet className="h-5 w-5 mr-2" />}

            {loading || walletUpdating ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              `Disconnect ${addresses[0] ? shortAddress(addresses[0]) : shortAddress(user?.primaryWallet?.address || "")}`
            )}
          </button>
        </>
      ) : (
        <button
          disabled={loading}
          onClick={connect}
          className="w-full bg-accent-500 hover:bg-accent-600 text-black py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors mt-auto"
        >
          {!loading && !walletUpdating && <Wallet className="h-5 w-5 mr-2" />}
          {loading || walletUpdating ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            "Connect Wallet"
          )}
        </button>
      )}
    </div>
  );
}
