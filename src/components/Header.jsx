import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../contaxt/StateProvider";
import { actionType } from "../contaxt/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [isMenu, setIsMenu] = useState(false);

  const [{ user }, dispatch] = useStateValue();

  const logIn = async () => {
    if (user) {
      setIsMenu(!isMenu);
      return;
    }

    const response = await signInWithPopup(firebaseAuth, provider);
    const {
      user: { refreshToken, providerData },
    } = response;

    dispatch({ type: actionType.SET_USER, user: providerData[0] });

    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };

  return (
    <header className="fixd z-50 w-screen p-3 px-4 md:p-6 md:px-16">
      {/*------------ For out Desktop and tablet ---------------*/}

      {/* Logo for NavBar {Desktop and Tablet} */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="w-8 object-cover cursor-pointer"
          />
          <p className="text-headingColor text-xl font-bold cursor-pointer">
            Raj
          </p>
        </Link>

        <div className="flex items-center gap-7">
          {/* Nav menu options {Desktop and Tablet} */}
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>

          {/* Cart basket for shop list {Desktop and Tablet} */}
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />

            <div className="w-5 h-5  rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2 ">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          {/* User login and user place  */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="user"
              className="w-9 min-w-[40px] h-9 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={logIn}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col py-2"
              >
                {user && user.email === "sarafraj01999@gmail.com" && (
                  <Link to="/createItem">
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase">
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*-------------- For our Mobile -------------------  */}

      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo"
            className="w-8 object-cover cursor-pointer"
          />
          <p className="text-headingColor text-xl font-bold cursor-pointer">
            Raj
          </p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="user"
            className="w-9 min-w-[40px] h-9 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            onClick={logIn}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col"
            >
              {user && user.email === "sarafraj01999@gmail.com" && (
                <Link to="/createItem">
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor textbase">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                  About
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200 px-4 py-2">
                  Service
                </li>
              </ul>

              <p className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor textbase">
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
