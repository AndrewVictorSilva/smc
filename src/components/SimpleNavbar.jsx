import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button,
  Card,
  Collapse,
} from "@material-tailwind/react";
import { ProfileMenu } from "./ProfileMenu"; // Adjust the import path based on your project structure
import { doSignOut } from "../firebase/auth";

export function SimpleNavbar({ chartUrl, userEmail }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 400 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="-m-6 max-h-[900px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-opacity-100 bg-[#00005c]">
        <div className="relative flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            className="absolute left-1/2 transform -translate-x-1/2 py-1.5 font-raleway text-lg md:text-xl lg:text-2xl xl:text-4xl whitespace-nowrap text-white"
          >
            Customer Governance Portal
          </Typography>
          <div className="ml-auto flex items-center mr-4">
            <ProfileMenu />
          </div>
        </div>

      </Navbar>
      <div className="mt-6 flex justify-center items-center flex-1">
        <div className="relative w-full max-w-[1200px] h-[680px] bg-gray-200 rounded-lg shadow-md p-4">
          {chartUrl ? (
            <iframe
              src={chartUrl}
              className="w-full h-full border-0"
            ></iframe>
          ) : (
            <div className="w-full h-full bg-gray-400"></div>
          )}
        </div>
      </div>
    </div>
  );
}
