import { Dispatch, Fragment, FunctionComponent, SetStateAction, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RiMenuLine, RiCloseFill, RiCloseLine, RiFacebookFill, RiArrowRightSLine } from "react-icons/ri";
import Logo from "./Logo";
import Link from "next/link";
import { SOCIAL_LINKS } from "../../utils/constants/links";
import dynamic from "next/dynamic";

const NavbarSearchPopover = dynamic(() => import("./NavbarSearchPopover"));

interface NavData {
  label: string;
  href: string;
  submenu?: Array<{ label: string; href: string }>;
}

const navLinkLeft: Array<NavData> = [
  { label: "home", href: "/" },
  {
    label: "news",
    href: "/news",
    submenu: [
      { label: "wwe news", href: "/wwe-news" },
      { label: "aew news", href: "/aew-news" },
    ],
  },
  {
    label: "rumors",
    href: "/rumors",
    submenu: [
      { label: "wwe rumors", href: "/wwe-rumors" },
      { label: "aew rumors", href: "/aew-rumors" },
    ],
  },
];

const navLinkRight = [
  { label: "rumor roundup", href: "/rumor-round-up" },
  {
    label: "results",
    href: "/results",
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
  },
];

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <header className="bg-main-black relative z-[99]">
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
  );
}

interface NavLinkProps {
  data: NavData;
}

const NavLink: FunctionComponent<NavLinkProps> = ({ data }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <li
      onPointerEnter={() => setShowSubmenu(true)}
      onPointerLeave={() => setShowSubmenu(false)}
      className="relative h-full group hover-underline-animation-wrapper"
    >
      <Link href={data.href}>
        <a className="h-full relative hover-underline-animation-element flex items-center group-hover:text-main">
          <div>{data.label}</div>
        </a>
      </Link>

      {/* Submenu */}
      {data.submenu && showSubmenu && (
        <div className="bg-main-black absolute -left-9 w-48 px-8 py-4">
          <ul>
            {data.submenu.map((submenu) => (
              <li key={submenu.label}>
                <Link href={submenu.href}>
                  <a className="block py-2 font-medium text-sm hover:text-main">{submenu.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

interface SlideoverProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Slideover: FunctionComponent<SlideoverProps> = ({ open, setOpen }) => {
  const navLinksData = useMemo(() => [...navLinkLeft, ...navLinkRight], []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden z-50" open={open} onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
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

          <div className="fixed inset-y-0 left-0 max-w-full flex">
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
                <div className="h-full flex flex-col py-6 bg-main-black shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <div className="">
                        <Link href={SOCIAL_LINKS.FACEBOOK}>
                          <a target="_blank" className="text-white hover:text-main transition-colors">
                            <RiFacebookFill className="w-5 h-5" />
                          </a>
                        </Link>
                      </div>
                      <div className="ml-3 h-7 flex items-center">
                        <button className="  text-white" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close menu</span>
                          <RiCloseLine className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <ul>
                      {navLinksData.map((linkData) => (
                        <NavLinkSidebar key={linkData.href} data={linkData} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface NavLinkSidebarProps {
  data: NavData;
}

const NavLinkSidebar: FunctionComponent<NavLinkSidebarProps> = ({ data }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <li className="relative text-white text-xl font-bold font-exo-nav uppercase h-full group hover-underline-animation-wrapper">
      <div className="flex justify-between hover-underline-animation-element after:!bottom-1 ">
        <Link href={data.href}>
          <a className="h-full relative py-2 flex items-center group-hover:text-main">
            <div>{data.label}</div>
          </a>
        </Link>
        {data.submenu && (
          <button onClick={() => setShowSubmenu((prev) => !prev)} className="flex-1 flex justify-end items-center">
            <RiArrowRightSLine className={`w-5 h-5 transition-transform ${showSubmenu && "rotate-90"}`} />
          </button>
        )}
      </div>

      {/* Submenu */}
      {data.submenu && showSubmenu && (
        <div className="px-8 pb-4">
          <ul>
            {data.submenu.map((submenu) => (
              <li key={submenu.label}>
                <Link href={submenu.href}>
                  <a className="block py-1 font-medium text-sm hover:text-main">{submenu.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
