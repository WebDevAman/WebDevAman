
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NewsBadge from "../common/NewsBadge";
import useFormatNewsItemData from "../../hooks/useFormatNewsItemData";
import Skeleton from "../common/Skeleton";

interface MainImageNewsProps {
  data: { [key: string]: any };
  categoryBadge?: boolean;
  isLoading: boolean;
  size?: "sm" | "lg";
}

function MainImageNews({ categoryBadge, size = "sm", data, isLoading }: MainImageNewsProps) {
  const [primaryCategoryName, _, srcSetImage] = useFormatNewsItemData(size === "sm" ? 3 : 1, data);

  return (
    <article className="h-full w-full lg:rounded overflow-hidden relative">
      <Link href={data?.uri || "#"}>
        <a className="block relative h-full title-underline-animation-wrapper" title={data?.title}>
          {!isLoading && data ? (
            <div className="aspect-w-1 aspect-h-1 sm:aspect-none w-full h-full">
              <Image layout="fill" objectFit="cover" alt={data?.featuredImage.node.altText} src={srcSetImage} />
            </div>
          ) : (
            <Skeleton className="absolute inset-0" />
          )}

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg,rgba(10,10,10,0.56),#0a0a0a 0%,rgba(0,0,0,0.35) 50%,rgba(0,0,0,0) 100%,rgba(22,22,22,0) 100%,#161616)",
            }}
          />

          <div>
            <div
              className={`text-white font-semibold absolute  ${size === "sm" ? "bottom-2 left-3 pr-12" : "bottom-4 left-4 pr-12"
                }`}
            >
              {categoryBadge && <NewsBadge colorText="white" text={primaryCategoryName} />}

              <h3 className={`text-[22px] lg:text-[30px]`}>
                <span>{data?.title}</span>
              </h3>
            </div>
          </div>
        </a>
      </Link>
    </article>
  );
}

export default MainImageNews;

