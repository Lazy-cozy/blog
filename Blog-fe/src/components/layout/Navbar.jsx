import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarData = [
    {
      id: 1,
      title: "Articles",
      path: "/",
    },
    {
      id: 2,
      title: "About",
      path: "/about",
    },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="border-b-4 border-green-700 text-center fixed top-0 bg-green-600 font-bold w-full text-lg text-white"
    >
      <ul>
        {navbarData.map((item) => (
          <li key={item.id} className="inline-block py-4">
            <Link to={item.path} className="pl-6 pr-8" aria-label={item.title}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
