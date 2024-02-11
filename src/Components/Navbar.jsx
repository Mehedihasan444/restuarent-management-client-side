import { NavLink } from "react-router-dom";
import MaxWidth from "../CustomTags/MaxWidth";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import useAuth from "../CustomHooks/useAuth";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./styles.css";
import { AiOutlineClose } from "react-icons/ai";
import useAxios from "../CustomHooks/useAxios";


const Navbar = () => {
  const { user, LogOut } = useAuth();
  const [toggle, setToggle] = useState(false);
  const axios = useAxios();
  const [checkUser, setCheckUser] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/user/role/${user.email}`);
      console.log(response.data);
      setCheckUser(response.data.role);
    };

    fetchData();
  }, [axios, user]);

  return (
    <div className="  shadow-md sticky top-0 bg-[#ffffffc9] z-50">
      <MaxWidth>
        <div className="navbar ">
          <div className="flex-1 flex justify-between items-center">
            <div className="  flex-1">
              <div className="hidden  sm:flex  items-center">
                <a href="/" className=" ">
                  <img src={logo} alt="" className="w-16" />
                </a>
                <span className="font-bold text-3xl ">
                  R<span className="text-[#1dcdbc]">M</span>
                </span>
              </div>
              <div className="relative sm:hidden flex justify-between items-center">
                <div className="btn btn-ghost normal-case p-0">
                  {toggle ? (
                    <AiOutlineClose
                      className="text-3xl  drawer-button"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    ></AiOutlineClose>
                  ) : (
                    <HiMiniBars3CenterLeft
                      className="text-3xl  drawer-button"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    ></HiMiniBars3CenterLeft>
                  )}
                </div>

                <div className="">
                  {user ? (
                    ""
                  ) : (
                    <ul className="text-center flex flex-col justify-center items-center -mb-2">
                      <FaUserCircle className="text-xl -mb-2"></FaUserCircle>
                      <a href="/register" className="hover:text-[#1dcdbc]">
                        <span className="text-xs ">Register</span>
                      </a>
                    </ul>
                  )}
                </div>
                <div
                  className={`absolute top-[54px] left-0 w-60 z-50  transition ease-in-out delay-1000 ${
                    toggle ? "-ml-1" : "-ml-64"
                  }`}
                >
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

            <div className="navbar-center hidden sm:flex justify-between items-center flex-1">
              {/* {*flex gap-5 items-center *} */}
              <ul className="flex justify-evenly md:gap-2 lg:gap-10">
                <li>
                  <NavLink to="/" className="hover:text-[#1dcdbc] p-3 ">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/all-foods" className="hover:text-[#1dcdbc] p-3">
                    All Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog" className="hover:text-[#1dcdbc] p-3">
                    Blog
                  </NavLink>
                </li>
              </ul>
              <div className="">
                {user ? (
                  ""
                ) : (
                  <ul className="text-center flex flex-col justify-center items-center -mb-2">
                    <FaUserCircle className="text-xl -mb-2"></FaUserCircle>
                    <a href="/register" className="hover:text-[#1dcdbc]">
                      <span className="text-xs ">Register</span>
                    </a>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end z-50">
              <div className="flex justify-center items-center   ">
                {user ? (
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-2 rounded-full bg-[#1dcdbbb6] p-1">
                      <h1 className=" pl-2 text-white text-xs">
                        {user?.displayName}
                      </h1>
                      <img
                        tabIndex={0}
                        src={user?.photoURL}
                        alt=""
                        className="rounded-full w-[40px] h-[40px]  cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {checkUser === "admin" ? (
                  <>
                    {" "}
                    <li>
                      <a href="/myFoods" className="justify-between">
                        My added food items
                      </a>
                    </li>
                    <li>
                      <a href="/customerOrders" className="justify-between">
                        Customer Orders
                      </a>
                    </li>
                    <li>
                      <a href="/addFood">Add a food item</a>
                    </li>
                  </>
                ) : (
                  <> <li>
                    <a href="/myOrders">My ordered food items</a>
                  </li>
                  <li>
                    <a href="/cart">Cart</a>
                  </li>
                  </>
                 
                )}

                <li>
                  {user ? (
                    <a
                      onClick={() => {
                        LogOut();
                      }}
                    >
                      Logout
                    </a>
                  ) : (
                    <a href="/logIn">LogIn</a>
                  )}
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
