import React, { useCallback, useContext, useMemo } from 'react';
import { useState } from 'react';
import Footer from '../components/common/Footer';
import GridSectionWrapper from '../components/common/GridSectionWrapper';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Navbar from '../components/common/Navbar';
import SideNavbar from '../components/common/SideNavbar';
import MainImageNews from '../components/home/MainImageNews';
import NewsItem from '../components/home/NewsItem';
import SectionTitle from '../components/home/SectionTitle';
import SpecialEvents from '../components/home/SpecialEvents';
import Head from 'next/head';
import { request } from 'graphql-request';
import GRAPHQL_QUERIES from '../services/GraphQLQueries';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import useMediaQuery from '../hooks/useMediaQuery';
import GoogleSheetsService from '../services/GoogleSheetsServices';
import parse from 'html-react-parser';
import SearchBar from '../components/home/SearchBar';
import router, { useRouter } from 'next/router';
import { ThemeContext } from '../components/context/themeContext'
import ResultList from '../components/results/ResultList';
import TopMenuBar from '../components/common/TopMenuBar';
import RightSwitchComponent from '../components/common/RightSwitchComponent';
import { MatchContext } from '../components/context/rightSectionData';
const Ad = dynamic(() => import('../components/common/Ad'), { ssr: false });
const YoutubePlaylist = dynamic(
  () => import('../components/home/YoutubePlaylist')
);
const FooterNews = dynamic(() => import('../components/home/FooterNews'));
const Results = dynamic(() => import('../components/home/Results'));

export const fetcher = (query: string) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);

interface IndexPageProps {
  featuredArticles: { [any: string]: any };
  newsAndRumors: { [any: string]: any };
  ppvArticle: { [any: string]: any };
  resultsData: { [any: string]: any };
  specialEvents: Array<string>;
  youtubeVideoIds: Array<string>;
  MatchCardWWE: Array<string>;
  currentChapions: Array<string>;
  ppvResults: Array<string>;
  seoData: { [any: string]: any };
}

