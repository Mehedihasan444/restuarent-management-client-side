import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../CustomHooks/useAuth";
import { Helmet } from "react-helmet-async";
import useAxios from "../CustomHooks/useAxios";

const Register = () => {
  const axios = useAxios();
  const { createUser, UpdateName } = useAuth();
  const [resisterError, setResisterError] = useState("");
  const [resisterSuccess, setResisterSuccess] = useState("");
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
const location =useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.Name.value;
    const imageUrl = e.target.ImageURL.value;
    const email = e.target.Email.value;
    const Password = e.target.Password.value;
    const Checkbox = e.target.Checkbox.checked;

    // password validation
    if (Password.length < 6) {
      setResisterError("Password should be at least 6 characters long.");
      return;
    } else if (!/[A-Z]/.test(Password)) {
      setResisterError("Password should contain at least 1 capital letter.");
      return;
    }
    // eslint-disable-next-line no-useless-escape
    else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(Password)) {
      setResisterError("Password should contain at least 1 special character.");
      return;
    } else if (!Checkbox) {
      setResisterError("Please accept our terms and conditions.");
      return;
    }

    //reset error
    setResisterError("");
    setResisterSuccess("");
    setProfileUpdateSuccess("");
    //create user
    createUser(email, Password)
      .then(() => {

        const CurrentUser = { email };
        // get access token
        axios.post("/auth/access-token", CurrentUser).then((res) => {
          console.log(res.data);
          if (res.data.success) {
            navigate(location?.state ? location.state : "/");
          }
        });


        const userInfo = {
          name: name,
          image: imageUrl,
          email: email,
          role:"user"
        };
        axios.post("/users", userInfo)
        .then(res=>console.log(res.data))

        Swal.fire({
          icon: "success",
          title: "Done",
          text: "User created successfully!",
        });

        setResisterSuccess("User created successfully.");
        navigate("/");
        UpdateName(name, imageUrl);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });

        console.log(error.message);

        setResisterError(error.message);
      });
  };
  return (
    <div className="">
      <Helmet>
        <title>Register</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div></div>
      <div className="flex justify-center items-center h-[100vh] ">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-md p-5">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#1dcdbc] to-[#95f9ef] bg-clip-border text-white shadow-lg shadow-[#95f9ef]">
            <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
              Sign Up
            </h3>
          </div>
         
          <form
            onSubmit={handleRegister}
            className="mt-8 mb-2 w-64 max-w-screen-lg sm:w-96"
          >
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="text"
                  name="Name"
                  required
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#1dcdbc] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#1dcdbc] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#1dcdbc] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#1dcdbc] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Name
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="url"
                  name="ImageURL"
                  required
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#1dcdbc] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#1dcdbc] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#1dcdbc] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#1dcdbc] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  ImageURL
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="email"
                  name="Email"
                  required
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#1dcdbc] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#1dcdbc] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#1dcdbc] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#1dcdbc] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px] ">
                <input
                  name="Password"
                  required
                  type={showPassword ? "text" : "password"}
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#1dcdbc] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#1dcdbc] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#1dcdbc] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#1dcdbc] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
                <span
                  className="cursor-pointer absolute top-3 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                htmlFor="checkbox"
                data-ripple-dark="true"
              >
                <input
                  name="Checkbox"
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#1dcdbc] checked:bg-[#1dcdbc] checked:before:bg-[#1dcdbc] hover:before:opacity-10"
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
                <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                  I agree the
                  <a
                    className="font-medium transition-colors hover:text-[#1dcdbc]"
                    href="#"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </p>
              </label>
            </div>
            <button
              className="mt-6 block w-full select-none rounded-lg bg-[#1dcdbc] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#95f9ef] transition-all hover:shadow-lg hover:shadow-[#95f9ef] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Register
            </button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Already have an account?
              <Link
                className="font-medium text-[#1dcdbc] transition-colors hover:text-blue-700"
                to="/Login"
              >
                Sign In
              </Link>
            </p>
          </form>
          {resisterError && <p className="text-red-700">{resisterError}</p>}
          {resisterSuccess && (
            <p className="text-green-600">{resisterSuccess}</p>
          )}
          {profileUpdateSuccess && (
            <p className="text-green-600">{profileUpdateSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
