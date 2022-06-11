import { useRouter } from "next/router";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/SideNavbar";
import GRAPHQL_QUERIES from "../services/GraphQLQueries";
import ResultList from "../components/results/ResultList";
import { useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";
import SectionTitle from '../components/home/SectionTitle'
import {
  ThemeContext
} from '../components/context/themeContext'
import { request } from 'graphql-request';
import dynamic from "next/dynamic";
import GoogleSheetsService from "../services/GoogleSheetsServices";
import NewsItem from "../components/home/NewsItem";
import SpecialEvents from "../components/home/SpecialEvents";
import Results from "../components/home/Results";
import Ad from "../components/common/Ad";
import SideNavbar from "../components/common/SideNavbar";
import RightSwitchComponent from "../components/common/RightSwitchComponent";
import { MatchContext } from "../components/context/rightSectionData";
import { BsSearch } from "react-icons/bs";
const YoutubePlaylist = dynamic(
  () => import('../components/home/YoutubePlaylist')
);



export const fetcher = (query: string) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);
interface SearchPageProps {
  resultsData: { [any: string]: any };
  specialEvents: Array<string>;
  youtubeVideoIds: Array<string>;
  seoData: { [any: string]: any };
  featuredArticles: { [any: string]: any };
  MatchCardWWE: Array<string>;
  currentChapions: Array<string>;
  ppvResults: Array<string>;
}

function Search({
  specialEvents,
  resultsData,
  youtubeVideoIds,
  seoData,
  featuredArticles,
  MatchCardWWE,
  ppvResults, currentChapions,
}: SearchPageProps) {
  const router = useRouter();

  const [query, setQuery] = useState<string>((router.query?.q || "") as string);

  const dbQuery = useCallback(
    (offset: number) => {
      return GRAPHQL_QUERIES.SEARCH_POSTS(query, offset);
    },
    [query]
  );


  const handleUserSearch = useCallback(
    (e: FormEvent, value: string) => {
      e.preventDefault();
      if (query !== value) {
        setQuery(value);
      }
    },
    [query]
  );
  const { theme, show, setShow } = useContext(ThemeContext)


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
        <title>{query} Results | WrestlingWorld</title>
      </Head>
      <section className="flex xsm:flex-col sm:flex-row">
        <SideNavbar />
        <div className={`${theme === 'light' ? 'flex w-full flex-col bg-[#fafafa]' : 'flex w-full  flex-col bg-main-black'}`}>
          <main className={`flex-1 w-full flex m-auto xl:flex-row xl:max-w-full max-w-[820px] flex-col ${theme === 'light' ? "bg-[#fafafa]" : "bg-main-black"}`}>
            <section className="flex-1 xsm:p-1 md:p-3">
              <div className="max-w-[1240px] mx-auto h-full">
                <SearchInput query={query} handleUserSearch={handleUserSearch} />
                <ResultList query={dbQuery} emptyResultsLabel="No posts to display" />
              </div>
            </section>

            <section className="flex-1 xsm:p-2 md:p-4">
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
                <div className="h-full order-1 lg:order-3 ">
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
          <section
            className={`${theme === 'light' ? 'bg-gray-100' : 'border-main-black bg-[#111]'} border-t shadow-lg`}>
            <Footer />
          </section>
        </div>
      </section>
    </>
  );
}

interface SearchInputProps {
  query: string;
  handleUserSearch: (e: FormEvent, value: string) => void;
}

const SearchInput = ({ query, handleUserSearch }: SearchInputProps) => {
  const [userSearchInput, setUserSearchInput] = useState<string>(query);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      handleUserSearch(e, userSearchInput);
    },
    [userSearchInput, handleUserSearch]
  );
  const { theme } = useContext(ThemeContext)
  const show = true
  return (

    <>
      <div style={{
        border: `1px solid ${theme === 'light' ? '#E1E1E1' : '#4a4a4a'}`, borderRadius: '3px'
      }} className={`flex ${show ? 'xsm:flex' : 'xsm:hidden'} w-full sm:flex ${theme === 'light ' ? 'bg-white' : 'bg-[#4A4A4A]'} items-center mb-4 overflow-hidden`}>
        <form onSubmit={onSubmit} className={`${theme === 'light' ? 'bg-[#fff]' : 'bg-[#222] '} flex items-center flex-1`}>
          <div className={`${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'} pl-3`}>
            <BsSearch />
          </div>
          <input type="search"
            value={userSearchInput}
            onChange={(e) => setUserSearchInput(e.target.value)}
            name="search"
            aria-label='search'
            className={`${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'}  bg-transparent text-lg flex-1 pr-2 outline-none pl-3 w-[90%]`}
            placeholder='Type something here...'
          />
          <button style={{ borderRadius: ' 0px 3px 3px 0px' }} type='submit' className='font-khand-headers xsm:px-4 md:px-6 transition duration-300 relative z-50 bg-[#4A4A4A] hover:bg-[#333] leading-[16px] py-2.5 text-white text-[15px] font-md'>
            Search
          </button>
        </form >
      </div >
      {/* <form onSubmit={onSubmit} className="text-center my-8">
        <div className="text-[#919191] font-semibold text-xs uppercase -mb-2">Showing results for:</div>
        <div className="w-full px-6 md:px-0 md:w-[60%] mx-auto relative">
          <input
            type="text"
            value={userSearchInput}
            onChange={(e) => setUserSearchInput(e.target.value)}
            className="text-3xl md:text-[41px] text-[#111111] font-medium focus:outline-none focus:border-gray-400 font-khand-headers mt-8 border-b w-full"
          />
          <button className="absolute bottom-2 right-6 md:bottom-4 md:right-4">
            <RiSearchLine className="w-5 h-5 md:w-8 md:h-8" />
          </button>
        </div>
      </form> */}

    </>

  );
};


export async function getStaticProps() {
  const featuredArticles = await fetcher(GRAPHQL_QUERIES.FEATURED_ARTICLES);
  // const newsAndRumors = await fetcher(
  //   GRAPHQL_QUERIES.NEWS_AND_RUMORS_ARTICLES()
  // );
  // const ppvArticle = await fetcher(GRAPHQL_QUERIES.PAY_PER_VIEW_ARTICLE);
  // const resultsData = await fetcher(GRAPHQL_QUERIES.RESULTS_ARTICES);
  // const seoData = await fetcher(GRAPHQL_QUERIES.GET_PAGE_HEAD_SEO('27920'));

  const { specialEvents, youtubeVideoIds, ppvResults, currentChapions, MatchCardWWE
  } =
    await GoogleSheetsService.getSpreadSheetData();
  const resultsData = await fetcher(GRAPHQL_QUERIES.RESULTS_ARTICES);
  const seoData = await fetcher(GRAPHQL_QUERIES.GET_PAGE_HEAD_SEO('27920'));
  return {
    props: {
      specialEvents,
      youtubeVideoIds,
      resultsData,
      seoData,
      featuredArticles,
      MatchCardWWE,
      ppvResults, currentChapions,
    },

    revalidate: 60 * 30, //30 minutes
  };
}
export default Search;
