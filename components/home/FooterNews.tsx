import { useContext } from "react";
import useSWR from "swr";
import { fetcher } from "../../pages";
import GRAPHQL_QUERIES from "../../services/GraphQLQueries";
import { News } from "../../types/news";
import useSWROptions from "../../utils/constants/useSWROptions";
import NewsItem from "./NewsItem";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper styles
import 'swiper/css';
import { ThemeContext } from "../context/themeContext";
function FooterNews() {
  const { theme } = useContext(ThemeContext)
  const { data: newsData, error: bottomArticlesError } = useSWR(
    GRAPHQL_QUERIES.ARTICLES_BOTTOM_PAGE,
    fetcher,
    useSWROptions
  );
  return (





    <Swiper
      className="min-h-[390px]   z-10 xl:max-w-[1160px]  lg:max-w-[950px] md:max-w-[680px]  sm:max-w-[420px] xsm:max-w-[300px] 2xl:max-w-[1230px] my-8 flex justify-center "

      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      slidesPerView={3}
      autoplay
      pagination={{ clickable: true }}
      loop
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      breakpoints={{
        340: {
          width: 340,
          slidesPerView: 1,
        },
        640: {
          width: 640,
          slidesPerView: 1,
        },
        768: {
          width: 768,
          slidesPerView: 2,
        },
        1468: {
          width: 1468,
          slidesPerView: 4,
        },
      }}
    >
      {
        newsData
          ? newsData?.posts.edges.map((news: { [any: string]: any }, i: number) => (
            <div key={i + 1} className="flex-1 ">
              <SwiperSlide className="m-auto max-w-[800px] !mr-0 pr-12  ">
                <NewsItem type="footernews" data={news.node} isLoading={false} />
              </SwiperSlide>

            </div>
          ))
          : new Array(5).fill("1").map((x, i) => (
            <div key={i + 1} className="flex-1 bg-transparent">
              <SwiperSlide className=" m-auto max-w-[800px] !mr-0 pr-[50px]  ">
                <NewsItem type="footernews" isLoading />
              </SwiperSlide>

            </div>
          ))
      }

    </Swiper >

  );
}

export default FooterNews;
