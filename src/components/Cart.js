import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

const Cart = ({ cart, total, removeFromCart, saveCart }) => {
  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-2xl">
      <h2 className="px-1 pb-1.5 text-base font-semibold tracking-wide text-slate-900 uppercase">
        Cart
      </h2>
      <ul className="flex-1 min-h-0 overflow-y-auto">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-1.5 py-3 text-[14px] border-b border-gray-300"
          >
            <span className="leading-4 text-gray-700 ">
              {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
            </span>
            <button
              onClick={() => removeFromCart(index)}
              className="p-0.5 text-gray-500 transition hover:text-gray-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
      <div className="pt-2 mt-2 border-t border-gray-300">
        <div className="text-xs font-semibold text-right text-gray-700">
          Total: ${total.toFixed(2)}
        </div>
        <button
          className="w-full h-8 mt-2 text-[16px] font-medium tracking-wide text-white uppercase transition bg-blue-500 border border-blue-500 hover:bg-blue-600"
          onClick={saveCart}
        >
          Save Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
