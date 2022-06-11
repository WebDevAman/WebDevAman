import React, { ReactChild, useContext, useMemo } from "react";
import Footer from "../common/Footer";
import Navbar from "../common/SideNavbar";
import H1 from "./H1";
import Head from "next/head";
import parse from "html-react-parser";
import SideNavbar from "../common/SideNavbar";
import { ThemeContext } from "../context/themeContext";

function PageWrapper({
  children,
  title,
  noTitle,
  seoData,
}: {
  children: ReactChild;
  title?: string;
  noTitle?: boolean;
  seoData?: { [any: string]: any };
}) {
  const headSeoData = useMemo(() => {
    return seoData ? parse(seoData.page.seo.fullHead) : null;
  }, [seoData]);

  const { theme } = useContext(ThemeContext)
  return (
    <>
      <Head>
        <title>{seoData ? seoData.page.seo.title : `${title} | WrestlingWorld`}</title>
        {headSeoData}
      </Head>
      <section className="flex xsm:flex-col sm:flex-row">
        <SideNavbar />
        <div className={`${theme === 'light' ? 'flex w-full flex-col bg-[#fafafa]' : 'flex w-full  flex-col bg-main-black'}`}>
          <main className="max-w-[1068px] px-3  mx-auto h-full py-16">
            {!noTitle && <H1>{title!}</H1>}
            {children}
          </main>
          <section
            className={`${theme === 'light' ? 'bg-gray-100' : 'border-main-black bg-[#111]'} border-t w-full shadow-lg`}>
            <Footer />
          </section>
        </div>

      </section>

    </>
  );
}

export default PageWrapper;
