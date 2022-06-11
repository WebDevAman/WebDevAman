import { useEffect, useRef } from "react";

interface AdSlot {
  mapping: { [any: number]: number[] };
  sizes: Array<[number, number]>;
  id: string;
  isTransitioning: boolean;
  index?: number;
}

export function useAdSlot({ mapping, sizes, id, isTransitioning, index }: AdSlot) {
  useEffect(() => {
    if (!isTransitioning && typeof window !== undefined) {
      const divId = `div-gpt-ad-${id}_${index || 0}`;
      //@ts-ignore
      const { googletag } = window;
      googletag.cmd.push(function () {
        const adMapping = googletag.sizeMapping();
        Object.keys(mapping).forEach((breakpoint) => {
          adMapping.addSize([Number(breakpoint), 0], [...mapping[Number(breakpoint)]]);
        });
        const builtMapping = adMapping.build();

        googletag
          .defineSlot(`/21696795696/${id}`, sizes, divId)
          .defineSizeMapping(builtMapping)
          .addService(googletag.pubads());
        googletag.enableServices();
      });

      googletag.cmd.push(function () {
        googletag.display(divId);
      });
    }
  }, [mapping, sizes, id, isTransitioning, index]);
}
