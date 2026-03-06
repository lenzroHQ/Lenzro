"use client";

import Link from "next/link";
import React, { useState } from "react";
import { NavigationMenuLinks } from "./navigationlink";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import { SearchBarWithShortcut } from "./searchbarwithshortcut";
import { IconSearch } from "@tabler/icons-react";
import { useSearchStore } from "@/app/store/searchStore";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-14 right-0 w-full h-screen bg-white dark:bg-black z-40 shadow-lg"
      >
        <div className="py-5 px-4 pt-6 flex flex-col gap-6">
          {/* Pass onClose so links close the menu */}
          <Link href="/" className="text-xl" onClick={onClose}>
            Docs
          </Link>
          <Link href="/solutions" className="text-xl" onClick={onClose}>
            Solutions
          </Link>
          <Link href="/pricing" className="text-xl" onClick={onClose}>
            Pricing
          </Link>
          <Link href="/community" className="text-xl" onClick={onClose}>
            Community
          </Link>
          <Link href="/docs/black-board" className="text-xl" onClick={onClose}>
            BlackBoard
          </Link>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { mobileOpen, setMobileOpen } = useSearchStore();

  return (
    <>
      <nav className="fixed bg-white/60 dark:bg-black/70 backdrop-blur-3xl mx-auto border-b inset-x-0 z-50 lg:w-full">
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
                <span className="font-medium text-black dark:text-white">
                  Lenzro
                </span>
              </Link>
              <NavigationMenuLinks />
            </div>

            <div className="flex space-x-2 items-center">
              <SearchBarWithShortcut />
              {/* <ModeToggle /> */}
              <Link href="/auth">
                <Button className="px-5 py-2 text-xs h-7 rounded-sm cursor-pointer transition-all duration-300 border">
                  Get Started
                </Button>
              </Link>
            </div>
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
              {/* Mobile search trigger */}
              <button onClick={() => setMobileOpen(true)}>
                <IconSearch className="size-5" />
              </button>

              {/* Hamburger/X menu trigger */}
              <button
                className="relative w-7 h-7 flex flex-col items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <motion.div
                  initial={false}
                  animate={
                    menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute w-5 h-[2px] dark:bg-white bg-black"
                />
                <motion.div
                  initial={false}
                  animate={
                    menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute w-5 h-[2px] dark:bg-white bg-black"
                />
              </button>
            </div>
          </div>

          {/* Mobile search drawer */}
          <SearchBarWithShortcut mobileTrigger />

          {/* Mobile menu drawer */}
          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
