import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, User, Twitter } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-200 text-center"
                >
                  Sign in to AttentionFi
                </Dialog.Title>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-400 text-center">
                    Connect your account to view your personalized metrics and earn rewards
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-primary-600 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-primary-700 hover:bg-primary-600"
                    onClick={onClose}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Continue with Email
                  </button>
                  
                  <button
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-900 bg-accent-500 hover:bg-accent-600"
                    onClick={() => {
                      onLogin();
                      onClose();
                    }}
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    Continue with X
                  </button>
                </div>
                
                <div className="mt-6">
                  <p className="text-xs text-gray-500 text-center">
                    By signing in, you agree to our Terms of Service and Privacy Policy
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
