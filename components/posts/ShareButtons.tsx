import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaReddit,
  FaPinterest,
  FaWhatsapp,
  FaTumblr,
  FaTelegram,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import {
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

interface ShareButtonsProps {
  url: string;
  photoUrl: string;
}

const firstRowshareButtons = [
  { name: "Facebook", Icon: FaFacebookF, Button: FacebookShareButton, color: "#4267B2" },
  { name: "Twitter", Icon: FaTwitter, Button: TwitterShareButton, color: "#1DA1F2" },
  { name: "Reddit", Icon: FaReddit, Button: RedditShareButton, color: "#FF4500" },
  { name: "Pinterest", Icon: FaPinterest, Button: PinterestShareButton, color: "#BD081C" },
];

const secondRowShareButtons = [
  { name: "Whatsapp", Icon: FaWhatsapp, Button: WhatsappShareButton, color: "#4AC959" },
  { name: "Tumblr", Icon: FaTumblr, Button: TumblrShareButton, color: "#35465c" },
  { name: "Telegram", Icon: FaTelegram, Button: TelegramShareButton, color: "	#0088cc" },
];

function ShareButtons({ url, photoUrl }: ShareButtonsProps) {
  const [showMoreButtons, setShowMoreButtons] = useState(false);

  return (
    <div className="space-y-2">
      <div className="justify-center flex space-x-2">
        <ButtonGroup buttonGroup={firstRowshareButtons} url={url} photoUrl={photoUrl} />
        {!showMoreButtons && <ToggleButton showMoreButtons={showMoreButtons} setShowMoreButtons={setShowMoreButtons} />}
      </div>
      {showMoreButtons && (
        <div className="justify-center flex space-x-2 gap-y-2">
          <ButtonGroup buttonGroup={secondRowShareButtons} url={url} photoUrl={photoUrl} />
          {showMoreButtons && (
            <ToggleButton showMoreButtons={showMoreButtons} setShowMoreButtons={setShowMoreButtons} />
          )}
        </div>
      )}
    </div>
  );
}

interface ButtonGroupProps {
  buttonGroup: typeof firstRowshareButtons;
  url: string;
  photoUrl: string;
}

function ButtonGroup({ buttonGroup, url, photoUrl }: ButtonGroupProps) {
  return (
    <>
      {buttonGroup.map(({ name, Icon, Button, color }, i) => (
        <Button
          className="rounded-full overflow-hidden transition-opacity hover:opacity-75 !cursor-pointer inline-flex items-center !p-4 sm:!px-4 sm:!py-3 space-x-1"
          media={photoUrl}
          key={i}
          url={url}
          style={{ backgroundColor: color }}
        >
          <Icon className="text-white" size={20} />
          <div className="hidden sm:block text-sm text-white">{name}</div>
        </Button>
      ))}
    </>
  );
}

interface ToggleButton {
  showMoreButtons: boolean;
  setShowMoreButtons: Dispatch<SetStateAction<boolean>>;
}

function ToggleButton({ showMoreButtons, setShowMoreButtons }: ToggleButton) {
  return (
    <button
      onClick={() => setShowMoreButtons((prev) => !prev)}
      className="text-xl flex-shrink-0 hover:bg-gray-50 transition-colors font-black text-gray-700 border rounded-full flex items-center justify-center w-[52px] h-[52px] sm:w-12 sm:h-12"
    >
      {!showMoreButtons ? <FaPlus /> : <FaMinus />}
    </button>
  );
}

export default ShareButtons;
