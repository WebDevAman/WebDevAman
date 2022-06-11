import { GetStaticProps } from "next";
import React, { useContext } from "react";
import { fetcher } from ".";
import { ThemeContext } from "../components/context/themeContext";
import H2 from "../components/privacy-contact-abous/H2";
import NextLink from "../components/privacy-contact-abous/Link";
import PrivacyContactAboutUsWrapper from "../components/privacy-contact-abous/PageWrapper";
import GRAPHQL_QUERIES from "../services/GraphQLQueries";

function PrivacyPolicyPage({ seoData }: { seoData: { [any: string]: any } }) {
  const { theme
  } = useContext(ThemeContext)
  return (
    <PrivacyContactAboutUsWrapper seoData={seoData}>
      <div className="space-y-8 leading-7 mt-8">
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>
          <H2>Your privacy is important to us</H2>
          <p>
            WrestlingWorld is committed to ensuring that your privacy is protected. This Privacy Policy applies to
            www.wrestlingworld.co (hereinafter, “us”, “we”, or “www.wrestlingworld.co”). Should we ask you to provide
            certain information by which you can be identified when using this website, then you can be assured that it
            will only be used in accordance with this privacy statement.
          </p>
          <p>
            WrestlingWorld may change this policy from time to time by updating this page. You should check this page
            from time to time to ensure that you are happy with any changes. This policy is effective from Feb 1, 2018
          </p>
        </article>
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>

          <H2>Website Visitors</H2>
          <p>
            Like most website operators, WrestlingWorld collects non-personally-identifying information of the sort that
            web browsers and servers typically make available, such as the browser type, language preference, referring
            site, and the date and time of each visitor request. WrestlingWorld’s purpose in collecting non-personally
            identifying information is to better understand how WrestlingWorld’s visitors use its website. From time to
            time, WrestlingWorld may release non-personally-identifying information in the aggregate, e.g., by
            publishing a report on trends in the usage of its website.
          </p>
          <p>
            WrestlingWorld also collects potentially personally-identifying information like Internet Protocol (IP)
            addresses for logged in users and for users leaving comments on https://www.wrestlingworld.co blog posts.
            WrestlingWorld only discloses logged in user and commenter IP addresses under the same circumstances that it
            uses and discloses personally-identifying information as described below.
          </p>
        </article>
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>

          <H2>Gathering of Personally-Identifying Information</H2>
          <p>
            Certain visitors to WrestlingWorld’s website choose to interact with WrestlingWorld in ways that require
            WrestlingWorld to gather personally-identifying information. The amount and type of information that
            WrestlingWorld gathers depends on the nature of the interaction. For example, we ask visitors who sign up
            for a newsletter at https://www.wrestlingworld.co to provide a username and email address.
          </p>
        </article>
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>

          <H2>Security</H2>
          <p>
            We are committed to ensuring that your information is secure. In order to prevent unauthorized access or
            disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and
            secure the information we collect online.
          </p>
        </article>
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>

          <H2>Advertisements</H2>
          <p>
            Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These
            cookies allow the ad server to recognize your computer each time they send you an online advertisement to
            compile information about you or others who use your computer. This information allows ad networks to, among
            other things, deliver targeted advertisements that they believe will be of most interest to you. This
            Privacy Policy covers the use of cookies by WrestlingWorld and does not cover the use of cookies by any
            advertisers.
          </p>
        </article>
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>

          <H2>Links To External Sites</H2>
          <p>
            Our Service may contain links to external sites that are not operated by us. If you click on a third party
            link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy
            and terms and conditions of every site you visit.
          </p>
          <p>
            We have no control over, and assume no responsibility for the content, privacy policies or practices of any
            third party sites, products or services.
          </p>
        </article>
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>

          <H2>Cookies</H2>
          <p>
            A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree,
            the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular
            site. Cookies allow web applications to respond to you as an individual. The web application can tailor its
            operations to your needs, likes and dislikes by gathering and remembering information about your
            preferences.
          </p>
          <p>
            We use traffic log cookies to identify which pages are being used. This helps us analyze data about web page
            traffic and improve our website in order to tailor it to customer needs. We only use this information for
            statistical analysis purposes and then the data is removed from the system.
          </p>
          <p>
            Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find
            useful and which you do not. A cookie in no way gives us access to your computer or any information about
            you, other than the data you choose to share with us.
          </p>
          <p>
            You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can
            usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full
            advantage of the website.
          </p>
        </article>
        <article className={`${theme === 'light' ? 'text-black' : 'text-white'} space-y-5 leading-7 mt-8`}>

          <H2>Contact Information</H2>
          <p>
            If you have any questions about this Privacy Policy, please{" "}
            <NextLink href="/contact-us">contact us.</NextLink>
          </p>
        </article>
      </div>
    </PrivacyContactAboutUsWrapper>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const seoData = await fetcher(GRAPHQL_QUERIES.GET_PAGE_HEAD_SEO("477"));
  return {
    props: { seoData },
  };
};

export default PrivacyPolicyPage;
