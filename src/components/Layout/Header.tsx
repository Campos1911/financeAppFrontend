"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <header className="w-full flex justify-between items-center">
      <div className="flex gap-1 text-lg cursor-default">
        Finance <p className="text-green-600">App</p>
      </div>
      <ul className="flex gap-8 items-center">
        <li>
          <button
            onClick={() => handleLogout()}
            className="bg-green-600 rounded-lg hover:bg-green-800 duration-200 p-2 px-4"
          >
            Sair
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
