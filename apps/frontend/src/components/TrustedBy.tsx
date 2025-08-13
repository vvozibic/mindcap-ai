"use client";

import classNames from "classnames";
import * as React from "react";

interface Brand {
  name: string;
  logo: string;
}

interface BrandsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  brands?: Brand[];
  imageHeight?: number;
}

const defaultBrands = [
  {
    name: "Avalance",
    logo: "/images/trusted-by/avax.jpeg",
  },
  {
    name: "OG labs",
    logo: "/images/trusted-by/og.svg",
  },
  {
    name: "Aethir",
    logo: "/images/trusted-by/aethir.jpeg",
  },
  {
    name: "Moonveil",
    logo: "/images/trusted-by/moonveil.webp",
  },
  {
    name: "Taker Protocol",
    logo: "/images/trusted-by/taker.png",
  },
  {
    name: "Overlay Protocol",
    logo: "/images/trusted-by/overlay.png",
  },
  {
    name: "CoralApp",
    logo: "/images/trusted-by/coral.png",
  },
  {
    name: "OpenAI",
    logo: "/images/trusted-by/gpt.png",
  },
  {
    name: "Microsoft",
    logo: "/images/trusted-by/microsoft.png",
  },
];

export const BrandsGrid = React.forwardRef<HTMLDivElement, BrandsGridProps>(
  (
    {
      className,
      title = "Trusted by fast-growing companies in web3 and web2 worlds",
      brands = defaultBrands,
      imageHeight = 68, // 14 * 4 = 56px (h-14)
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={classNames("py-24", className)} {...props}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          {title && (
            <p className=" mx-auto text-pretty text-center font-medium mb-6 text-foreground md:text-lg">
              {title}
            </p>
          )}

          <div className="max-w-5xl mx-auto flex flex-row flex-wrap align-center justify-center items-center md:grid-cols-3 lg:grid-cols-9">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center p-4"
              >
                <div className="relative h-[68px] w-full flex ">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="object-contain grayscale"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
