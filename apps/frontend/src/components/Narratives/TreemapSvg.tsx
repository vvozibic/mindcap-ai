import { hierarchy, treemap } from "d3-hierarchy";
import React, { useMemo } from "react";
import { formatNumber } from "../../utils/formatNumber";
import { Skeleton } from "../Skeleton";
import { Narrative } from "./types";

interface TreemapSvgProps {
  data: Narrative[];
  getChange: (n: Narrative) => number;
  hoveredId?: string | null;
  onHover?: (id: string | null) => void;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

const aliasMap: Record<string, string> = {
  RWAs: "Real World Assets",
  "LSD (Liquid Staking Derivatives)": "LSDs",
};

const TreemapSvg: React.FC<TreemapSvgProps> = ({
  data,
  getChange,
  hoveredId,
  onHover,
  selectedId,
  onSelect,
}) => {
  const layout = useMemo(() => {
    const MIN_PERCENT = 1.5;

    const root = hierarchy({ children: data })
      .sum((d: any) => Math.max(d.mindsharePercent, MIN_PERCENT))
      .sort((a, b) => b.value! - a.value!);

    treemap<{ children: Narrative[] }>()
      .size([100, 105])
      .paddingOuter(1)
      .paddingInner(0.7)(root);

    return root.leaves();
  }, [data]);

  if (!data.length) return <Skeleton />;

  return (
    <div className="bg-primary-700 rounded-lg w-full relative overflow-hidden">
      <svg
        viewBox={`0 0 100 105`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          <clipPath id="textClip">
            {layout.map((node, i) => (
              <rect
                key={i}
                x={node.x0}
                y={node.y0}
                width={node.x1 - node.x0}
                height={node.y1 - node.y0}
              />
            ))}
          </clipPath>
        </defs>

        {layout.map((node) => {
          const n = node.data as Narrative;
          const change = getChange(n);
          const isGain = change > 0;
          const boxWidth = node.x1 - node.x0;
          const boxHeight = node.y1 - node.y0;

          const name = aliasMap[n.name] || n.name;

          const titleFontSize = Math.max(
            1.2,
            Math.min((boxWidth / name.length) * 1.2, boxHeight / 4, 2.5)
          );

          const subtitleFontSize = Math.max(
            1,
            Math.min(boxWidth / 2 / 6, boxHeight / 5, 2)
          );

          const nameLines =
            name.length > 12 && boxHeight > 10
              ? name.split(/\s|(?=[A-Z])|-/).reduce((acc, word) => {
                  const last = acc[acc.length - 1];
                  if (!last || (last + " " + word).length > 10) acc.push(word);
                  else acc[acc.length - 1] = last + " " + word;
                  return acc;
                }, [] as string[])
              : [name];

          const subtitleLines =
            boxWidth > 15 && boxHeight > 10
              ? [
                  `${n.mindsharePercent.toFixed(1)}%`,
                  `${isGain ? "▲" : "▼"} ${change.toFixed(1)}%`,
                ]
              : [`${isGain ? "▲" : "▼"} ${change.toFixed(1)}%`];

          const textStartY =
            (node.y0 + node.y1) / 2 -
            ((nameLines.length + subtitleLines.length - 1) *
              (titleFontSize + 0.3)) /
              2;

          const isVertical = boxHeight > boxWidth * 1.3;

          const isHovered = hoveredId === n.id;
          const isSelected = selectedId === n.id;

          return (
            <g
              key={n.id}
              onClick={() => onSelect?.(n.id)}
              onMouseEnter={() => onHover?.(n.id)}
              onMouseLeave={() => onHover?.(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={node.x0}
                y={node.y0}
                width={boxWidth}
                height={boxHeight}
                fill={isGain ? "#22c55e" : "#ef4444"}
                fillOpacity={
                  selectedId && !isSelected ? 0.5 : isHovered ? 1 : 0.8
                }
                stroke={isSelected ? "#ffffff" : isGain ? "#16a34a" : "#dc2626"}
                strokeWidth={isSelected ? 0.6 : 0.2}
                rx={0.5}
                ry={0.5}
              >
                <title>
                  {name} — Mindshare: {n.mindsharePercent.toFixed(2)}% |{" "}
                  {isGain ? "+" : ""}
                  {change.toFixed(2)}% | {formatNumber(n.totalViews)} views
                </title>
              </rect>

              {boxWidth > 6 && boxHeight > 6 && (
                <g clipPath="url(#textClip)">
                  {nameLines.map((line, i) => (
                    <text
                      key={"name-" + i}
                      x={(node.x0 + node.x1) / 2}
                      y={textStartY + i * (titleFontSize + 0.1)}
                      textAnchor="middle"
                      fill="white"
                      fontSize={titleFontSize}
                      fontWeight="bold"
                    >
                      {line.length > 14 ? line.slice(0, 12) + "…" : line}
                    </text>
                  ))}

                  {isVertical ? (
                    subtitleLines.map((line, i) => (
                      <text
                        key={"subtitle-vert-" + i}
                        x={(node.x0 + node.x1) / 2}
                        y={
                          textStartY +
                          nameLines.length * (titleFontSize + 0.1) +
                          i * (subtitleFontSize + 0.2)
                        }
                        textAnchor="middle"
                        fill="white"
                        fontSize={subtitleFontSize}
                      >
                        {line}
                      </text>
                    ))
                  ) : (
                    <text
                      x={(node.x0 + node.x1) / 2}
                      y={
                        textStartY +
                        nameLines.length * (titleFontSize + 0.1) +
                        subtitleFontSize +
                        0.2
                      }
                      textAnchor="middle"
                      fill="white"
                      fontSize={subtitleFontSize}
                    >
                      {subtitleLines.join(" | ")}
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TreemapSvg;
