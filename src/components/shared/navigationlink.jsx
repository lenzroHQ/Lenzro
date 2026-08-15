"use client";

import * as React from "react";
import Link from "next/link";


import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DottedGlowBackgroundDemo } from "./DottedGlowBackgroundDemo";



export function NavigationMenuLinks({ onLinkClick }) {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList
        className="
          flex flex-col  px-2
          md:flex-row md:flex-nowrap md:items-center items-start md:gap-4
        "
      >
        {/* Services link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className="px-3 py-1 text-lg md:text-sm text-black dark:text-white hover:text-green-500 transition-colors"
          >
            <Link href="#services" onClick={onLinkClick}>
              Services
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Solutions link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className="px-3 py-1 text-lg md:text-sm text-black dark:text-white hover:text-green-500 transition-colors"
          >
            <Link href="#projects" onClick={onLinkClick}>
              Our Projects
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* testimonilas link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className="px-3 py-1 text-lg md:text-sm text-black dark:text-white hover:text-green-500 transition-colors"
          >
            <Link href="#testimonials" onClick={onLinkClick}>
              Testimonials
            </Link>
          </NavigationMenuLink>

        </NavigationMenuItem>

        {/* About us  */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className="px-3 py-1 text-lg md:text-sm text-black dark:text-white hover:text-green-500 transition-colors"
          >
            <Link href="#about" onClick={onLinkClick}>
              About Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Home dropdown (hidden on mobile) */}
        <NavigationMenuItem className="hidden md:block z-20">
          <NavigationMenuTrigger>Our Startup</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <DottedGlowBackgroundDemo />
                </NavigationMenuLink>
              </li>
              <ListItem title="Introduction">
                Lenzro is the operating system for modern businesses & creators.
                it will be launched soon.
              </ListItem>
              <ListItem title="How to use it">
                Login then start running your business, as simple as that.
              </ListItem>
              <ListItem title="Get Started">
                Create your account and start running your business today.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({ title, children, href, onClick, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <div>
          <div className="text-sm font-medium">{title}</div>
          <p className="text-gray-600 line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  );
}
