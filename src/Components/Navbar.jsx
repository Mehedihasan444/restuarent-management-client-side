import { NavLink } from "react-router-dom";
import MaxWidth from "../CustomTags/MaxWidth";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import useAuth from "../CustomHooks/useAuth";
import { useState } from "react";
const Navbar = () => {
  const { user,LogOut } = useAuth();
  const [toggle, setToggle] = useState(false);
  return (
    <div className=" bg-slate-100 shadow-md">
      <MaxWidth>
        <div className="navbar ">
          <div className="flex-1 flex justify-between items-center">
            <div className="  flex-1">
              <div className="hidden sm:block">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
              </div>
              <div className="relative sm:hidden">
                <div className="btn btn-ghost normal-case p-0">
                  <HiMiniBars3CenterLeft
                    className="text-3xl  drawer-button"
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  ></HiMiniBars3CenterLeft>
                </div>
                <div className={`absolute top-[54px] left-0 w-60 z-50  transition ease-in-out delay-1000 ${toggle?'-ml-1':'-ml-64'}`}>
                  <ul className="menu menu-vertical p-4 bg-slate-100  h-screen text-base-content -ml-1">
                    <li>
                      <NavLink to="/" className="">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/all-foods" className="">
                        All Foods
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/blog" className="">
                        Blog
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="navbar-center hidden lg:flex justify-center flex-1">
              {/* {*flex gap-5 items-center *} */}
              <ul className="menu menu-horizontal gap-3">
                <li>
                  <NavLink to="/" className="">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/all-foods" className="">
                    All Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog" className="">
                    Blog
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end z-50">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="text-3xl w-[36px] ">
                  {user ? (
                    <img src={user?.photoURL} alt="" className="rounded-full "/>
                  ) : (
                    <FaUserCircle className=""></FaUserCircle>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/myFoods" className="justify-between">
                  My added food items
                    {/* <span className="badge">New</span> */}
                  </a>
                </li>
                <li>
                  <a href="/addFood">Add a food item</a>
                </li>
                <li>
                  <a href="/myOrders">My ordered food items</a>
                </li>
                <li>
                    {
                        user?<a onClick={()=>{LogOut()}}>Logout</a>:<a href="/logIn">LogIn</a>
                    }
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MaxWidth>
    </div>
  );
};

export default Navbar;
