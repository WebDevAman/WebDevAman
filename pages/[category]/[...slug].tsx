import request from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import GRAPHQL_QUERIES from '../../services/GraphQLQueries';
import Head from 'next/head';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import parse from 'html-react-parser';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { Waypoint } from 'react-waypoint';
import { useRouter } from 'next/router';
import { getCookie, getCookies } from 'cookies-next';
import SideNavbar from '../../components/common/SideNavbar';
import MainImageNews from '../../components/home/MainImageNews';
import SectionTitle from '../../components/home/SectionTitle';
import NewsItem from '../../components/home/NewsItem';
import FooterNews from '../../components/home/FooterNews';
import GoogleSheetsService from '../../services/GoogleSheetsServices';
import SearchBar from '../../components/home/SearchBar';
import { ThemeContext } from '../../components/context/themeContext';
import ResultList from '../../components/results/ResultList';
import { useCallback } from "react";
import { ScrollContext } from '../../components/context/scrollContext';

const Ad = dynamic(() => import('../../components/common/Ad'), { ssr: false });
const LoadingSpinner = dynamic(
  () => import('../../components/common/LoadingSpinner')
);
const PostTemplateOne = dynamic(
  () => import('../../components/posts/PostTemplateOne')
);
const PostTemplateTwo = dynamic(
  () => import('../../components/posts/PostTemplateTwo')
);
const FooterNewsTemplateTwo = dynamic(
  () => import('../../components/posts/FooterNewsTemplateTwo')
);

interface SlugProps {
  postData: { [any: string]: any };
  hasPagination: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  actualPage: number;
  newsOrRumorsCategory: boolean;
  featuredArticles: { [any: string]: any };
  newsAndRumors: { [any: string]: any };
  newsAndRumorsForHome: { [any: string]: any };
  ppvArticle: { [any: string]: any };
  resultsData: { [any: string]: any };
  specialEvents: Array<string>;
  youtubeVideoIds: Array<string>;
  seoData: { [any: string]: any };
  categoryData: { [any: string]: any };
}

const fetcher = (query: string) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);

