/* eslint-disable react/prop-types */
import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function LeftNavbar({ user, isAdmin, clickHandle }) {
  return (
    <Popover className="relative">
      <Popover.Button
        className={
          "px-2 py-1 rounded-lg outline-none hover:ring-1 hover:ring-black"
        }
      >
        {user}
      </Popover.Button>
      <Popover.Panel className="absolute right-0 mt-3 z-10 flex flex-col gap-2 text-center">
        {isAdmin && (
          <Link
            className="px-2 py-2 w-20 bg-blue-500 rounded-lg hover:bg-blue-600  transition-colors hover:text-white"
            to={"/admin"}
          >
            Admin
          </Link>
        )}
        <button
          onClick={clickHandle}
          className="px-2 py-2 w-20 bg-red-500 rounded-lg hover:bg-red-600 transition-colors hover:text-white"
        >
          Çıkış Yap
        </button>
      </Popover.Panel>
    </Popover>
  );
}
