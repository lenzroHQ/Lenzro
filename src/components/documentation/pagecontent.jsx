import React from "react";

const tocItems = [
  { title: "Installation", depth: 0 },
  { title: "Usage", depth: 0 },
  { title: "Controlled State", depth: 0 },
  { title: "Examples", depth: 0 },
  { title: "Basic", depth: 1 },
  { title: "Settings Panel", depth: 1 },
  { title: "File Tree", depth: 1 },
  { title: "RTL", depth: 0 },
  { title: "API Reference", depth: 0 },
];

const PageContent = () => {
  return (

      <div className="sticky mt-10 h-[calc(100vh-3.5rem)] w-40 flex justify-end overflow-hidden pt-6">
        <div className="space-y-2">
          <p className="text-sm text-zinc-100 px-2">On This Page</p>
          <ul className="m-0 text-xs list-none">
            {tocItems.map((item, index) => (
              <li key={index} className="mt-0 pt-2">
                <a
                  href={`#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`inline-block no-underline transition-colors hover:text-zinc-100 ${
                    item.depth > 0 ? "ml-4" : ""
                  } ${
                    index === 1 ? "text-zinc-100" : "text-zinc-400" // Example active state
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default PageContent;