function Slug({
  postData,
  newsOrRumorsCategory,
  actualPage,
  hasPagination,
  hasNext,
  hasPrevious,
  newsAndRumorsForHome,
  seoData, categoryData
}: SlugProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextPosts, setNextPosts] = useState<Array<{ [any: string]: any }>>([]);
  const router = useRouter();

  const { data: newsAndRumors, error: newsAndRumorsError } = useSWR(
    !newsOrRumorsCategory ? GRAPHQL_QUERIES.NEWS_AND_RUMORS_ARTICLES(8) : null,
    fetcher
  );

  const loadMoreArticle = async () => {
    if (typeof window != 'undefined' && window.screen.width <= 700) {
      setIsLoading(true);
      const lastPostId =
        nextPosts.length > 0
          ? nextPosts[nextPosts.length - 1].databaseId
          : postData.databaseId;
      const cursor = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
        GRAPHQL_QUERIES.GET_POST_CURSOR(lastPostId)
      );
      if (cursor) {
        const { posts: nextPost } = await request(
          process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
          GRAPHQL_QUERIES.GET_NEXT_POST(cursor.posts.pageInfo.endCursor)
        );
        const postContentArray =
          nextPost.nodes[0].content?.split('<!--nextpage-->');
        if (postContentArray && postContentArray.length > 1) {
          nextPost.nodes[0].hasPagination = true;
          nextPost.nodes[0].hasNext = true;
          nextPost.nodes[0].content = postContentArray[0];
        }
        setNextPosts((prev) => [...prev, nextPost.nodes[0]]);
      }
      setIsLoading(false);
    }
  };
  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false);
  const [actualCursor, setActualCursor] = useState('');
  const [totalNewsAndRumors, setTotalNewsAndRumors] = useState<Array<any>>([]);
  const { theme, setTheme, show, setShow } = useContext(ThemeContext)

  useEffect(() => {
    if (newsAndRumorsForHome && totalNewsAndRumors.length === 0) {
      setTotalNewsAndRumors(newsAndRumorsForHome.posts.edges);
      setActualCursor(newsAndRumorsForHome.posts.pageInfo.endCursor);
    }
  }, [newsAndRumorsForHome, totalNewsAndRumors]);

  const isScreenSmallSize = useMediaQuery(1023);

  const handleLoadMoreNews = () => {
    if (!newsAndRumorsForHome) return;
    setIsLoadingMoreNews(true);
    request(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      GRAPHQL_QUERIES.LOAD_MORE_NEWS_AND_RUMORS_ARTICLES(
        actualCursor || newsAndRumorsForHome.posts.cursor
      )
    ).then((data) => {
      if (data) {
        setTotalNewsAndRumors([...totalNewsAndRumors, ...data.posts.edges]);
        setActualCursor(data.posts.pageInfo.endCursor);
        setIsLoadingMoreNews(false);
      }
    });
  };

  const Router = useRouter()
  const [query, setQuery] = useState<string>((router.query.query) as string)

  const dbQuery = useCallback(
    (offset: number) => {
      return GRAPHQL_QUERIES.SEARCH_POSTS(query, offset);
    },
    [query]
  );

  useEffect(() => {
    if (totalNewsAndRumors.length > 0) {
      setTotalNewsAndRumors(totalNewsAndRumors?.filter(data => data?.uri?.split('/')[0] === router.pathname.split('/')[0]))
    }
  }, [])

  const [url, setUrl] = useState('')
  const articleRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollToTop } = useContext(ScrollContext)

  useEffect(() => {
    if (typeof window != 'undefined') {
      setUrl(window.location.href)
    }
  })
  useEffect(() => {
    if (articleRef.current !== undefined) {
      articleRef.current.scrollIntoView()
    }
  }, [scrollToTop, url.length, url])

  const changeBrowserURL = (url: string) => {
    // router.replace(url, undefined, { shallow: true });
  };

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!newsOrRumorsCategory) return;
      const maxPosScrollPage = -(
        document.body.scrollHeight - window.innerHeight
      );
      if (currPos.y <= maxPosScrollPage + 600 && !isLoading) {
        loadMoreArticle();
      }
    },
    [isLoading]
  );

  const fullHead = useMemo(() => {
    return parse(postData?.seo.fullHead);
  }, [postData]);

  return (
    <>
      <Head>
        <title>{postData?.seo.title}</title>
        {fullHead}
      </Head>
      {/* <Navbar /> */}
      <section className="flex xsm:flex-col sm:flex-row">
        <SideNavbar />

        <div className={`${theme === 'light' ? 'flex w-full flex-col bg-[#fafafa]' : 'flex w-full  flex-col bg-main-black'}`}>
          <main className={`flex-1 w-full flex m-auto xl:flex-row xl:max-w-full max-w-[820px] flex-col ${theme === 'light' ? "bg-[#fafafa]" : "bg-main-black"}`}>
            {router.query && router.query.source === 'searchPage' && router.query.query ?
              <section className="flex-[0.95]  xsm:hidden xl:flex flex-col w-full  xsm:p-2 md:p-4">
                <div className="max-w-[800px] mt-4 pl-2">
                  <SearchBar />
                  <ResultList query={dbQuery} emptyResultsLabel="No posts to display" />
                </div>
              </section>
              : router.query && router.query.source === 'categoryPage' && router.query.category ?
                <section className="flex-[0.95]  xsm:hidden xl:flex flex-col w-full  xsm:p-2">
                  <div className="max-w-[800px] mt-4 pl-2">
                    <SearchBar />
                    <ResultList
                      query={(offset: number) =>
                        GRAPHQL_QUERIES.GET_CATEGORY_POSTS(categoryData.databaseId, offset)
                      }
                    />
                  </div>
                </section>
                : (
                  <section className="flex-[0.95]  xsm:hidden xl:flex flex-col w-full  xsm:p-1 md:p-4 xl:p-2 3xl:p-4">
                    <SearchBar />
                    {/* Latest wrestling news & rumors */}
                    <div className="order-2  lg:mt-8 pt-5 lg:mt-0">
                      <section>
                        <div className="lg:grid grid-cols-1 space-y-2.5 lg:space-y-0 gap-x-2 gap-y-4 xsm:px-2 lg:px-4 lg:px-0">
                          <ResultList
                            query={(offset: number) =>
                              GRAPHQL_QUERIES.GET_CATEGORY_POSTS(categoryData.databaseId, offset)
                            }
                          />
                        </div>
                      </section>
                    </div>
                  </section>
                )}
            <section className={`newsPage flex-[1.15] h-screen overflow-y-scroll sticky inset-0 mt-2 mt-2 md:mt-4 max-w-fit `}>
              <div className="xsm:flex justify-center md:hidden">
                <SearchBar />
              </div>
              <div ref={articleRef} className={` max-w-fit rounded-md  mx-auto flex items-center flex-col`}>
                {newsOrRumorsCategory ? (
                  <>
                    <Waypoint onEnter={() => changeBrowserURL(postData.uri)}>
                      <div>
                        <PostTemplateOne
                          postData={postData}
                          actualPage={actualPage}
                          hasPagination={hasPagination}
                          hasNext={hasNext}
                          hasPrevious={hasPrevious}
                        />
                      </div>
                    </Waypoint>
                    {nextPosts.map((post, i) => (
                      <>
                        <div className="items-center mx-auto justify-center hidden md:flex">
                          <Ad adId="ww_a_ic_2" index={i + 1} />
                        </div>
                        <Waypoint
                          onEnter={() => changeBrowserURL(post.uri)}
                          key={`${post.slug} ${i}`}
                        >
                          <div>
                            {post.categories.edges.find(
                              (category: any) => category.isPrimary
                            ).node.name === 'News' ||
                              post.categories.edges.find(
                                (category: any) => category.isPrimary
                              ).node.name === 'Rumors' ? (
                              <PostTemplateOne
                                postData={post}
                                actualPage={1}
                                hasPagination={post.hasPagination}
                                hasNext={post.hasNext}
                                hasPrevious={false}
                                index={i + 1}
                              />
                            ) : (
                              <PostTemplateTwo
                                postData={post}
                                actualPage={1}
                                hasPagination={post.hasPagination}
                                hasNext={post.hasNext}
                                hasPrevious={false}
                                index={i + 1}
                              />
                            )}
                          </div>
                        </Waypoint>
                      </>

                    ))}
                    {isLoading &&
                      <div
                        className={`flex justify-center ${isLoading ? 'my-8 visible' : 'invisible'
                          }`}
                      >
                        <LoadingSpinner />
                      </div>}

                  </>
                ) : (
                  <>
                    <PostTemplateTwo
                      postData={postData}
                      actualPage={actualPage}
                      hasPagination={hasPagination}
                      hasNext={hasNext}
                      hasPrevious={hasPrevious}
                    />
                  </>
                )}
              </div>
            </section>
          </main>
          <section
            className={`${theme === 'light' ? 'bg-gray-100' : 'border-main-black bg-[#111]'} border-t shadow-lg`}>
            {/* 
            {!newsOrRumorsCategory && (
              <FooterNewsTemplateTwo newsData={newsAndRumors} />
            )} */}

            <Footer />
          </section>
        </div>
      </section>

    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts: postsLists } = await request(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    GRAPHQL_QUERIES.GET_URI_POSTS
  );

  let paths: (
    | string
    | {
      params: any;
      locale?: string | undefined;
    }
  )[] = [];




  postsLists.nodes.forEach(({ uri, content }: { [any: string]: any }) => {
    const [_, category, slug] = uri.split('/');
    console.log(slug)
    const postContentArray = content.split('<!--nextpage-->');
    paths.push({ params: { category, slug: [slug] } });

    if (postContentArray.length >= 2) {
      for (let i = 2; i <= postContentArray.length; i++) {
        paths.push({ params: { category, slug: [slug, i.toString()] } });
      }
    }
  });
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //@ts-ignore
  const { category, slug: slugArr } = params;
  const [slug, number] = slugArr;
  if (slugArr.length > 2) {
    return {
      notFound: true,
    };
  }
  const numPaginationPost = parseInt(number);
  const { post } = await request(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    GRAPHQL_QUERIES.GET_POST(slug)
  );

  let hasPagination = false;
  let hasPrevious = false;
  let hasNext = false;
  let actualPage =
    !isNaN(numPaginationPost) && Boolean(numPaginationPost)
      ? numPaginationPost
      : 1;

  if (!post) {
    return {
      notFound: true,
    };
  }
  const postContentArray = post.content?.split('<!--nextpage-->');

  if (postContentArray) {
    if (postContentArray.length > 1) {
      hasPagination = true;
      if (actualPage < postContentArray.length) {
        hasNext = true;
      }
      if (actualPage && actualPage > 1) {
        hasPrevious = true;
      }
    }
    post.content = postContentArray[actualPage - 1];
  }

  const featuredArticles = await fetcher(GRAPHQL_QUERIES.FEATURED_ARTICLES);
  const newsAndRumorsForHome = await fetcher(
    GRAPHQL_QUERIES.NEWS_AND_RUMORS_ARTICLES()
  );
  const ppvArticle = await fetcher(GRAPHQL_QUERIES.PAY_PER_VIEW_ARTICLE);
  const resultsData = await fetcher(GRAPHQL_QUERIES.RESULTS_ARTICES);
  const seoData = await fetcher(GRAPHQL_QUERIES.GET_PAGE_HEAD_SEO('27920'));

  const categorySlug = params!.category as string;

  const { categories } = await request(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    GRAPHQL_QUERIES.GET_CATEGORY_DATA(categorySlug)
  );
  console.log(
    '🚀 ~ file: index.tsx ~ line 68 ~ constgetStaticProps:GetStaticProps= ~ categories',
    categories
  );

  if (categories.nodes.length === 0) {
    return { notFound: true };
  }


  const { specialEvents, youtubeVideoIds } =
    await GoogleSheetsService.getSpreadSheetData();
  return {
    props: {
      postData: post,
      newsOrRumorsCategory: category === 'news' || category === 'rumors',
      hasPagination,
      hasNext,
      hasPrevious,
      actualPage,
      featuredArticles,
      newsAndRumorsForHome,
      specialEvents,
      youtubeVideoIds,
      ppvArticle,
      resultsData,
      seoData,
      categoryData: categories.nodes[0],
    },
    revalidate: 60 * 60, // one hour
  };
};




export default Slug;
