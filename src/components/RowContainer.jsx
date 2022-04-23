import React, { useEffect, useRef, useState } from "react";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import Item from "./Item";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  useEffect(() => {
    if (scrollValue > 0) {
      rowContainer.current.scrollLeft += 250;
    } else {
      rowContainer.current.scrollLeft -= 250;
    }
  }, [scrollValue]);

  useEffect(() => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => <Item item={item} setItems={setItems} />)
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" alt="Not Found" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
