import React from "react";
import { Link, NavLink } from "react-router";
import Drawer from "./Drawer";
import { useCart } from "../context/CartContext";

interface NavItem {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

const navItems: NavItem[] = [
  {
    name: "Shop",
    path: "/en-ng/collections/apparels",
    children: [
      { name: "All Products", path: "/en-ng/collections/apparels" },
      { name: "Complete-Set", path: "/en-ng/collections/complete-set" },
      { name: "Button Shirts", path: "/en-ng/collections/shirt" },
      { name: "Hoodies & Sweatshirts", path: "/en-ng/collections/hoodies-sweatshirts" },
      { name: "Trousers & Pants", path: "/en-ng/collections/pants" },
      { name: "Tote-Bag", path: "/en-ng/collections/tote-bag" },
    ],
  },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "For Women", path: "en-ng/collections/collection-9-womens" },
];

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenFavorites }) => {
  const { openCart, totalItems, favorites } = useCart();

  return (
    <section>
      <header>
        <nav className="fixed top-0 w-full z-50 bg-white hover:backdrop-blur-sm transition">
          <div className="w-11/12 container py-2 mx-auto flex items-center justify-between">
            {/* 1. LEFT SIDE: Mobile Hamburger Menu (Hidden on Desktop) */}
            <div className="flex items-center md:hidden w-1/3 justify-start">
              <Drawer />
            </div>

            {/* 2. CENTER (Mobile) / LEFT (Desktop): Logo */}
            <div className="flex justify-center md:justify-start w-1/3 md:w-auto">
              <Link to="/">
                <img
                  src="/images/reborn logo2.png"
                  alt="Reborn Logo"
                  className="w-16 md:w-20 lg:w-28 object-contain"
                />
              </Link>
            </div>

            {/* 3. DESKTOP NAVIGATION: Links (Hidden on Mobile) */}
            <div className="hidden md:flex gap-3 lg:gap-6 items-center text-DarkBlue text-[10px] lg:text-[16px] uppercase tracking-widest">
              {navItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.path} className="relative group py-2">
                      <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) =>
                          `p-2 rounded-md font-medium transition-all duration-200 flex items-center gap-1 ${
                            isActive
                              ? "border-b-2 border-DeepOrange"
                              : "text-DarkBlue hover:bg-gray-200"
                          }`
                        }
                      >
                        {item.name}
                        <svg
                          className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </NavLink>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full hidden group-hover:block w-52 bg-white shadow-xl border border-gray-100 rounded-md py-2 z-50 transition-transform ">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 text-[11px] text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      `p-2 rounded-md font-medium transition-all duration-200  ${
                        isActive
                          ? "border-b-2 border-DeepOrange"
                          : "text-DarkBlue hover:bg-gray-200"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            {/* 4. RIGHT SIDE: Action Icons (Search, Favorites, Cart) */}
            <div className="flex items-center justify-end gap-1 md:gap-4 w-1/3 md:w-auto text-DarkBlue uppercase tracking-widest text-[12px]">
              {/* Search Icon / Button */}
              <button
                onClick={onOpenSearch}
                className="p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Open search"
              >
                <span className="hidden md:inline text-[10px] lg:text-[16px]">
                  SEARCH
                </span>
                <svg
                  className="w-5 h-5 md:hidden"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Favorites (Hidden on small screens to avoid clutter, visible on md+) */}
              <button
                onClick={onOpenFavorites}
                className="relative flex items-center p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Favorites"
              >
                <span className="hidden md:inline text-[10px] lg:text-[16px]">
                  FAVORITES
                </span>
                <svg
                  className={`h-6 w-6 ${"md:hidden flex fill-none text-black"}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
                  />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Cart Icon / Button */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 p-2 font-medium uppercase tracking-wider transition-transform duration-300"
                aria-label="Open cart"
              >
                <span className="hidden md:inline text-[10px] lg:text-[16px]">
                  Cart
                </span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </section>
  );
};

export default NavBar;
