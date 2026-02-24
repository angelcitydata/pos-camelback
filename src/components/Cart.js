import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

const Cart = ({ cart, total, removeFromCart, saveCart }) => {
  return (
    <div className="flex flex-col h-full p-2 border border-gray-300 bg-gray-50">
      <h2 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
        Cart
      </h2>
      <ul className="flex-1 min-h-0 overflow-y-auto border-t border-gray-300">
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
