import useAuth from "../../contexts/authContext";
import { HeaderMenuPopover } from "../Popover";
import { Settings } from "../Dropdown";

export function Header() {
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex fixed gap-x-2 w-full z-20 top-0 left-0 h-12 border-b place-content-between items-center bg-gray-200 ">
      {userLoggedIn ? (
        <>

          <div></div>
          {/* <HeaderMenuPopover /> */}

          <Settings />
        </>
      ) : (
        <>
          <div className="ml-2" > Depois vai ter o logo da atos</div>
          {/* <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link> */}
        </>
      )}
    </nav>
  );
}

//export default Header
