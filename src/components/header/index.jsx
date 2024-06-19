import useAuth from "../../contexts/authContext";

import { Settings } from "../Dropdown";

/* import logoLowRes from '/logoLowRes.png' */

export function Header() {
  const { userLoggedIn } = useAuth();
  const { currentUser } = useAuth();
  return (
    <nav className="flex fixed gap-x-2 w-full z-20 top-0 left-0 h-14 border-b place-content-between items-center bg-atos-dark-blue text-white">
      {userLoggedIn ? (
        <>
          <div></div>
          <div></div>
          <div className="text-4xl font-raleway">Customer Governance Portal</div>

          <div className="flex items-center">
            <div>
              <p className="font-raleway">{currentUser.email}</p>
            </div>
            <Settings />
          </div>
        </>
      ) : (
        <>
          <img></img>
          {/* <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link> */}
        </>
      )}
    </nav>
  );
}

//export default Header
