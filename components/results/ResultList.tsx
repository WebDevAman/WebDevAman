import React, { useContext, useEffect } from 'react';
import Skeleton from '../common/Skeleton';
import useFormatNewsItemData from '../../hooks/useFormatNewsItemData';
import Pagination from '../common/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import truncateString from '../../utils/helpers/truncateString';
import request from 'graphql-request';
import { useMemo } from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import useSWROptions from '../../utils/constants/useSWROptions';
import { useRouter } from 'next/router';
import { ThemeContext } from '../context/themeContext';
import NewsBadge from '../common/NewsBadge';
import { ScrollContext } from '../context/scrollContext';

const RESULT_PER_PAGE = 10;

interface ResultListProps {
  query: (offset: number) => string;
  emptyResultsLabel?: string;
}

const fetcher = (query: string) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);

function ResultList({ query, emptyResultsLabel }: ResultListProps) {
  const [offset, setOffset] = useState<number>(0);

  const {
    data: resultData,
    error: featuredArticlesError,
    isValidating,
  } = useSWR(query(offset), fetcher, useSWROptions);

  const hasMore = resultData?.posts.pageInfo.offsetPagination.hasMore;
  const hasPrevious = resultData?.posts.pageInfo.offsetPagination.hasPrevious;
  const total = resultData?.posts.pageInfo.offsetPagination.total;
  console.log(
    '🚀 ~ file: ResultList.tsx ~ line 34 ~ ResultList ~ hasMore',
    hasMore
  );
  console.log(
    '🚀 ~ file: ResultList.tsx ~ line 35 ~ ResultList ~ hasPrevious',
    hasPrevious
  );
  console.log(
    '🚀 ~ file: ResultList.tsx ~ line 35 ~ ResultList ~ total',
    total
  );

  const totalPages = useMemo(() => {
    return Math.ceil(total / RESULT_PER_PAGE);
  }, [total]);

  const actualPage = useMemo(() => {
    return offset / RESULT_PER_PAGE + 1;
  }, [offset]);

  const onClickNext = () => {
    window.scrollTo(0, 0);
    setOffset((prev) => prev + RESULT_PER_PAGE);
  };

  const onClickPrevious = () => {
    setOffset((prev) => prev - RESULT_PER_PAGE);
  };
  const { theme } = useContext(ThemeContext)



  return (
    <>
      <div className={`${theme === 'light' ? 'bg-[e4e4e4]' : 'bg-dark-black'}  lg:grid grid-cols-6 mb-8 }`}>
        <main className="col-span-8 px-1 space-y-[0.3rem]">
          {!isValidating
            ? resultData?.posts.edges.map((newsData: any, i: number) => (
              <ResultItem offset={offset} key={i} data={newsData.node} isLoading={false} />
            ))
            : new Array(12)
              .fill('1')
              .map((x, i) => <ResultItem key={i} isLoading />)}

          {!isValidating &&
            resultData &&
            resultData.posts.edges.length === 0 && (
              <h2 className="font-medium text-3xl">
                {emptyResultsLabel || 'No post found.'}
              </h2>
            )}
        </main>
      </div>
      <div className="px-4 mt-6 flex justify-center w-full lg:px-0">

        <button
          onClick={onClickNext}
          className="w-fit uppercase mx-auto hover:bg-[#ce061e] hover:text-[#fff] hover:border-[#ce061e] rounded-sm md:rounded-md text-[#767676] pt-1 pb-0.5 md:pt-2 md:pb-1 font-khand-headers border px-4 border-[#767676] font-semibold text-[12px] md:text-[16px]"
        >
          Load more
        </button>
      </div>
    </>
  );
}

interface ResultItemProps {
  data?: { [key: string]: any };
  isLoading: boolean;
  offset?: Number;
}

