import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import truncateString from "../../utils/helpers/truncateString";
import { ThemeContext } from "../context/themeContext";

interface ResultsProps {
  resultsData: { [any: string]: any };
}

function Results({ resultsData = [] }: ResultsProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme === 'light' ? 'bg-[#ffffff]' : 'bg-[#111]'} p-2 shadow-md flex flex-col flex-nowrap  lg:space-x-0 lg:space-y-2 `}>
      {resultsData.posts.edges.map((result: { [key: string]: any }, i: number) => (
        <ResultItem key={i} data={result.node} />
      ))}
    </div>
  );
}

function ResultItem({ data, skeleton }: { data?: { [key: string]: any }; skeleton?: boolean }) {
  const { theme } = useContext(ThemeContext)

  const imageLink = useMemo(() => {
    if (!data) return;
    const srcSetArray = data?.featuredImage.node.srcSet.split(", ").map((srcSet: string) => srcSet.split(" ")[0]);
    if (srcSetArray) {
      return srcSetArray[0];
    } else {
      return data?.featuredImage.node.link;
    }
  }, [data]);
  console.log(data)
  return (
    <Link href={data?.uri || "#"}>
      <a>
        <article className={`${theme === 'light' ? 'bg-[#fff] hover:bg-[#efefef] text-[#111] border-gray-200' : 'text-[#efefef] hover:bg-[#444]  border-main-black bg-light-black'} xsm:p-2 md:p-3  border mt-2 rounded-md shadow-md flex overflow-hidden w-auto`}>
          <div className="relative">
            <div className="flex-shrink-0 xsm:rounded-sm lg:rounded-md overflow-hidden relative w-[120px] h-[100px]">
              <Image src={imageLink} objectFit="cover" layout="fill" alt={data?.featuredImage.node.altText} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="!leading-5 font-medium font-khand-headers text-[17px] p-2 lg:p-1 xl:p-2 relative">
              {truncateString(data!.title, 100)}
            </div>
            <p className={`${theme === 'light' ? 'text-[#333]' : 'text-[#c6c6c6]'} !leading-5 font-medium xsm:hidden md:flex text-[13px] p-2 lg:p-1 xl:p-2 relative`}>
              {truncateString(data!.excerpt, 180).slice(3, 150)}...
            </p>

          </div>
        </article>
      </a>
    </Link>
  );
}

export default Results;
