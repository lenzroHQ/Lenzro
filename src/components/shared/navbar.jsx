"use client";

import Link from "next/link";
import React, { useState } from "react";
import { NavigationMenuLinks } from "./navigationlink";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, PhoneCall, Phone } from "lucide-react";
import { ContactDialog } from "@/app/(marketing)/layouts/contact-dialog";

const NAV_LINKS = [
  { href: "/", label: "Docs" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/community", label: "Community" },
];


const Navbar = () => {

  return (
    <>
      <nav className="sticky top-0 bg-white/60 dark:bg-black/70 backdrop-blur-3xl mx-auto border-b inset-x-0 z-50 lg:w-full">
        {/* <ScrollProgress className="top-15" /> */}

        {/* Desktop Navbar */}
        <div className="hidden lg:block w-full p-2">
          <div className="w-full flex relative justify-between px-4 py-1 rounded-full bg-transparent transition duration-200">
            <div className="flex flex-row gap-2 items-center">
              <Link
                className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
                href="/"
              >
                <img
                  src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Exclude.png"
                  alt=""
                  className="h-5 w-5"
                />
                <span className="font-medium text-lg text-black dark:text-white">
                  Lenzro
                </span>
              </Link>
              <NavigationMenuLinks />
            </div>
              <ContactDialog/>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden block w-full p-2">
          <div className="w-full flex relative justify-between  py-2 rounded-full bg-transparent transition duration-200">
            <div className="flex flex-row gap-2 items-center">
              <Link
                className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20"
                href="/"
              >
                <img
                  src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Exclude.png"
                  alt=""
                  className="h-5 w-5"
                />
                <span className="font-medium text-black text-lg dark:text-white">
                  Lenzro
                </span>
              </Link>
            </div>

            <div className="flex space-x-5 items-center">
              {/* contact */}
              <ContactDialog
                trigger={
                  <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white transition-colors"
                  >
                    <Phone />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
