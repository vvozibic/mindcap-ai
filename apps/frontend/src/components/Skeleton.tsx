import { Property } from "csstype";
import React from "react";

interface SkeletonProps {
  width?: Property.Width | number;
  height?: Property.Height | number;
  boxHeight?: number;
  show?: boolean;
  pill?: boolean;
  rounded?: boolean;
  squared?: boolean;
  animated?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Skeleton = ({ height = "74px" }) => {
  return (
    <div className="w-full animate-pulse overflow-hidden">
      <div className="">
        <div className="w-full rounded-xl bg-gray-700" style={{ height }} />
      </div>
    </div>
  );
};
