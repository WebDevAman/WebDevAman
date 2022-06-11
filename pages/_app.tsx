import type { AppProps } from "next/app";
import { createContext, useContext } from 'react';
import NProgress from "nprogress";
import Router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Script from "next/script";
import "../styles/nprogress.css";
import { DefaultSeo } from 'next-seo';
import "../styles/globals.css";
import { FC, useEffect, useRef } from "react";
import { pageview } from "../utils/helpers/googleAnalytics";
import { ManagedUIContext, useUI } from "../components/context";
import ThemeProvider from "../components/context/themeContext";
import ScrollProvider from "../components/context/scrollContext";
import MatchProvider from "../components/context/rightSectionData";

const TopProgressBar = dynamic(
  () => {
    return import("../components/common/TopProgressBar");
  },
  { ssr: false }
);

const CookieConsentFooter = dynamic(
  () => {
    return import("../components/common/CookieConsentFooter");
  },
  { ssr: false }
);

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
          `,
        }}
      />
      <Script
        data-ad-client="ca-pub-2076812817349157"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />

      <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
              var googletag = googletag || {}; 
              googletag.cmd = googletag.cmd || [];
          `,
        }}
      />

      <TopProgressBar />
      <ManagedUIContext>
        <TransitionHandler>
          <ThemeProvider>
            <ScrollProvider>
              <MatchProvider>
                <DefaultSeo
                  title="Wrestling World"
                  description="latest wwe news , rumours ,results and more,WWE ,WWE RAW, WWE smackdown,wrestlemania"

                  openGraph={{
                    type: 'website',
                    locale: 'en_US',
                    url: 'https://api.wrestlingworld.co/wp-content/uploads/2022/02/wwe-3-696x392.jpg',
                    site_name: 'Wrestling World',
                    description: "Latest wwe news , rumours , results with videos clips and feeds make your mind goo crazy!!!!!"
                  }}

                  twitter={{
                    // handle: '@handle',
                    // site: '@site',
                    cardType: 'summary_large_image',
                  }}
                />
                <Component {...pageProps} />
              </MatchProvider>
            </ScrollProvider>
          </ThemeProvider>
        </TransitionHandler>
      </ManagedUIContext>
      <CookieConsentFooter />
    </>
  );
}

const TransitionHandler: FC = ({ children }) => {
  const router = useRouter();
  const { setIsTransitioning, isTransitioning } = useUI();

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && isTransitioning) {
      setIsTransitioning(false);
    }
  }, [isTransitioning, setIsTransitioning]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string, { shallow }: { shallow: boolean }) => {
      setIsTransitioning(true);
      // destroy all ad slots
      if (!shallow && !firstRender.current) {
        //@ts-ignore
        const { googletag } = window;
        googletag.cmd.push(function () {
          googletag.destroySlots();
        });
      }
      firstRender.current = false;
    };

    const handleRouteChangeComplete = (url: string) => {
      setIsTransitioning(false);
      pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events, setIsTransitioning]);
  return <>{children}</>;
};

export default MyApp;