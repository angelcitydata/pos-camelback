import React from "react";

const Cart = ({ cart, total, removeFromCart, updateQuantity, saveCart }) => {
  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-2xl">
      <h2 className="px-1 pb-1.5 text-base font-semibold tracking-wide text-slate-900 uppercase">
        Cart
      </h2>
      <ul className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        {cart.map((item, index) => {
          const lineTotal = item.price * item.quantity;
          return (
            <li
              key={index}
              className="flex items-center justify-between gap-3 py-4 text-[14px] border-b border-slate-200"
            >
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                <span className="font-medium text-slate-900 leading-tight">
                  {item.name}
                </span>
                <span className="text-slate-500 text-[13px]">
                  ${item.price.toFixed(2)} x {item.quantity}
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, -1)}
                    className="inline-flex items-center justify-center w-7 h-7 rounded border border-slate-300 bg-white text-slate-600 text-sm font-medium transition hover:bg-slate-50 active:bg-slate-200 hover:cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold tabular-nums text-slate-700">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, 1)}
                    className="inline-flex items-center justify-center w-7 h-7 rounded border border-slate-300 bg-white text-slate-600 text-sm font-medium transition hover:bg-slate-50 active:bg-slate-200 hover:cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0 text-right font-semibold text-slate-900 tabular-nums">
                ${lineTotal.toFixed(2)}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="pt-4 mt-8 border-t border-slate-300">
        <div className="text-sm font-semibold text-right text-slate-700">
          Total: ${total.toFixed(2)}
        </div>
        <button
          type="button"
          disabled={cart.length === 0}
          className="w-full mt-8 text-base p-4 font-semibold tracking-wide text-white uppercase transition bg-green-600 border border-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
          onClick={saveCart}
        >
          Save Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
