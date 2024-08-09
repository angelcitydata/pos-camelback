import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

const Cart = ({ cart, total, removeFromCart, saveCart }) => {
  return (
    <div className="flex flex-col h-full gap-4 p-4 pb-4 rounded-l-lg bg-gray-50 ">
      <h2 className="mb-4 text-xl font-bold">Cart</h2>
      <ul className="max-h-screen overflow-y-auto">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 border-b"
          >
            <span>
              {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
            </span>
            <button
              onClick={() => removeFromCart(index)}
              className="text-gray-500 hover:text-red-500"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex-row mt-auto border-t-2">
        <div className="mt-4 text-lg font-bold text-right">
          Total: ${total.toFixed(2)}
        </div>
        <button
          className="w-full p-2 mt-6 text-white bg-blue-500 rounded-md"
          onClick={saveCart}
        >
          Save Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
