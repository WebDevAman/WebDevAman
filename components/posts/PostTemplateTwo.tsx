import React, { useContext } from "react";
import { format } from "date-fns";
import ShareButtons from "./ShareButtons";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import PostTitle from "./PostTitle";
import useFormatNewsItemData from "../../hooks/useFormatNewsItemData";
import ArticleContent from "./ArticleContent";
import { ThemeContext } from "../context/themeContext";
import '@wordpress/block-library/build-style/common.css'
import '@wordpress/block-library/build-style/theme.css'
import '@wordpress/block-library/build-style/style.css'

const Ad = dynamic(() => import("../common/Ad"), { ssr: false });
const PaginationButtons = dynamic(() => import("./PaginationButtons"));
const FeaturedImage = dynamic(() => import("./FeaturedImage"));
const FeaturedVideo = dynamic(() => import("./FeaturedVideo"));

interface PostTemplateTwoProps {
  postData: { [any: string]: any };
  hasPagination: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  actualPage: number;
  index?: number;
}

function PostTemplateTwo({ postData, hasPagination, hasNext, hasPrevious, actualPage, index }: PostTemplateTwoProps) {
  const router = useRouter();
  const [_, __, srcSetImage] = useFormatNewsItemData(5, postData);

  const featuredVideo = postData.featuredVideo.url;
  const authorName =
    postData.author.node.firstName && postData.author.node.lastName
      ? `${postData.author.node.firstName} ${postData.author.node.lastName}`
      : postData.author.node.name;

  const { theme } = useContext(ThemeContext)
  return (
    <>
      <div className={`${theme === 'light' ? 'shadow-postLight' : 'shadow-postDark'} flex  flex-col `}>
        {/* ADV Left */}
        {/* <div className="hidden lg:block w-full relative">
          <div className="w-full sticky top-0 flex flex-col items-center space-y-[10px]">
            <Ad adId="ww_g_sb_1" className="mt-4" index={index} />
            <Ad adId="ww_g_sb_3" className="mt-4" index={index} />
          </div>
        </div> */}
        {/* POST */}
        <main className={`mb-8 sm:shadow-post noscrollbar sm:rounded-[3px] py-4 leading-[1.1] xl:min-w-[630px] max-w-[700px] px-[10px] md:px-[50px] mx-auto ${theme === 'light' ? 'bg-white text-[#111]' : 'bg-light-black !text-[#fff]'}`}>
          <div className="pl-[15px] sm:px-0">
            <PostTitle>{postData.title}</PostTitle>
          </div>
          <div className="flex pl-4 space-x-4 font-quattrocento-sans text-[13px] mt-2 sm:px-0">
            {authorName && (
              <div>
                By{" "}
                <Link href={postData.author.node.uri}>
                  <a className="font-bold px-1 cursor-pointer">{authorName}</a>
                </Link>
              </div>
            )}
            <time>{format(new Date(postData.date), "LLLL d, yyy")}</time>
          </div>
          <div className="mt-5 px-2">
            {featuredVideo ? (
              <FeaturedVideo videoUrl={featuredVideo} />
            ) : (
              <FeaturedImage imageData={postData.featuredImage} imageUrl={srcSetImage} />
            )}
            <div className="mt-8 mb-4 sm:px-[40px]">
              <ShareButtons url={`https://wrestlingworld.co${router.asPath}`} photoUrl={srcSetImage} />
            </div>
            {postData.content && (
              <div className="px-2">
                <ArticleContent contentData={postData?.content || ""} template={2} />
                {hasPagination && (
                  <>
                    <div className="justify-center items-center my-4 flex md:hidden">
                      <Ad adId="ww_mob_g_2" index={index} />
                    </div>
                    <div className="justify-between items-center my-4 hidden md:flex">
                      <Ad adId="ww_g_ic_3" index={index} />
                      <Ad adId="ww_g_ic_4" index={index} />
                    </div>
                    <PaginationButtons
                      uri={postData.uri}
                      actualPage={actualPage}
                      hasNext={hasNext}
                      hasPrevious={hasPrevious}
                    />

                  </>
                )}
                <div className="mt-8 mb-4 sm:px-[40px]">
                  <ShareButtons url={`https://wrestlingworld.co${router.asPath}`} photoUrl={srcSetImage} />
                </div>
              </div>
            )}
          </div>
          <div className="justify-center items-center my-4 flex md:hidden">
            <Ad adId="ww_mob_g_3" index={index} />
          </div>
          <div className="justify-between items-center mt-4 hidden md:flex">
            <Ad adId="ww_g_ic_5" index={index} />
            <Ad adId="ww_g_ic_6" index={index} />
          </div>
        </main>
        {/* ADV Right */}
        {/* <div className="hidden lg:block w-full relative">
          <div className="w-full sticky top-0 flex flex-col items-center space-y-[10px]">
            <Ad adId="ww_g_sb_2" className="mt-4" index={index} />
            <Ad adId="ww_g_sb_4" className="mt-4" index={index} />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default PostTemplateTwo;
