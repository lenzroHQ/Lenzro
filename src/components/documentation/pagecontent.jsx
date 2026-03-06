"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TableOfContents = ({ items = [] }) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%", threshold: 0.1 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <div className="space-y-2 pt-5 pl-16">
      <p className="font-medium text-sm text-foreground">On This Page</p>
      <div className="h-[calc(100vh-10rem)] overflow-y-auto pb-10 hide-scrollbar">
        <ul className="m-0 list-none text-xs">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                style={{ paddingLeft: item.depth * 12 }}
                className="mt-0 pt-2"
              >
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "inline-block no-underline transition-colors hover:text-foreground",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
