import { useState } from "react";

import { Menu, X } from "lucide-react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center" >
        <button
          onClick={() => setIsOpen(true)}
          className="hover:cursor-pointer text-DeepOrange"
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </div>
      <div
        className={`
          fixed top-0 left-0 h-screen w-3/4 max-w-xs z-40
          bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {/* logo */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="hover:cursor-pointer"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-1">


          {/* Nav links */}
          {[
            { label: "Shop", to: "/en-ng/collections/apparels" },
            { label: "About Us", to: "/about" },
            { label: "Contact Us", to: "/contact" },
            { label: "For Women", to: "/en-ng/collections/collection-9-womens" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.to}
              onClick={() => setIsOpen(false)}
              className="py-3 text-lg font-normal text-DarkBlue border-b border-gray-100 hover:text-gray-400"
            >
              {link.label}
            </a>
          ))}



        </div>
      </div>
    </>
  );
}