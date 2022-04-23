import React, { useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { MdAddShoppingCart } from "react-icons/md";

const Item = ({ item, setItems }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const [alert, setAlert] = useState(false);

  const [sucess, setSucess] = useState(false);

  const showAlert = () => {
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 1500);
  };

  const showSucess = () => {
    setSucess(true);

    setTimeout(() => {
      setSucess(false);
    }, 1500);
  };

  return (
    <>
      <div
        key={item?.id}
        className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
      >
        <div className="w-full flex items-center justify-between">
          <motion.div
            className="w-40 h-40 -mt-8 drop-shadow-2xl"
            whileHover={{ scale: 1.2 }}
          >
            <img
              src={item?.imageURL}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>

          {alert ? (
            <div className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-center">
              Already Added
            </div>
          ) : (
            <></>
          )}

          {sucess ? (
            <div className="absolute top-0 right-0 bg-green-500 rounded-full p-1 text-center">
              Added to Cart
            </div>
          ) : (
            <></>
          )}

          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
            onClick={() => {
              if (cartItems.map((obj) => obj.id).includes(item.id)) {
                showAlert();
              } else {
                setItems([...cartItems, { ...item, qty: 1 }]);
                showSucess();
              }
            }}
          >
            <MdAddShoppingCart className="text-white" />
          </motion.div>
        </div>

        <div className="w-full flex flex-col items-end justify-end -mt-8">
          <p className="text-textColor font-semibold text-base md:text-lg">
            {item?.title}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {item?.calories} Calories
          </p>
          <div className="flex items-center gap-8">
            <p className="text-lg text-headingColor font-semibold">
              <span className="text-sm text-green-500">&#8377; </span>
              {item?.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
