import parse, { domToReact, HTMLReactParserOptions } from "html-react-parser";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import getRandomInt from "../../utils/helpers/getRandomInt";
import { Element } from "domhandler/lib/node";
import Ad from "../common/Ad";
import { ThemeContext } from "../context/themeContext";
import '@wordpress/block-library/build-style/common.css'
import '@wordpress/block-library/build-style/theme.css'
import '@wordpress/block-library/build-style/style.css'

interface ArticleContentProps {
  contentData: string;
  template: 1 | 2;
}

const ArticleContent: FC<ArticleContentProps> = ({ contentData, template }) => {
  const numParsedParagraphs = useRef(0);
  const { theme } = useContext(ThemeContext)
  const [styles, setStyles] = useState(null)


  const change = useRef(3);
  const content = React.useMemo(() => {
    const parserOpts: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode?.attribs) {
          if (template === 2) {
            if (domNode.name === "script" && domNode?.attribs?.src === "https://platform.twitter.com/widgets.js") {
              return <></>;
            }
            if (domNode.name === "h2") {
              const index1 = getRandomInt(0, 100000);
              const index2 = getRandomInt(0, 100000);
              return (
                <>
                  <div className="justify-center items-center my-4 flex md:hidden">
                    <Ad adId="ww_mob_g_1" index={index1} />
                  </div>
                  <div className="justify-between items-center my-4 hidden md:flex">
                    <Ad adId="ww_g_ic_1" index={index1} />
                    <Ad adId="ww_g_ic_2" index={index2} />
                  </div>
                  <h2>{domToReact(domNode.childNodes, parserOpts)}</h2>
                </>
              );
            }
          } else if (template === 1) {
            if (
              ["p", "figure", "blockquote", "iframe"].includes(domNode.name) &&
              !domNode.attribs.class?.includes("twitter")

            ) {
              numParsedParagraphs.current++;
              if (numParsedParagraphs.current % 3 === 0) {
                const index = getRandomInt(0, 100000);
                return (
                  <>
                    <div className="justify-center items-center my-4 flex md:hidden">
                      <Ad adId="ww_mob_a_2" index={index} />
                    </div>
                    <p className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef]'}`}>{domToReact(domNode.childNodes, parserOpts)}</p>
                  </>
                );
              }

              if (numParsedParagraphs.current % change.current === 0) {
                const index = getRandomInt(0, 100000);
                change.current = change.current === 4 ? 3 : 4;
                return (
                  <>
                    <div className="justify-center items-center my-4 hidden md:flex">
                      <Ad adId="ww_a_ic_1" index={index} />
                    </div>
                    <p className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef]'}`}>{domToReact(domNode.childNodes, parserOpts)}</p>
                  </>
                );
              }
            }
          }
        }
      },
    };
    return parse(contentData, parserOpts);
  }, [contentData, template, theme]);



  useEffect(() => {
    if (content) {
      const hasTwitterEmbeds = document.querySelectorAll(".twitter-tweet").length > 0;
      if (hasTwitterEmbeds) {
        const isScriptExist = document.getElementById("twitter-embed");

        //@ts-ignore
        const { twttr } = window;
        twttr && twttr.widgets.load();

        if (!isScriptExist) {
          const s = document.createElement("script");
          s.setAttribute("src", "https://platform.twitter.com/widgets.js");
          s.setAttribute("id", "twitter-embed");
          s.setAttribute("async", "true");
          s.setAttribute("data-link-color", "red");
          document.head.appendChild(s);
        }
      }
    }
  }, [content, theme]);

  return <article
    className={`${theme === 'light' ? 'text-[#222]' : "text-[#cacaca]"} text-xs small main-article mt-5  sm:px-0`
    }> {content}</article>;
};

export default ArticleContent;