function ResultItem({ data, offset, isLoading }: ResultItemProps) {
  const { setScrollToTop } = useContext(ScrollContext)
  console.log('🚀 ~ file: ResultList.tsx ~ line 107 ~ ResultItem ~ data', data);
  const [categoryName, postPreview, srcSetImage] = useFormatNewsItemData(
    3,
    data
  );
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const [category, setCategory] = useState('')
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCategory(window.location.pathname?.split('/')[1])
    }
  }, [router.pathname])


  const firstSlug = router.pathname.split('/')[1]
  const queries = `?source=${firstSlug === 'search' ? 'searchPage' :
    router.query?.source === 'searchPage' ? 'searchPage' : firstSlug === 'author' ? 'authorPage' : router.query?.source === 'author' ? 'authorPage' : firstSlug === 'tag' ? 'tagPage' : router.query.source === 'tag' ? 'tagPage' : 'categoryPage'}&&${firstSlug === 'search' ?
      `query=${router.query.q != undefined ? router.query.q : router.query.query}` : router.query?.source === 'searchPage' ?
        `query=${router.query.q != undefined ? router.query.q : router.query.query}` :
        firstSlug === 'author' ?
          `author=${firstSlug != undefined ? firstSlug : router.query.author}` : router.query?.source === 'authorPage' ?
            `author=${router.query.author != undefined ? router.query.author : router.query.author}` :
            firstSlug === 'tag' ?
              `tag=${firstSlug != undefined ? firstSlug : router.query.tag}` : router.query?.source === 'tagPage' ?
                `tag=${router.query.tag != undefined ? router.query.tag : router.query.tag}` :
                `category=${firstSlug != undefined && category}`}`
  return (
    <article onClick={() => setScrollToTop(true)} className={`flex items-center bg-white xsm:p-2 md:p-3 rounded-md overflow-hidden ${theme === 'light' ? 'shadow-postLight text-[#222] bg-[#fff]' : 'shadow-postDark bg-light-black text-[#efefef] '}`}>
      <Link href={data?.uri + queries || '#'}>
        <div className="overflow-hidden rounded-[4px] min-h-[70px] md:min-h-[120px] flex-[2.5] lg:flex-[2.7] 3xl:flex-[0.25] h-full w-full">
          {!isLoading && srcSetImage ? (
            <img className="object-cover min-h-[70px] min-w-[100px] w-full md:min-h-[120px] h-[120%]" alt={data?.featuredImage.node.altText} src={srcSetImage} />
          ) : (
            <Skeleton className="inset-0 !rounded-none min-h-[70px] md:min-h-[120px]" />
          )}
        </div>
      </Link>
      <div className="flex-[7.5] lg:flex-[7.3] 3xl:flex-[0.75]  flex flex-col pl-2 md:pl-4">
        <div className="flex mb-1 items-center">
          {!isLoading ? (
            <>
              {categoryName && <NewsBadge small={false} text={categoryName} />}
            </>
          ) : (
            <Skeleton width={60} height={20} />
          )}
        </div>
        <h3
          style={{ textDecorationColor: '#ce061e !important' }}
        >
          <Link href={data?.uri + queries || '#'}>
            <a
              style={{ textDecorationColor: '#ce061e !important' }}
              className="block text-[#111111] text-xl sm:text-[28px] hover:underline leading-5 sm:leading-7 font-bold">
              {!isLoading ? (
                <span
                  style={{ textDecorationColor: '#ce061e' }}
                  className={`leading-[18px] 2xl:w-[90%]  cursor-pointer sm:leading-[25px] hover:underline tracking-[0.32px] xsm:tracking-normal text-[16px] md:text-[20px] font-semibold ${theme === 'light' ? " text-[#333]" : 'text-white'}`}>{truncateString(data?.title, 85)}</span>
              ) : (
                <Skeleton />
              )}
            </a>
          </Link>
        </h3>
        <p

          className={`text-md leading-[21px] tracking-[-0.9px] text-[13px] 2xl:w-[100%] mt-1 flex-col hidden md:flex lg:hidden 3xl:flex flex-1 leading-4 ${theme === 'light' ? "text-[#767676]" : 'text-[#c6c6c6]'
            }`}
        >
          {!isLoading ? <span>{postPreview}</span> : <Skeleton count={3} />}
        </p>
        <p

          className={`text-md leading-[21px] tracking-[-0.9px] text-[13px] 2xl:w-[100%] mt-1 flex-col hidden lg:flex 3xl:hidden flex-1 leading-4 ${theme === 'light' ? "text-[#767676]" : 'text-[#c6c6c6]'
            }`}
        >
          {!isLoading ? <span>{postPreview.slice(0, 90)}...</span> : <Skeleton count={3} />}
        </p>


      </div>
    </article>
  );
}

export default ResultList;
