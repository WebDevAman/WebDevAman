import React, { Dispatch, SetStateAction, useState, useEffect, useCallback, useContext } from "react";
import { RiPlayFill } from "react-icons/ri";
import Image from "next/image";
import YoutubeServices from "../../services/YoutubeServices";
import parseISO8601Duration from "../../utils/helpers/parseISO8601Duration";
import YoutubePlay from "../common/YoutubePlayIcon";
import getYoutubeThumbnailUrl from "../../utils/helpers/getYoutubeThumbnailUrl";
import { BsPlayFill } from 'react-icons/bs'
import { ThemeContext } from "../context/themeContext";
interface VideoMetadata {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  theme: string;
}

function YoutubePlaylist({ youtubeVideoIds }: { youtubeVideoIds: Array<string> }) {
  const [videoMetadata, setVideoMetadata] = useState<Array<VideoMetadata>>([]);
  const [videoPlaying, setVideoPlaying] = useState<VideoMetadata>();
  const [isClicked, setIsClicked] = useState(false);

  const { theme } = useContext(ThemeContext)
  const handleClick = useCallback(() => {
    setIsClicked(true);
  }, []);
  useEffect(() => {
    async function fetchVideoData() {
      const metadata: Array<VideoMetadata> = [];
      for (let i = 0; i < youtubeVideoIds.length; i++) {
        const id = youtubeVideoIds[i];
        const videoMetadata = await YoutubeServices.getVideoInfoFromId(id);

        // Format duration in ISO8601 to MM:SS
        let duration = "";
        const durationISO = videoMetadata.items[0]?.contentDetails.duration;
        if (durationISO) {
          duration = parseISO8601Duration(durationISO);
        }

        metadata.push({
          id,
          title: videoMetadata.items[0]?.snippet.title || "",
          duration,
          thumbnail: videoMetadata.items[0]?.snippet.thumbnails.default.url || "",
          theme: theme
        });
      }
      setVideoMetadata(metadata);
      setVideoPlaying(metadata[0]);
    }
    fetchVideoData();
  }, [youtubeVideoIds]);

  return (
    <>
      <div className={`overflow-hidden ${theme === 'light' ? 'border-gray-200 text-[#222] bg-[#fff]' : 'border-main-black bg-light-black text-[#efefef] '} flex xsm:flex-col md:flex-row rounded-sm p-1 shadow-md  min-w-[100%]`}>
        <div className="flex-1 flex items-center bg-black justify-center">
          {!isClicked ? (
            <button className="bg-black max-h-[290px]  overflow-hidden block flex flex-col justify-center group relative" aria-label="Play" onClick={handleClick}>
              <Image
                width={512}
                height={290}
                src={getYoutubeThumbnailUrl(videoPlaying?.id || youtubeVideoIds[0], "hqdefault")}
                alt="Embedded youtube"
              />
              <div className="rounded-full text-[#fff] hover:border-[#ce061e] border-2 border-[#fff] p-3 overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <RiPlayFill className="text-4xl " />
              </div>
            </button>
          ) : (
            <iframe
              loading="lazy"
              width="100%"
              height="290px"
              className="rounded-sm"
              src={`https://www.youtube-nocookie.com/embed/${videoPlaying?.id || youtubeVideoIds[0]}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          )}
        </div>
        <div className={`${theme === 'light' ? 'border-gray-200 text-[#222] bg-[#fff]' : 'border-main-black bg-light-black text-[#efefef] '} md:max-w-[300px] xsm:max-w-[100%]  ml-1 h-[250px]`}>
          <div className="max-h-[260px] plist overflow-y-auto shadow-inner">
            {videoMetadata.map((videoData) => (
              <VideoItem
                theme={theme}
                key={videoData.id}
                videoData={videoData}
                videoPlaying={videoPlaying}
                //@ts-ignore
                setVideoPlaying={setVideoPlaying}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface VideoItemProps {
  videoData: VideoMetadata;
  videoPlaying?: VideoMetadata;
  setVideoPlaying: Dispatch<SetStateAction<VideoMetadata>>;
  theme: string
}

function VideoItem({ videoData, videoPlaying, setVideoPlaying, theme }: VideoItemProps) {
  const isThisVideoPlaying = videoPlaying?.id === videoData.id;

  return (
    <button
      onClick={() => setVideoPlaying(videoData)}
      className={`${theme === 'light' ? 'hover:bg-[#fafafa]' : 'hover:bg-[#555]'} py-2 text-left  px-2 flex w-full  space-x-4 ${isThisVideoPlaying && `${theme === 'light' ? 'bg-[#e6e6e6]' : 'bg-[#555]'} border-l-4 border-main`
        }`}
    >
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-md relative h-[40px] flex-shrink-0">
        <div className="">
          <Image
            objectPosition="0px -7px"
            src={getYoutubeThumbnailUrl(videoData.id, "default")}
            width={72}
            height={54}
            alt="Video Thumbnail"
          />
        </div>
      </div>
      {/* Title - Duration */}
      <div className="flex rounded-md flex-col text-[#333] font-khand-headers">
        <div className={`${theme === 'light' ? 'border-gray-200 text-[#222] ' : 'border-main-black text-[#efefef] '} text-[13px] font-medium leading-3 uppercase`}>{videoData.title}</div>
        <small className={`${theme === 'light' ? ' text-gray-700 ' : 'text-[#efefef] '} text-[10px]`}>{videoData.duration}</small>
      </div>
    </button>
  );
}

export default YoutubePlaylist;
