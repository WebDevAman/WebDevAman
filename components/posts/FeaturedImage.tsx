import React from "react";
import Image from "next/image";

interface FeaturedImageProps {
  imageData: { [any: string]: any };
  imageUrl: string;
}

function FeaturedImage({ imageData, imageUrl }: FeaturedImageProps) {
  return (
    <div className="relative">
      <div className="aspect-w-16 aspect-h-9  xsm:max-w-[95%] sm:max-w-[100%] mx-auto">
        <Image
          src={imageUrl}
          layout="fill"
          width={'100%'}
          height={'100%'}
          alt={imageData.node.altText}
          title={imageData.node.title}
        />
      </div>

      <p
        dangerouslySetInnerHTML={{ __html: imageData.node.caption }}
        className="absolute bottom-1 left-1 text-xs opacity-60"
      ></p>
    </div>
  );
}

export default FeaturedImage;
