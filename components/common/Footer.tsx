import { useContext } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { SOCIAL_LINKS } from "../../utils/constants/links";
import { RiFacebookFill, RiInstagramFill, RiInstagramLine, RiLinkedinBoxLine, RiLinkedinLine, RiTwitterLine } from "react-icons/ri";
import { ThemeContext } from "../context/themeContext";

const subFooterNavigationData: Array<{ label: string; href: string }> = [
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];
const FooterSocialLinkData = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/wrestlingworld",
    icon: <RiFacebookFill />,
  },
];

function Footer() {
  const { theme } = useContext(ThemeContext)
  return (
    <footer className={` border-t ${theme === 'light' ? 'bg-white border-gray-400' : 'text-[#efefef] border-[#333] bg-light-black'} pt-8`}>
      <div className="flex items-center flex-col">
        <Logo />
        <p className="text-sm md:text-[16px] my-4 text-center m-auto max-w-[700px] py-3 font-md xsm:w-[90%] ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et quisquam optio culpa voluptas. Repellendus, quis iste. Eum, labore nisi aperiam corporis provident velit, repudiandae optio consequuntur, nulla quo officiis a!</p>
        <div className="flex">
          {FooterSocialLinkData.map((data, index) => (
            <div key={index}>
              <a href={data.href} title={data.label} className={`mx-1 transition duration-500 flex items-center justify-center h-[45px] w-[45px] rounded-full border-2 text-2xl  cursor-pointer hover:text-main hover:border-[#ce061e] ${theme === 'light' ? 'text-[#555]' : 'text-[#efefef]'}`}>{data.icon}</a>
            </div>
          ))}
        </div>
        <div className="flex md:flex-row items-center flex-col border-t w-full justify-between py-4 md:px-8 xsm:px-2 mt-4">
          <p className="text-xs md:text-sm font-semibold">Copyright &copy; 2022 Wrestling world.</p>
          <div className="flex items-center">
            {subFooterNavigationData.map(link => (
              <a href={link.href} className={` border-2 xsm:mt-2 md:mt-0 rounded-full px-4 text-sm  py-1 mr-2 ${theme === 'light' ? 'hover:bg-gray-100 border-gray-400' : 'border-[#333] hover:bg-light-black'}`} title={link.label}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