function IndexPage({
  featuredArticles,
  newsAndRumors,
  specialEvents,
  ppvArticle,
  resultsData,
  youtubeVideoIds,
  seoData,
  MatchCardWWE,
  ppvResults, currentChapions
}: IndexPageProps) {

  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);
  const [actualCursor, setActualCursor] = useState('');
  const [totalNewsAndRumors, setTotalNewsAndRumors] = useState<Array<any>>([]);
  // const [theme, setTheme] = useState('light');
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    if (newsAndRumors && totalNewsAndRumors.length === 0) {
      setTotalNewsAndRumors(newsAndRumors.posts.edges);
      setActualCursor(newsAndRumors.posts.pageInfo.endCursor);
    }
  }, [newsAndRumors, totalNewsAndRumors]);

  const isScreenSmallSize = useMediaQuery(1023);

  const handleLoadMoreNews = () => {
    if (!newsAndRumors) return;
    setIsLoadingMoreNews(true);
    request(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      GRAPHQL_QUERIES.LOAD_MORE_NEWS_AND_RUMORS_ARTICLES(
        actualCursor || newsAndRumors.posts.cursor
      )
    ).then((data) => {
      if (data) {
        setTotalNewsAndRumors([...totalNewsAndRumors, ...data.posts.edges]);
        setActualCursor(data.posts.pageInfo.endCursor);
        setIsLoadingMoreNews(false);
      }
    });
  };

  const { setMatchCardWWE, setPpvResults, setCurrentChamps } = useContext(MatchContext)

  useEffect(() => {
    if (MatchCardWWE.length > 0) {
      setMatchCardWWE(MatchCardWWE)
    }
  }, [MatchCardWWE])
  useEffect(() => {
    if (currentChapions.length > 0 || ppvResults.length > 0) {
      setCurrentChamps(currentChapions)
      setPpvResults(ppvResults)
    }
  }, [currentChapions, ppvResults])

  const fullHead = useMemo(() => parse(seoData.page.seo.fullHead), [seoData]);
  const Router = useRouter()


  const [query, setQuery] = useState<string>((Router.query.q) as string)

  const dbQuery = useCallback(
    (offset: number) => {
      return GRAPHQL_QUERIES.SEARCH_POSTS(query, offset);
    },
    [query]
  );

  return (
    <>
      <div>
        <Head>
          <title>{seoData.page.seo.title}</title>
          {fullHead}
        </Head>
        <section className="flex xsm:flex-col sm:flex-row">
          <SideNavbar />

          <div className={`${theme === 'light' ? 'flex w-full flex-col bg-[#fafafa]' : 'flex w-full  flex-col bg-main-black'}`}>
            {Router.query && Router.query.link ?
              <div className='m-2'>
                {
                  router.query.link === 'video' ?
                    <section className="youtube">
                      <SearchBar />

                      <SectionTitle

                        title="Watch lastest WWE Matches"
                      />
                      <YoutubePlaylist youtubeVideoIds={youtubeVideoIds} />
                    </section>
                    : router.query.link === 'match-card' ?
                      <div>
                        <SearchBar />

                        <div className="my-2">
                          <SectionTitle

                            title="ppv matchcard"
                          />
                        </div>
                        <RightSwitchComponent type='matchcard' />
                      </div>
                      : router.query.link === 'ppv-results' ?
                        <div className="m-1 flex-1 ">
                          <SearchBar />

                          <div className="my-2">
                            <SectionTitle

                              title="Quick Results"
                            />
                          </div>

                          <RightSwitchComponent type='ppvresults' />

                        </div>
                        : router.query.link === 'ppv-schedule' ?
                          <div className="m-1 flex-1 ">
                            <SearchBar />

                            <div className="my-2">
                              <SectionTitle

                                title="Quick Results"
                              />
                            </div>

                            <RightSwitchComponent type='ppvresults' />

                          </div> :
                          <div className="flex-1 m-1 " style={{ height: 'inherit' }}>
                            <SearchBar />
                            <div className="my-2">
                              <SectionTitle

                                title="PPV schedule"
                              />
                            </div>
                            <SpecialEvents specialEvents={specialEvents} />
                          </div>
                }
              </div>

              : (
                <main className={`flex-1 w-full flex m-auto xl:flex-row xl:max-w-full max-w-[820px] flex-col ${theme === 'light' ? "bg-[#fafafa]" : "bg-main-black"}`}>
                  <section className=" w-full flex-1 xsm:p-2 3xl:p-4">
                    <SearchBar />
                    {/* Banner  */}

                    {!isScreenSmallSize && (
                      <div className="grid grid-rows-2 gap-3  lg:pr-[15px]">
                        <MainImageNews
                          isLoading={!featuredArticles}
                          data={featuredArticles?.posts.edges[1].node}
                          categoryBadge
                        />
                        <MainImageNews
                          isLoading={!featuredArticles}
                          data={featuredArticles?.posts.edges[2].node}
                          categoryBadge
                        />
                      </div>
                    )}

                    {/* Main news */}
                    <div className="sm:h-[480px] ">
                      <MainImageNews
                        isLoading={!featuredArticles}
                        data={featuredArticles?.posts.edges[0].node}
                        size="lg"
                      />
                    </div>

                    {/* Latest wrestling news & rumors */}
                    <div className="order-2  lg:mt-8 pt-2 lg:pt-8 lg:mt-0">
                      <section>
                        <SectionTitle
                          title="latest wrestling news & rumors"
                        />
                        <div className="lg:grid grid-cols-1 gap-x-2 space-y-[0.3rem] mt-4  xsm:px-2 lg:px-4 lg:px-0">
                          {totalNewsAndRumors.length > 0
                            ? totalNewsAndRumors.map((newsData: any, i: number) => (
                              <NewsItem
                                type='news'
                                key={i}
                                data={newsData.node}
                                isLoading={false}
                              />
                            ))
                            : new Array(12)
                              .fill('1')
                              .map((x, i) => <NewsItem
                                type='news' key={i} isLoading />)}
                        </div>
                        <div className="px-4 mt-6 flex justify-center w-full lg:px-0">
                          {isLoadingMoreNews ? (
                            <div className="flex items-center justify-center w-full">
                              <LoadingSpinner />
                            </div>
                          ) : (
                            newsAndRumors && (
                              <button
                                onClick={handleLoadMoreNews}
                                className="uppercase w-fit mx-auto hover:bg-[#ce061e] hover:text-[#fff] hover:border-[#ce061e] rounded-sm md:rounded-md text-[#767676] pt-1 pb-0.5 md:pt-2 md:pb-1 font-khand-headers border px-4 border-[#767676] font-semibold text-[12px] md:text-[16px]"
                              >
                                Load more
                              </button>
                            )
                          )}
                        </div>
                      </section>
                    </div>
                  </section>
                  <section className=" w-full flex-1 xsm:p-2 3xl:p-4">
                    {/* youtube Playlist */}
                    <section className="youtube">
                      <SectionTitle

                        title="Watch lastest WWE Matches"
                      />
                      <YoutubePlaylist youtubeVideoIds={youtubeVideoIds} />
                    </section>

                    <div className="flex my-4 h-fit w-full md:flex-row flex-col">
                      <div className="flex-1 m-1 " style={{ height: 'inherit' }}>
                        <div className="my-2">
                          <SectionTitle

                            title="PPV schedule"
                          />
                        </div>
                        <SpecialEvents specialEvents={specialEvents} />
                      </div>
                      <div className="flex-1 m-1">
                        <div className="my-2">
                          <SectionTitle

                            title="ppv matchcard"
                          />
                        </div>
                        <RightSwitchComponent type='matchcard' />
                      </div>

                    </div>
                    {/* sticky div   */}
                    <section className="sticky top-0">

                      <div className="flex-col md:flex-row flex w-full">
                        <div className="m-1 flex-1 ">
                          <div className="my-2">
                            <SectionTitle
                              title="Quick Results"
                            />
                          </div>

                          <RightSwitchComponent type='ppvresults' />

                        </div>
                        <div className="m-1 flex-1 ">
                          <div className="my-2">
                            <SectionTitle

                              title="CURRENT CHAMPIONS"
                            />
                          </div>
                          <RightSwitchComponent type='champions' />

                        </div>
                      </div>


                      {/* Results */}
                      <div className="h-full order-1 mt-4 lg:order-3 ">
                        <div className="space-y-12">
                          <section>
                            <SectionTitle title="results" />
                            <Results resultsData={resultsData} />
                            {/* <div className="justify-center hidden w-full mt-4 lg:flex">
                          <Ad adId="ww_h_sb_2" />
                        </div> */}
                          </section>
                        </div>
                      </div>
                    </section>

                  </section>
                </main>
              )}
            <section
              className={`${theme === 'light' ? 'bg-gray-100' : 'border-main-black bg-[#111]'} border-t w-full shadow-lg`}>

              <FooterNews />

              <Footer />
            </section>
          </div>
        </section>
      </div >
    </>

  );
}

export async function getStaticProps() {
  const featuredArticles = await fetcher(GRAPHQL_QUERIES.FEATURED_ARTICLES);
  const newsAndRumors = await fetcher(
    GRAPHQL_QUERIES.NEWS_AND_RUMORS_ARTICLES()
  );
  const resultsData = await fetcher(GRAPHQL_QUERIES.RESULTS_ARTICES);
  const seoData = await fetcher(GRAPHQL_QUERIES.GET_PAGE_HEAD_SEO('27920'));

  const { specialEvents, youtubeVideoIds, ppvResults, currentChapions, MatchCardWWE
  } =
    await GoogleSheetsService.getSpreadSheetData();


  return {
    props: {
      featuredArticles,
      newsAndRumors,
      specialEvents,
      youtubeVideoIds,
      resultsData,
      seoData,
      MatchCardWWE,
      ppvResults, currentChapions
    },

    revalidate: 60 * 30, //30 minutes
  };
}

export default IndexPage;
