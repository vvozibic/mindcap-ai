import { Dialog, Transition } from "@headlessui/react";
import { Twitter, X } from "lucide-react";
import React, { Fragment, useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

type Step = "method" | "email" | "twitter";

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [step, setStep] = useState<Step>("method");
  const [email, setEmail] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/login/email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoading(false);
    localStorage.setItem("user", email);
    onLogin(data.user);
    onClose();
  };

  const handleTwitterLogin = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/login/twitter", {
      method: "POST",
      body: JSON.stringify({ twitterHandle }),
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("user", twitterHandle);
    const data = await res.json();
    setLoading(false);
    onLogin(data.user);
    onClose();
  };

  const reset = () => {
    setStep("method");
    setEmail("");
    setTwitterHandle("");
  };

  const renderContent = () => {
    if (step === "method") {
      return (
        <div className="mt-6 space-y-4">
          {/* <button
            onClick={() => setStep("email")}
            className="w-full flex items-center justify-center px-4 py-2 border border-primary-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-primary-700 hover:bg-primary-600"
          >
            <User className="h-5 w-5 mr-2" />
            Continue with Email
          </button> */}

          <a href="/api/auth/twitter">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-900 bg-accent-500 hover:bg-accent-600">
              <Twitter className="h-5 w-5 mr-2" />
              Continue with Twitter
            </button>
          </a>
        </div>
      );
    }

    if (step === "email") {
      return (
        <div className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 rounded-md bg-primary-700 text-white placeholder-gray-400 border border-primary-700"
          />
          <button
            onClick={handleEmailLogin}
            disabled={loading}
            className="w-full py-2 px-4 bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-md"
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>
        </div>
      );
    }

    if (step === "twitter") {
      return (
        <div className="mt-6 space-y-4">
          <input
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            placeholder="@yourhandle"
            className="w-full px-3 py-2 rounded-md bg-primary-700 text-white placeholder-gray-400 border border-primary-700"
          />
          <button
            onClick={handleTwitterLogin}
            disabled={loading}
            className="w-full py-2 px-4 bg-accent-500 hover:bg-accent-600 text-primary-900 rounded-md"
          >
            {loading ? "Signing in..." : "Sign in with Twitter"}
          </button>
        </div>
      );
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          reset();
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-800 p-6 text-left align-middle shadow-xl transition-all border border-primary-700">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-300"
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-200 text-center"
                >
                  {step === "method"
                    ? "Sign in to MindoAI"
                    : step === "email"
                    ? "Enter your Email"
                    : "Enter your Twitter Handle"}
                </Dialog.Title>

                <div className="mt-2 text-sm text-gray-400 text-center">
                  {step === "method"
                    ? "Choose how you want to log in"
                    : "We’ll use this to log you in and create your account"}
                </div>

                {renderContent()}

                <div className="mt-6">
                  <p className="text-xs text-gray-500 text-center">
                    By signing in, you agree to our Terms of Service and Privacy
                    Policy
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginModal;
