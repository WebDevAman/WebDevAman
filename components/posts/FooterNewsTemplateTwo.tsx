import React from "react";
import NewsItem from "../home/NewsItem";

interface FooterNewsTemplateTwo {
  newsData: { [any: string]: any };
}

function FooterNewsTemplateTwo({ newsData }: FooterNewsTemplateTwo) {
  return (
    <div className="bg-[#18191A]">
      <div className="max-w-[1240px] mx-auto">
        <h2 className="uppercase text-white font-extrabold text-2xl border-l-4 px-3 mx-4 border-main inline-block mt-2 mb-8">
          WRESTLING NEWS & RUMORS
        </h2>
        <div className="max-w-[1440px] space-y-4 lg:space-y-0 lg:grid grid-cols-4 grid-rows-2 gap-4 px-4 pb-14">
          {newsData
            ? newsData?.posts.edges.map((news: { [any: string]: any }, i: number) => (
              <div key={i} className="flex-1">
                <NewsItem data={news.node} isLoading={false} type='footernews' />
              </div>
            ))
            : new Array(8).fill("1").map((x, i) => (
              <div key={i} className="flex-1">
                <NewsItem key={i} isLoading type='footernews' />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FooterNewsTemplateTwo;
