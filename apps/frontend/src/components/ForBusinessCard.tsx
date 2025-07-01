import cn from "classnames";
import { ChevronRight } from "lucide-react";
import * as React from "react";

interface ForBusinessCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: {
    regular: string;
    gradient: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  bottomImage?: string;
  gridOptions?: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
    lightLineColor?: string;
    darkLineColor?: string;
  };
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`
      )}
      style={gridStyles}
    >
      <div className="absolute top-100% [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t to-transparent to-90% from-black" />
    </div>
  );
};

const ForBusinessCard = React.forwardRef<HTMLDivElement, ForBusinessCardProps>(
  (
    {
      className,
      title = "Welcome to Our Platform",
      subtitle = {
        regular: "Beyond Attention: ",
        gradient: "Harness the Power of Purpose-Driven KOLs",
      },
      description = "Forget fleeting trends. Our platform connects your projects with Key Opinion Leaders who generate lasting utility and results.",
      ctaText = "Get Started",
      ctaHref = "#",
      bottomImage,
      gridOptions,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        {/* Fallback gradient background adapted to theme */}
        <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(255,214,102,0.08),rgba(255,255,255,0))]" />
        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid {...gridOptions} />
          <div className="max-w-screen-xl z-10 mx-auto px-1 sm:px-4 lg:px-8 py-8 gap-12 md:px-8">
            <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 px-4 py-28 mx-auto text-center">
              <h1 className="text-sm text-gray-400 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr to-transparent from-zinc-300/5 via-gray-400/5 border-[2px] border-white/5 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>
              <h2 className="text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                {subtitle.regular}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-300">
                  {subtitle.gradient}
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-300">{description}</p>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFE87C_0%,#3B82F6_50%,#FFE87C_100%)]" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                    <a
                      href={ctaHref}
                      className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr to-transparent from-zinc-300/5 via-blue-500/10 text-white border border-white/10 hover:via-blue-500/30 transition-all sm:w-auto py-4 px-10"
                    >
                      {ctaText}
                    </a>
                  </div>
                </span>
              </div>
            </div>
            {children}
            {bottomImage && (
              <div className="mt-32 mx-3 relative z-10">
                <img
                  src={bottomImage}
                  className="w-full shadow-lg rounded-lg border border-gray-200"
                  alt="Dashboard preview"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
);
ForBusinessCard.displayName = "ForBusinessCard";

export { ForBusinessCard };
