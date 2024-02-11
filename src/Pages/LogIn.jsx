/* eslint-disable react/no-unescaped-entities */

import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../CustomHooks/useAuth";
import useAxios from "../CustomHooks/useAxios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const LogIn = () => {
  const { LogIn, LoginWithGoogle, user } = useAuth();
  const axios = useAxios();
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.Email.value;
    const password = e.target.Password.value;

    //reset error
    setLoginError("");
    setLoginSuccess("");

    LogIn(email, password)
      .then((result) => {
        console.log(result.user);
        const CurrentUser = { email };
        // get access token
        axios.post("/auth/access-token", CurrentUser).then((res) => {
          console.log(res.data);
          if (res.data.success) {
            navigate(location?.state ? location.state : "/");
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Login failed!",
          footer: `<a href="#">${error.message}</a>`,
        });
        console.log(error.message);
        setLoginError(error.message);
      });
  };
  const handleGoogleLogin = () => {
    console.log("google");
    LoginWithGoogle()
      .then((result) => {
        console.log(result.user);
        const CurrentUser = { email: result.user.email };
        // get access token
        axios.post("/auth/access-token", CurrentUser).then((res) => {
          console.log("get token", res.data);
          if (res.data.success) {
            navigate(location?.state ? location.state : "/");
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Login failed!",
          footer: `<a href="#">${error.message}</a>`,
        });
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <Helmet>
        <title>Login</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {/* {loginError && <p className="text-red-700">{loginError}</p>}
      {loginSuccess && <p className="text-green-600">{loginSuccess}</p>} */}

      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#1dcdbc] to-[#95f9ef] bg-clip-border text-white shadow-lg shadow-[#95f9ef]">
            <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
              Sign In
            </h3>
          </div>
          <form onSubmit={handleLogIn}>
            <div className="flex flex-col gap-4 p-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="email"
                  name="Email"
                  ref={emailRef}
                  required
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#95f9ef] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#95f9ef] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#95f9ef] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#95f9ef] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type={showPassword ? "Password" : "text"}
                  name="Password"
                  required
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#95f9ef] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#95f9ef] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#95f9ef] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#95f9ef] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
                <span
                  className="cursor-pointer absolute top-3 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <div className="-ml-2.5">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox"
                    data-ripple-dark="true"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#95f9ef] checked:bg-[#95f9ef] checked:before:bg-[#95f9ef] hover:before:opacity-10"
                      id="checkbox"
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px cursor-pointer select-none font-light text-gray-700"
                    htmlFor="checkbox"
                  >
                    Remember Me
                  </label>
                  <span className="ml-16 ">
                    <Link>Forget password ?</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                className="block w-full select-none rounded-lg bg-gradient-to-tr from-[#1dcdbc] to-[#95f9ef] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#95f9ef]/20 transition-all hover:shadow-lg hover:shadow-[#95f9ef] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                data-ripple-light="true"
              >
                Sign In
              </button>
              <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
                Don't have an account?
                <Link
                  to="/Register"
                  className="ml-1 block font-sans text-sm font-bold leading-normal text-[#95f9ef] antialiased"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          <div
            className="flex justify-center items-center  bg-white cursor-pointer py-2 rounded-md   mb-7 mx-7 "
            onClick={handleGoogleLogin}
            style={{boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px"}}
          >
            <FcGoogle className="text-black text-4xl  cursor-pointer"></FcGoogle>
            <span className="font-semibold text-lg">Google </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
