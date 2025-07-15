import { useEffect, useRef } from "react";
import { ProtokolsProject } from "../../types";
import { Skeleton } from "../Skeleton";

export const FeaturedProjects = ({
  projects,
  handleOpenProject,
}: {
  projects: ProtokolsProject[];
  handleOpenProject: (p: ProtokolsProject, tab?: "overview" | "pools") => void;
}) => {
  const topRef = useRef(null);
  const rightRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    const animateBorder = () => {
      const now = Date.now() / 1000;
      const speed = 0.5;

      const topX = Math.sin(now * speed) * 100;
      const rightY = Math.cos(now * speed) * 100;
      const bottomX = Math.sin(now * speed + Math.PI) * 100;
      const leftY = Math.cos(now * speed + Math.PI) * 100;

      if (topRef.current)
        (
          topRef.current as HTMLDivElement
        ).style.transform = `translateX(${topX}%)`;
      if (rightRef.current)
        (
          rightRef.current as HTMLDivElement
        ).style.transform = `translateY(${rightY}%)`;
      if (bottomRef.current)
        (
          bottomRef.current as HTMLDivElement
        ).style.transform = `translateX(${bottomX}%)`;
      if (leftRef.current)
        (
          leftRef.current as HTMLDivElement
        ).style.transform = `translateY(${leftY}%)`;

      requestAnimationFrame(animateBorder);
    };

    const animationId = requestAnimationFrame(animateBorder);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full border border-primary-700/30 rounded-2xl p-8 md:p-10 overflow-hidden backdrop-blur-sm shadow-2xl bg-primary-800/50">
        {/* Animated Borders */}
        <div className="absolute top-0 left-0 w-full h-0.5 overflow-hidden">
          <div
            ref={topRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
          />
        </div>

        <div className="absolute top-0 right-0 w-0.5 h-full overflow-hidden">
          <div
            ref={rightRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-accent-500/40 to-transparent"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
          <div
            ref={bottomRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
          />
        </div>

        <div className="absolute top-0 left-0 w-0.5 h-full overflow-hidden">
          <div
            ref={leftRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-accent-500/40 to-transparent"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Mindo</span>{" "}
            <span className="bg-accent-500 text-transparent bg-clip-text">
              Arena
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!projects.length && (
              <>
                <Skeleton />
                <Skeleton />
              </>
            )}
            {projects.map((project) => {
              const totalRewardPercent = project.rewardPools?.reduce(
                (acc, pool) => acc + pool.totalAmountUsd,
                0
              );

              return (
                <div
                  key={project.id}
                  onClick={() => handleOpenProject(project, "overview")}
                  className="bg-primary-900/30 backdrop-blur-sm rounded-xl p-4 border border-primary-700 hover:border-accent-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center mr-3">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={project.avatarUrl || ""}
                        alt={project.name}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-left">
                        {project.name}
                      </h3>
                      <p className="text-sm text-text-muted text-left">
                        {project.stage}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted text-left mt-2">
                    {project.description}
                  </p>
                  {totalRewardPercent > 0 && (
                    <div className="flex items-center justify-between border-t border-primary-700 pt-3">
                      <div>
                        <p className="text-xs text-text-muted">
                          Total Reward pool
                        </p>
                        <p className="text-accent-500 font-semibold text-left">
                          $ {totalRewardPercent?.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProject(project, "pools");
                        }}
                        className="bg-accent-500 hover:bg-accent-600 text-primary-900 text-sm px-3 py-1 rounded-md"
                      >
                        Earn
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Decorative Pulses */}
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent-500 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-accent-500 animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent-500/10 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent-500/10 blur-xl"></div>
      </div>
    </div>
  );
};
