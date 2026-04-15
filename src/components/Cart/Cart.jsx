import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";

const Menu = [
  { id: 1, name: "The Empire's finest — now yours.", link: "/#" },
];

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="shadow-amber-300 dark:bg-black dark:text-white">

      {/* Upper Navbar */}
      <div className="bg-black">
        <div className="container flex justify-between items-center py-3">

          {/* Logo */}
          <a href="#" className="font-extrabold text-2xl sm:text-3xl flex gap-2 items-center text-amber-400">
            <img src={Logo} alt="Logo" className="w-20" />
            Imperial Hanger
          </a>

          {/* Search bar */}
          <div className="group">
            <input
              type="text"
              placeholder="Search"
              className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Order button */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-amber-400 py-1 px-4 rounded-full border-2 border-amber-400 hover:bg-amber-400 hover:text-gray-950 transition-all duration-200"
          >
            Order
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center bg-gray-950 border-t border-gray-800">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a href={data.link} className="inline-block px-4 py-2 hover:text-amber-300 duration-200 text-white">
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Navbar;