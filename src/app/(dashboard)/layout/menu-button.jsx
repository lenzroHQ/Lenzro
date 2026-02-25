import React from 'react'

/* Helper component for menu items to maintain consistent styling */
const MenuButton = ({ icon, label, shortcut }) => (
  <button className="group flex items-center gap-3 px-2.5 py-1.5 rounded hover:bg-zinc-800 transition-colors text-left w-full text-zinc-200">
    <span className="text-zinc-400 group-hover:text-zinc-200">{icon}</span>
    <span className="text-[13px]">{label}</span>
    {shortcut && (
      <span className="ml-auto text-zinc-500 text-[10px]">{shortcut}</span>
    )}
  </button>
);


export default MenuButton;