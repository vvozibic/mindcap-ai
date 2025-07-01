import { useEffect, useRef } from "react";
import { Project } from "../types";
import { Skeleton } from "./Skeleton";

export const FeaturedProjects = ({
  projects,
  handleOpenProject,
}: {
  projects: Project[];
  handleOpenProject: (p: Project) => void;
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
        topRef.current.style.transform = `translateX(${topX}%)`;
      if (rightRef.current)
        rightRef.current.style.transform = `translateY(${rightY}%)`;
      if (bottomRef.current)
        bottomRef.current.style.transform = `translateX(${bottomX}%)`;
      if (leftRef.current)
        leftRef.current.style.transform = `translateY(${leftY}%)`;

      requestAnimationFrame(animateBorder);
    };

    const animationId = requestAnimationFrame(animateBorder);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full flex items-center justify-center mb-10">
      <div className="relative w-full border border-gray-800 rounded-2xl p-8 md:p-10 overflow-hidden shadow-2xl bg-[#0B0B22]/30">
        {/* Animated Borders */}
        <div className="absolute top-0 left-0 w-full h-0.5 overflow-hidden">
          <div
            ref={topRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFE87C]/60 to-transparent"
          />
        </div>

        <div className="absolute top-0 right-0 w-0.5 h-full overflow-hidden">
          <div
            ref={rightRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#3B82F6]/60 to-transparent"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
          <div
            ref={bottomRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent"
          />
        </div>

        <div className="absolute top-0 left-0 w-0.5 h-full overflow-hidden">
          <div
            ref={leftRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#FFE87C]/60 to-transparent"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Projects</span>{" "}
            <span className="bg-gradient-to-r from-[#F7CE68] to-[#FBAB7E] text-transparent bg-clip-text">
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
            {projects.map((project: Project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-[#f7e05a] transition-all cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFE87C]/20 to-[#3B82F6]/20 flex items-center justify-center mr-3">
                    <img src={project.avatarUrl || ""} alt={project.name} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{project.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Pulses */}
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#FFE87C] animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#3B82F6] animate-pulse"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#FFE87C]/10 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#3B82F6]/10 blur-xl"></div>
      </div>
    </div>
  );
};
