import useAuth from "../../contexts/authContext";

import { Settings } from "../Dropdown";

/* import logoLowRes from '/logoLowRes.png' */

export function Header() {
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex fixed gap-x-2 w-full z-20 top-0 left-0 h-12 border-b place-content-between items-center bg-slate-400">
      {userLoggedIn ? (
        <>

          
          <div></div>
          <Settings />
        </>
      ) : (
        <>
          <img ></img>
          {/* <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link> */}
        </>
      )}
    </nav>
  );
}

//export default Header
