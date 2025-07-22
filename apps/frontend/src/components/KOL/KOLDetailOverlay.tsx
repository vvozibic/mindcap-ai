import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment } from "react";
import { KOL } from "../../types";
import KOLDetails from "./KOLDetails";

interface KOLDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  kol: KOL | null;
  allKOLs: KOL[];
}

const KOLDetailOverlay: React.FC<KOLDetailOverlayProps> = ({
  isOpen,
  onClose,
  kol,
}) => {
  if (!kol) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
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
              <Dialog.Panel className="relative">
                <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <KOLDetails kol={kol} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default KOLDetailOverlay;
