import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { MdAppRegistration } from "react-icons/md";

defineElement(lottie.loadAnimation);

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }),
    [theme];
  const handleToogle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const setUser = (user) => {
  //   // Your setUser logic here
  // };

  const navlink = (
    <>
      <li className="">
        <Link to="/" onClick={() => setIsDropdownOpen(false)}>
          Home
        </Link>
      </li>

      <li>
        <Link to="/allitems" onClick={() => setIsDropdownOpen(false)}>
          All Art & Craft Items
        </Link>
      </li>

      {user ? (
        <>
          <li>
            <Link to="/addcraftitem" onClick={() => setIsDropdownOpen(false)}>
              Add Craft Items
            </Link>
          </li>
          <li>
            <Link to="/art&craftlist" onClick={() => setIsDropdownOpen(false)}>
              My Art&Craft List
            </Link>
          </li>

          <li>
            <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
              View Profile
            </Link>
          </li>
        </>
      ) : (
        <li className="md:hidden">
          <Link to="/login" onClick={() => setIsDropdownOpen(false)}>
            Login/Register
          </Link>
        </li>
      )}
    </>
  );

  const logOutHandler = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          text: "Successfully logout",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <ToastContainer />
      <div className="navbar over bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost p-0 lg:hidden"
              onClick={toggleDropdown}
            >
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52 font-semibold "
              >
                {navlink}
              </ul>
            )}
          </div>
          <div className="flex gap-2 flex-row w-auto">
            <Link to="/">
              {" "}
              <img
                className=" md:w-12 md:h-12 w-full max-[450px]:hidden"
                src="/logo1.png"
                alt=""
              />{" "}
            </Link>
            <Link
              to="/"
              className="btn  btn-ghost lg:text-3xl md:text-2xl font-bold max-[450px]:text-2xl bg-gradient-to-r from-green-500 to-[#59C6D2] text-transparent bg-clip-text p-0"
            >
              FH GALLERY
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold  ">
            {navlink}
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" className="theme-controller" value="dark" />

            {/* sun icon */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {user ? (
            <>
              <div
                className="btn btn-ghost tooltip tooltip-bottom btn-circle avatar"
                onMouseEnter={() => setShowUserDetails(true)}
                onMouseLeave={() => setShowUserDetails(false)}
                data-tip={user.displayName}
              >
                {user.photoURL ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photoURL}
                    alt="User Avatar"
                  />
                ) : (
                  ""
                )}
              </div>
              <button className="btn " onClick={logOutHandler}>
                <LuLogOut />
                Log Out{" "}
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn max-[450px]:py-1 max-[450px]:hidden ">
                  {" "}
                  <LuLogIn className="max-[450px]:hidden" />
                  Login
                </button>
              </Link>
              <Link to="/registration">
                <button className="btn max-[450px]:py-1 max-[450px]:hidden ">
                  {" "}
                  <MdAppRegistration className="max-[450px]:hidden" />
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
