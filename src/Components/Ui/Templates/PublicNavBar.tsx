import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Switch } from '@headlessui/react'
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [dark, setDark] = useState(false)
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 bg-slate-100">
        <div className="container flex flex-wrap items-center justify-between px-1 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <div className="inline-block mr-4 text-lg font-semibold leading-relaxed whitespace-nowrap text-slate-500">
              <div className="flex">
              <div className="w-24 h-16 md:w-28 md:h-20">
            <img
              src={`${process.env.PUBLIC_URL}https://i.imgur.com/eRQNKoM.png`}
              alt="logo"
              className="object-contain w-full h-full"
            />
          </div>
                <div className="flex-col basis-1/2">
                  <div className="basis-1/2">Chinthana Prabhashitha</div>
                  <div className="basis-1/2">Travel Photography</div>
                </div>
              </div>
            </div>
            <button
              className="block text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            > <GiHamburgerMenu className='' size={24} color="black"/>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase text-slate-500 hover:opacity-75"
                  to="/"
                >
                  <i className="text-lg opacity-75 text-slate-500 fab fa-facebook-square leading-lg"></i><span className="ml-2">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase text-slate-500 hover:opacity-75"
                  to="/Portfolio"
                >
                  <i className="text-lg opacity-75 text-slate-500 fab fa-facebook-square leading-lg"></i><span className="ml-2">Portfolio</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase text-slate-500 hover:opacity-75"
                  to="/About"
                >
                  <i className="text-lg opacity-75 text-slate-500 fab fa-twitter leading-lg"></i><span className="ml-2">About</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase text-slate-500 hover:opacity-75"
                  to="/Blogs"
                >
                  <i className="text-lg opacity-75 text-slate-500 fab fa-pinterest leading-lg"></i><span className="ml-2">Blogs</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase text-slate-500 hover:opacity-75"
                  to="/Contact"
                >
                  <i className="text-lg opacity-75 text-slate-500 fab fa-pinterest leading-lg"></i><span className="ml-2">Contact</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="flex items-center px-3 py-2 text-xs font-bold leading-snug uppercase text-slate-500 hover:opacity-75"
                  to="#pablo"
                >
                  <i className="text-lg opacity-75 text-slate-500 fab fa-pinterest leading-lg"></i>
                  <span className="ml-2">
                  {/* <Switch
                  checked={dark}
                  onChange={setDark}
                  className={`${
                  dark ? 'bg-slate-400' : 'bg-blue-600'
                 } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                 <span className="sr-only">Enable notifications</span>
                 <span
                 className={`${
                 dark ? 'translate-x-6' : 'translate-x-1'
                 } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                 />
                 </Switch> */}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}