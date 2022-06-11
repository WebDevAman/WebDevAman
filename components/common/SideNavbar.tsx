import { Dispatch, Fragment, FunctionComponent, SetStateAction, useContext, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RiMenuLine, RiHome2Line, RiCloseFill, RiCloseLine, RiFacebookFill, RiArrowRightSLine, RiNewspaperFill, RiChat2Line, RiMedal2Line, RiListSettingsLine, RiSunFill, RiMoonFill } from "react-icons/ri";
import { GrAchievement, GrChatOption, GrList } from "react-icons/gr";
import { VscListSelection } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import Logo from "./Logo";
import Link from "next/link";
import { SOCIAL_LINKS } from "../../utils/constants/links";
import dynamic from "next/dynamic";
import { getCookies, setCookies, getCookie } from 'cookies-next';
import { ThemeContext } from "../context/themeContext";
import TopMenuBar from "./TopMenuBar";
import { BsChevronDoubleRight, BsChevronDoubleDown } from "react-icons/bs";
import { BiSun } from 'react-icons/bi'
const NavbarSearchPopover = dynamic(() => import("./NavbarSearchPopover"));

interface NavData {
  label: string;
  href: string;
  icon: string;
  submenu?: Array<{ label: string; href: string }>;
}

const navLinkLeft = [
  { label: "home", href: "/", icon: <RiHome2Line className="text-[13px]  font-semibold" /> },
  {
    label: "news",
    href: "/news",
    icon: <RiNewspaperFill className="text-[13px]  font-semibold" />,
    submenu: [
      { label: "wwe news", href: "/wwe-news" },
      { label: "aew news", href: "/aew-news" },
    ],
  },
  {
    label: "rumors",
    href: "/rumors",
    icon: <RiChat2Line className="text-[13px]  font-semibold" />,
    submenu: [
      { label: "wwe rumors", href: "/wwe-rumors" },
      { label: "aew rumors", href: "/aew-rumors" },
    ],
  },
  {
    label: "rumor roundup", href: "/rumor-round-up",
    icon: <RiChat2Line className="text-[13px]  font-semibold" />,
  },
  {
    label: "results",
    href: "/results",
    icon: <RiMedal2Line className="text-xl  font-semibold" />,
    submenu: [
      { label: "raw", href: "/raw" },
      { label: "smackdown", href: "/smackdown" },
      { label: "nxt", href: "/nxt" },
      { label: "aew dynamite", href: "/aew-dynamite" },
      { label: "ppv", href: "/ppv" },
    ],
  },
  {
    label: "lists",
    href: "/lists",
    icon: <RiListSettingsLine className='text-[13px]  font-semibold' />
  },
];

const navLinkRight = [
  {
    label: "rumor roundup", href: "/rumor-round-up",
    icon: <GrChatOption className="text-[13px]  font-semibold" />,
  },
  {
    label: "results",
    href: "/results",
    icon: <GrAchievement className="text-[13px]  font-semibold" />,
    submenu: [
      { label: "raw", href: "/raw" },
      { label: "smackdown", href: "/smackdown" },
      { label: "nxt", href: "/nxt" },
      { label: "aew dynamite", href: "/aew-dynamite" },
      { label: "ppv", href: "/ppv" },
    ],
  },

];



