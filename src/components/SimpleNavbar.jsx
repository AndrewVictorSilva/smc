import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

export function SimpleNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 400 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">


    </ul>
  );

  return (
    <div className="-m-6 max-h-[900px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="relative flex items-center justify-between text-blue-gray-900">

          <Typography
            as="a"
            href="#"
            className="absolute left-1/2 transform -translate-x-1/2 py-1.5 font-raleway text-lg md:text-xl lg:text-2xl xl:text-4xl whitespace-nowrap"
          >
            Customer Governance Portal
          </Typography>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Opções</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
      <div className="mt-4 flex justify-center items-center flex-1">
        <div className="relative w-full max-w-[1200px] h-[600px] bg-gray-200 rounded-lg shadow-md p-4">
          <iframe
            src="https://app.powerbi.com/view?r=eyJrIjoiZGNhMzlmOTYtNjRlMy00ZmJiLWExNGQtN2Q3ODA2M2E4MDFhIiwidCI6IjMzNDQwZmM2LWI3YzctNDEyYy1iYjczLTBlNzBiMDE5OGQ1YSIsImMiOjh9"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}