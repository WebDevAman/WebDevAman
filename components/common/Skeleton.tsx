import React, { FC } from "react";
import cn from "classnames";

interface SkeletonProps {
  className?: string;
  width?: number;
  height?: number;
  count?: number;
  color?: string;
}

const Skeleton: FC<SkeletonProps> = ({ className, width, height, count = 1, color = "rgb(243, 244, 246)" }) => {
  const skeletons = new Array(count).fill(null).map((_, i) => (
    <span
      key={i}
      style={{ backgroundColor: color, width: width || "100%", height: height || "auto" }}
      className={cn(
        "animate-pulse bg-gray-100 rounded inline-block",
        {
          "mb-2": count > 1 && i !== count - 1,
        },
        className
      )}
    >
      &nbsp;
    </span>
  ));

  return <>{skeletons}</>;
};

export default React.memo(Skeleton);