export default function SideNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setTheme, show, theme, setShow } = useContext(ThemeContext)
  getCookies()


  return (
    <>

      <header className="hidden bg-main-black relative z-[99]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="grid grid-cols-5 uppercase text-sm xl:text-base text-white font-semibold h-14 lg:h-20">
            <div className="lg:col-span-2 h-full mr-10 flex justify-between">
              <div className="h-full">
                <button
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                  className="rounded-md inline-flex lg:hidden items-center justify-center h-full"
                >
                  <span className="sr-only">{isSidebarOpen ? "Close menu" : "Open menu"}</span>
                  {!isSidebarOpen ? (
                    <RiMenuLine className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <RiCloseFill className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="h-full">
                <ul className="hidden lg:flex items-center justify-end space-x-10 h-full">
                  {navLinkLeft.map((navLeftData) => (
                    <NavLink key={navLeftData.href} data={navLeftData} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-span-3 lg:col-span-1 h-full flex items-center justify-center">
              <Logo />
            </div>
            <div className="lg:col-span-2 h-full ml-10 flex justify-between">
              <div className="h-full">
                <ul className="hidden lg:flex items-center space-x-10 h-full">
                  {navLinkRight.map((navLeftData) => (
                    <NavLink key={navLeftData.href} data={navLeftData} />
                  ))}
                </ul>
              </div>
              <NavbarSearchPopover />
            </div>
          </nav>
        </div>

        {/* Slideover */}
        <nav className="lg:hidden" aria-label="Global">
          <Slideover open={isSidebarOpen} setOpen={setIsSidebarOpen} />
        </nav>
      </header>

      {/* big screens */}
      <header className={`relative z-[99] font-exo-nav ${theme === 'light' ? ' bg-[#fff] border-gray-200 text-main-black shadow-navLight ' : 'shadow-navDark border-main-black bg-light-black text-[#efefef]'} border-r hidden 2xl:flex  h-[100vh] 3xl:min-w-[200px] px-3 3xl:px-6  sticky top-0 flex max-w-[200px] 3xl:max-w-[240px] w-full  flex-col`}>
        <div className="my-6 pl-4">
          <Logo />
        </div>

        <div className="flex flex-col">
          {navLinkLeft.map((navLeftData) => (
            <NavLink key={navLeftData.href} data={navLeftData} />
          ))}
          <div className="mt-2">
            <Switch />
          </div>
        </div>

      </header>

      {/* laptops  */}
      <header className={`relative z-[99] font-exo-nav px-2 ${theme === 'light' ? ' bg-[#fff] shadow-navLight border-gray-200 text-main-black ' : 'shadow-navDark border-main-black bg-light-black text-[#efefef]'} xsm:hidden border-r sm:flex 2xl:hidden w-full sm:justify-center  h-[100vh] sm:items-center lg:items-start sticky top-0 flex max-w-[80px] w-full  flex-col`}>
        <div className="w-full text-center flex flex-col justify-center items-center">
          {navLinkLeft.map((navLeftData) => (
            <MobNavLink key={navLeftData.href} data={navLeftData} />
          ))}
          <div className="mt-2">
            <Switch />
          </div>
        </div>
        <div className="flex pb-4 mt-auto">

        </div>
      </header>
      {/* mobile / ipad  */}
      <header className={`relative font-exo-nav ${theme === 'light' ? ' bg-[#fff] border-gray-200 shadow-navLight  text-main-black ' : 'shadow-navDark border-main-black bg-light-black text-[#efefef]'} flex border-b sm:hidden  justify-between  px-2 w-full h-[60px] flex items-center`}>
        <div className={`my-6 cursor-pointer p-2 ${theme === 'light' ? 'hover:bg-[#efefef] ' : 'hover:bg-[#444]'}`}>
          <VscListSelection className="text-xl " onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        <div className="my-6 pl-4">
          <Logo />
        </div>
        <div className="my-6 cursor-pointer p-2 hover:text-main" onClick={() => setShow(!show)}>
          {show ? <RiCloseLine className="text-xl " />
            : <BsSearch className="text-xl" />}

        </div>
      </header>
      <div className="flex md:hidden">
        <TopMenuBar />
      </div>

    </>
  );
}

interface NavLinkProps {
  data: { [any: string]: any };
}



const NavLink: FunctionComponent<NavLinkProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext)
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <li
      onPointerEnter={() => setShowSubmenu(true)}
      onPointerLeave={() => setShowSubmenu(false)}
      className="list-none w-full h-full group  z-[99]"

    >
      <div className="relative ">
        <Link href={data.href}>
          <a className={`${theme === 'light' ? 'bg-transparent text-main-black hover:bg-[#fafafa] hover:text-main' : 'bg-transparent hover:bg-[#555]  text-[#efefef]'} font-semibold h-full uppercase text-[13px] py-3 w-full hover  my-2 flex items-center `} >
            <div className="flex items-center pr-2   w-full justify-between">
              <div className="flex items-center">
                <div className="mr-3">
                  {data.icon}
                </div>
                {data.label}
              </div>
              {data.submenu && !showSubmenu && <BsChevronDoubleRight />}
              {data.submenu && showSubmenu && <BsChevronDoubleDown />}


            </div>
          </a>

        </Link>
        {/* Submenu */}

        {data.submenu && showSubmenu && (
          <div
            className={`${theme === 'light' ? ' bg-[#fff] text-main-black border-gray-500 text-main-black ' : 'border-main-black bg-[#111] text-[#efefef]'} shadow-xl rounded-sm absolute top-[10px] left-[95%] border-t w-full  py-4`}>
            <ul>
              {data.submenu.map((submenu: any) => (
                <li key={submenu.label}>
                  <Link href={submenu.href}>
                    <a className={`${theme === 'light' ? 'hover:bg-[#fafafa] hover:text-main' : 'hover:bg-[#555]'} block  w-full pl-4 uppercase  py-2 font-medium text-[13px] `}>{submenu.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div >
    </li>


  );
};

const MobNavLink: FunctionComponent<NavLinkProps> = ({ data }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { theme } = useContext(ThemeContext)
  return (
    <>

      <li
        onPointerEnter={() => setShowSubmenu(true)}
        onPointerLeave={() => setShowSubmenu(false)}
        className="list-none  w-full h-full group "
      >
        <div className="relative ">
          <Link href={data.href}>
            <a className={`w-full ${theme === 'light' ? 'hover:bg-[#fafafa] bg-[#fff] text-main-black' : 'hover:bg-[#333] bg-light-black text-[#efefef]'} font-semibold h-full uppercase text-[13px] py-3 w-full hover px-2  my-2 hover-underline-animation-element flex items-center group-hover:text-main`}>
              <div className="w-full text-center flex flex-col justify-center items-center">
                <div className="w-full text-center flex flex-col justify-center items-center">
                  <div className="2xl:mr-3">
                    {data.icon}
                  </div>
                  <p className="flex text-[10px]">{data.label}</p>
                </div>
                {data.submenu && !showSubmenu && <BsChevronDoubleRight className="sm:hidden 2xl:flex" />}
                {data.submenu && showSubmenu && <BsChevronDoubleDown className="sm:hidden 2xl:flex" />}
              </div>
            </a>

          </Link>
          {/* Submenu */}

          {data.submenu && showSubmenu && (
            <div className="bg-white 2xl:flex hidden  shadow-xl rounded-sm absolute top-[10px] left-[95%] border-t w-full  py-4">
              <ul>
                {data.submenu.map((submenu: any) => (
                  <li key={submenu.label}>
                    <Link href={submenu.href}>
                      <a className="block hover:bg-[#fafafa] w-full pl-4 uppercase  py-2 font-medium text-[13px] hover:text-main">{submenu.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div >
      </li>
    </>


  );
};

interface SlideoverProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}



const Slideover: FunctionComponent<SlideoverProps> = ({ open, setOpen }) => {
  const navLinksData = useMemo(() => [...navLinkLeft], []);
  const { theme, setTheme } = useContext(ThemeContext)
  getCookies()

  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setCookies('theme', 'dark')
    } else {
      setTheme('light');
      setCookies('theme', 'light')
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed font-exo-nav flex sm:hidden inset-0 overflow-hidden z-50" open={open} onClose={setOpen}>
        <div className="absolute inset-0  overflow-hidden ">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-main-black/60" />
          </Transition.Child>

          <div className="fixed inset-y-0 max-w-[300px] left-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div style={{ maxWidth: '300px' }} className={`${theme === 'light' ? 'bg-[#efefef]' : 'bg-light-black'} h-full flex flex-col py-6 bg-main-black shadow-xl overflow-y-scroll`}>
                  <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <Link href={SOCIAL_LINKS.FACEBOOK}>
                          <a target="_blank" className={`${theme === 'light' ? ' text-[#333]' : ' text-[#efefef]'} hover:text-main transition-colors`}>
                            <RiFacebookFill className="w-5 h-5" />
                          </a>
                        </Link>
                      </div>
                      <div className="ml-3 h-7 flex items-center">
                        <button className="text-[#333]" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close menu</span>
                          <RiCloseLine className={`${theme === 'light' ? ' text-[#333]' : ' text-[#efefef]'} h-6 w-6`} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-[13px]  text-[#333] relative flex-1 px-4 sm:px-6">
                    <ul>
                      {navLinksData.map((linkData) => (
                        <NavLinkSidebar key={linkData.href} data={linkData} />
                      ))}
                    </ul>
                    <Switch />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div >
      </Dialog >
    </Transition.Root >
  );
};

interface NavLinkSidebarProps {
  data: { [any: string]: any };
}

const NavLinkSidebar: FunctionComponent<NavLinkSidebarProps> = ({ data }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { theme } = useContext(ThemeContext)
  return (

    <li className="relative my-4 text-[#333] text-xl font-bold font-exo-nav uppercase h-full group  ">
      <div className="flex justify-between  hover-underline-animation-element  after:!bottom-1 ">
        <Link href={data.href}>
          <a className="h-full relative py-2 flex items-center  group-hover:text-main">
            <div className="flex text-[13px]  items-center pr-2   w-full justify-between">
              <div className={`${theme === 'light' ? ' text-[#333]' : ' text-[#efefef]'} flex items-center`}>
                <div className={`${theme === 'light' ? ' text-[#333]' : ' text-[#efefef]'} mr-3`}>
                  {data.icon}
                </div>
                {data.label}
              </div>
            </div>
          </a>
        </Link>
        {data.submenu && (
          <button onClick={() => setShowSubmenu((prev) => !prev)} className="flex-1 flex justify-end items-center">
            <BsChevronDoubleRight className={` ${theme === 'light' ? ' text-[#333]' : ' text-[#efefef]'} w-4 h-4 transition-transform ${showSubmenu && "rotate-90"}`} />
          </button>
        )}
      </div>

      {/* Submenu */}
      {
        data.submenu && showSubmenu && (
          <div className="px-8 pb-4">
            <ul>
              {data.submenu.map((submenu: any) => (
                <li key={submenu.label}>
                  <Link href={submenu.href}>
                    <a className={`${theme === 'light' ? 'hover:bg-[#fafafa] hover:text-main' : 'hover:bg-[#555] text-white'} block items-center w-full pl-4 uppercase flex py-2 font-medium text-[13px] `}><BsChevronDoubleRight className={`${theme === 'light' ? ' text-[#333]' : ' text-[#efefef]'} w-3 mr-2 h-3 transition-transform`} />{submenu.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </li >

  );
};

const Switch = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const handleChangeTheme = () => {
    if (theme === 'light') {
      setCookies('theme', 'dark')
      setTheme('dark')
    } else {
      setCookies('theme', 'light')
      setTheme('light')
    }
  }
  return (<div style={{ boxShadow: `0 0 3px 1px ${theme === 'light' ? '#E5E5E5' : '#292929'} inset` }} onClick={handleChangeTheme} className={`${theme === 'light' ? 'bg-[#fafafa]' : 'bg-[#212121]'} cursor-pointer flex p-[2px] rounded-full  w-[3rem] w-full transition duration-30`}>
    <div className={`${theme === 'light' ? 'mr-auto bg-white' : 'ml-auto bg-light-black'} w-5 flex transition duration-300   items-center justify-center cursor-pointer h-5 rounded-full  `}>
      {theme === 'light' ? <RiMoonFill className="h-4 w-4 text-[#333]" /> : <BiSun className="h-4 w-4 text-[#fff]" />}
    </div>
  </div>)
}