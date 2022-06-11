import React from "react";
import ReactPlayer from "react-player/lazy";

interface FeaturedVideoProps {
  videoUrl: string;
}
function FeaturedVideo({ videoUrl }: FeaturedVideoProps) {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <ReactPlayer url={videoUrl} width="100%" height="100%" />
    </div>
  );
}

export default FeaturedVideo;
