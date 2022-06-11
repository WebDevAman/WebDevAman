import React, { useEffect, useState } from "react";

import { useAdSlot } from "../../hooks/useAdSlot";
import ads from "../../utils/constants/ads";
import { useUI } from "../context";

function Ad({ adId, className, index }: { adId: string; className?: string; index?: number }) {
  const { isTransitioning } = useUI();
  //@ts-ignore
  const ad = ads[adId];

  const divId = `div-gpt-ad-${adId}_${index || 0}`;

  useAdSlot({
    mapping: ad.mapping,
    sizes: ad.sizes,
    id: adId,
    isTransitioning,
    index: index,
  });

  const [domain, setDomain] = useState('localhost')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.hostname)
    }
  }, [])
  console.log(domain)
  return (
    <>
      {domain === 'localhost' ?
        <div className="bg-gray-300 flex items-center w-full h-full justify-center min-h-[300px] mx-1"><h1>This is ad Slot</h1></div>
        :
        <div className={className} id={divId} />

      }
    </>
  );
}

export default Ad;
