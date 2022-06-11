import { Popover, Transition } from "@headlessui/react";
import React, { FormEvent } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { GoTriangleUp } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import Router from "next/router";

function NavbarSearchPopover() {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    Router.push(`/search?q=${searchInput}`);
  };

  return (
    <Popover as="div" className="h-full relative flex items-center lg:mr-4">
      {({ open }) => (
        <>
          <Popover.Button>
            <span className="sr-only">{open ? "Close search" : "Open Search"}</span>
            <RiSearchLine className="w-5 h-5" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="text-base absolute bottom-[-86px] bg-white p-6 shadow-md border-t-4 border-main -right-4 text-black z-10">
              <div className="relative">
                <form className="flex" onSubmit={handleSubmitSearch}>
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    autoFocus
                    className="border text-main-black py-1 px-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="uppercase bg-main transition-colors hover:bg-main-black text-white text-[10px] font-bold px-3 "
                  >
                    search
                  </button>
                </form>

                <div className="absolute -top-11 -right-2">
                  <GoTriangleUp className="w-5 h-6 text-main" />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default NavbarSearchPopover;
