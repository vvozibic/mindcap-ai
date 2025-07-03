import { Dialog, Transition } from "@headlessui/react";
import { DollarSign, TrendingUp, Users, X } from "lucide-react";
import React, { Fragment } from "react";
import { ProtokolsProject } from "../../types";

interface ProjectDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProtokolsProject | null;
}

const ProjectDetailOverlay: React.FC<ProjectDetailOverlayProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!project) return null;

  const topNarrative = project.narrativeLinks
    ?.slice()
    .sort(
      (a, b) =>
        (b.projectMindsharePercent ?? 0) - (a.projectMindsharePercent ?? 0)
    )[0];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-primary-800 p-6 text-left shadow-xl transition-all border border-primary-700 relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={project.avatarUrl || "/default-avatar.png"}
                    alt={project.name}
                    className="h-14 w-14 rounded-full border border-primary-600"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {project.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      @{project.twitterUsername}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <TrendingUp className="text-accent-500 h-5 w-5 mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Mindshare</p>
                      <p className="text-base font-medium text-white">
                        {project.mindsharePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="text-accent-500 h-5 w-5 mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Followers</p>
                      <p className="text-base font-medium text-white">
                        {project.followersCount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <DollarSign className="text-accent-500 h-5 w-5 mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Market Cap</p>
                      <p className="text-base font-medium text-white">
                        {project.marketCap
                          ? `$${project.marketCap.toLocaleString()}`
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <DollarSign className="text-accent-500 h-5 w-5 mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Price</p>
                      <p className="text-base font-medium text-white">
                        {project.price ? `$${project.price.toFixed(4)}` : "-"}
                      </p>
                    </div>
                  </div>
                </div>

                {topNarrative && (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-300 mb-2">
                      Top Narrative
                    </h3>
                    <div className="bg-primary-700 rounded-lg p-4">
                      <p className="text-white font-medium">
                        {topNarrative.narrative.name}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Project Mindshare in this narrative:{" "}
                        {topNarrative.projectMindsharePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                )}

                {project.description && (
                  <div>
                    <h3 className="text-md font-semibold text-gray-300 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectDetailOverlay;
