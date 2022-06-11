import React from "react";
import CookieConsent from "react-cookie-consent";

function CookieConsentFooter() {
  return (
    <CookieConsent
      enableDeclineButton
      declineButtonClasses="!text-sm !font-medium !rounded-sm !bg-white !text-gray-600 !border !border-main"
      declineButtonText="Reject"
      buttonClasses="!text-sm !font-medium !rounded-sm !bg-main !text-white"
    >
      This website uses cookies to improve your experience. We&apos;ll assume you&apos;re ok with this, but you can
      opt-out if you wish.
    </CookieConsent>
  );
}

export default CookieConsentFooter;
