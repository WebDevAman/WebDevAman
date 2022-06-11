import request from "graphql-request";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useMemo } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/SideNavbar";
import GRAPHQL_QUERIES from "../../services/GraphQLQueries";
import ResultList from "../../components/results/ResultList";
import parse from "html-react-parser";
import GoogleSheetsService from "../../services/GoogleSheetsServices";
import SideNavbar from "../../components/common/SideNavbar";
import SectionTitle from "../../components/home/SectionTitle";
import YoutubePlaylist from "../../components/home/YoutubePlaylist";
import { ThemeContext } from "../../components/context/themeContext";
import NewsItem from "../../components/home/NewsItem";
import SpecialEvents from "../../components/home/SpecialEvents";
import Results from "../../components/home/Results";
import SearchBar from "../../components/home/SearchBar";
import RightSwitchComponent from "../../components/common/RightSwitchComponent";
import { MatchContext } from "../../components/context/rightSectionData";

interface CategoryPageProps {
  authorData: { [any: string]: any };
  ppvArticle: { [any: string]: any };
  resultsData: { [any: string]: any };
  specialEvents: Array<string>;
  youtubeVideoIds: Array<string>;
  seoData: { [any: string]: any };
  featuredArticles: { [any: string]: any };
  MatchCardWWE: Array<string>;
  currentChapions: Array<string>;
  ppvResults: Array<string>;
}

export const fetcher = (query: string) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);

function CategoryPage({ authorData,
  ppvArticle,
  resultsData,
  youtubeVideoIds,
  seoData,
  featuredArticles,
  specialEvents, MatchCardWWE,
  ppvResults, currentChapions
}: CategoryPageProps) {

  const fullHead = useMemo(() => {
    return parse(authorData?.seo.fullHead);
  }, [authorData]);

  const { theme, show } = useContext(ThemeContext)


  const { setMatchCardWWE, setPpvResults, setCurrentChamps, setMatchCardAEW } = useContext(MatchContext)

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

  return (
    <>
      <Head>
        <title>{authorData.seo.title}</title>
        {fullHead}
      </Head>

      <section className="flex xsm:flex-col sm:flex-row">
        <SideNavbar />
        <div className={`${theme === 'light' ? 'flex w-full flex-col bg-[#fafafa]' : 'flex w-full  flex-col bg-main-black'}`}>
          <main className={`flex-1 w-full flex m-auto xl:flex-row xl:max-w-full max-w-[820px] flex-col ${theme === 'light' ? "bg-[#fafafa]" : "bg-main-black"}`}>
            <section className="flex-1 xsm:p-1 lg:p-2 3xl:p-4">
              <div className="max-w-[1240px] mx-auto h-full">
                {show ? (
                  <div className="xsm:flex justify-center xl:hidden w-full">
                    <SearchBar />
                  </div>
                ) : (
                  <div className="text-center my-8">
                    <h1 className={`uppercase ${theme === 'light' ? 'text-[#111111]' : 'text-[#fff]'} text-[25px] md:text-[41px] font-black`}>
                      {authorData.name}
                    </h1>
                    <p
                      className={`${theme === 'light' ? 'text-[#111111]' : 'text-[#fff]'} max-w-2xl mx-auto text-xs font-medium text-gray-500 author-description`}
                      dangerouslySetInnerHTML={{ __html: authorData.description as string }}
                    ></p>
                  </div>
                )}

                <ResultList query={(offset: number) => GRAPHQL_QUERIES.GET_AUTHOR_POSTS(authorData.databaseId, offset)} />
              </div>
            </section>

            <section className=" w-full flex-1 xsm:p-2 3xl:p-4">
              {/* youtube Playlist */}
              <section className="youtube">
                <SectionTitle
                  className="!text-2xl mb-2"
                  title="Watch lastest WWE Matches"
                />
                <YoutubePlaylist youtubeVideoIds={youtubeVideoIds} />
              </section>

              <div className="flex my-4 h-fit w-full md:flex-row flex-col">
                <div className="flex-1 m-1 " style={{ height: 'inherit' }}>
                  <div className="my-2">
                    <SectionTitle
                      className="!text-2xl mb-2"
                      title="PPV schedule"
                    />
                  </div>
                  <SpecialEvents specialEvents={specialEvents} />
                </div>
                <div className="flex-1 m-1">
                  <div className="my-2">
                    <SectionTitle
                      className="!text-2xl mb-2"
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
                        className="!text-2xl mb-2"
                        title="Quick Results"
                      />
                    </div>

                    <RightSwitchComponent type='ppvresults' />

                  </div>
                  <div className="m-1 flex-1 ">
                    <div className="my-2">
                      <SectionTitle
                        className="!text-2xl mb-2"
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
                      <SectionTitle title="WWE & AEW Weekly Results" />
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
          <section
            className={`${theme === 'light' ? 'bg-gray-100' : 'border-main-black bg-[#111]'} border-t shadow-lg`}>
            <Footer />
          </section>
        </div>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, GRAPHQL_QUERIES.GET_ALL_AUTHORS);
  const paths = users.nodes.map((author: { [any: string]: any }) => ({
    params: { authorSlug: author.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const authorSlug = params!.authorSlug as string;

  const { users } = await request(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    GRAPHQL_QUERIES.GET_AUTHOR_DATA(authorSlug)
  );

  if (users.nodes.length === 0) {
    return { notFound: true };
  }

  const resultsData = await fetcher(GRAPHQL_QUERIES.RESULTS_ARTICES);
  const seoData = await fetcher(GRAPHQL_QUERIES.GET_PAGE_HEAD_SEO('27920'));
  const { specialEvents, youtubeVideoIds, ppvResults, currentChapions, MatchCardWWE
  } =
    await GoogleSheetsService.getSpreadSheetData();
  const featuredArticles = await fetcher(GRAPHQL_QUERIES.FEATURED_ARTICLES);

  return {
    props: {
      specialEvents,
      youtubeVideoIds,
      resultsData,
      seoData,
      featuredArticles, MatchCardWWE,
      ppvResults, currentChapions,
      authorData: users.nodes[0],
    },
    revalidate: 60,
  };
};

export default CategoryPage;
