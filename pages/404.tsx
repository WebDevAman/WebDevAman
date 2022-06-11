import React from "react";
import PageWrapper from "../components/privacy-contact-abous/PageWrapper";
import Link from "next/link";

function Page404() {
  return (
    <PageWrapper title="Page not Found" noTitle>
      <div className="text-center space-y-6 py-8">
        <p className="font-khand-headers text-4xl sm:text-5xl lg:text-6xl font-semibold">
          Yowie! Wowie!
          <br />
          Let Me In!
        </p>
        <h1 className="text-xl font-medium text-gray-500">404 - Page not found.</h1>
        <Link href="/">
          <a className="inline-block uppercase text-white bg-main hover:bg-main-black transition-colors px-9 py-5 text-xs font-medium rounded-md">
            return to homepage
          </a>
        </Link>
      </div>
    </PageWrapper>
  );
}

export default Page404;
