//@ts-ignore
// log the pageview with their URL
export const pageview = (url) => {
  //@ts-ignore
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};
