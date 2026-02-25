import React from "react";
import Blob, { DEFAULT_BLOB_INDEX } from "./Blob";

const Cart = ({ cart, total, removeFromCart, updateQuantity, saveCart }) => {
  const isEmpty = cart.length === 0;

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-2xl">
      <h2 className="px-1 pb-1.5 text-base font-semibold tracking-wide text-slate-900 uppercase">
        Cart
      </h2>
      {isEmpty ? (
        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-2 py-8">
          <div className="relative grid w-96 h-96 flex-shrink-0 place-items-center">
            <Blob
              index={DEFAULT_BLOB_INDEX}
              className="absolute inset-0 h-full w-full opacity-40"
              color="rgba(226, 232, 240, 0.5)"
            />
            <i
              className="fa-duotone fa-cart-circle-xmark relative z-10 text-9xl text-green-500"
              aria-hidden
            />
          </div>
          <div className="text-center px-4">
            <p className="text-slate-600 font-medium">Your cart is empty</p>
            <p className="mt-1 text-sm text-slate-500">
              Add something from the products to get started.
            </p>
          </div>
        </div>
      ) : (
        <ul className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {cart.map((item, index) => {
            const lineTotal = item.price * item.quantity;
            return (
              <li
                key={index}
                className="group flex items-start justify-between gap-3 py-4 text-[14px] border-b border-slate-200 last:border-b-0"
              >
                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <span className="font-medium text-slate-900 leading-tight">
                    {item.name}
                  </span>
                  <span className="text-slate-500 text-[13px]">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
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
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, -item.quantity)}
                      className="ml-4 inline-flex items-center justify-center w-7 h-7 rounded border border-slate-300 bg-white text-slate-400 text-sm transition hover:border-red-400 hover:bg-red-50 hover:text-red-500 active:bg-red-100 hover:cursor-pointer"
                      aria-label="Remove from cart"
                    >
                      <i
                        className="fa-regular fa-trash text-[12px]"
                        aria-hidden
                      />
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0 pt-0.5 text-right font-semibold text-slate-900 tabular-nums">
                  ${lineTotal.toFixed(2)}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="pt-4 mt-8 border-t border-slate-300">
        <div className="text-sm font-semibold text-right text-slate-900">
          Total: ${total.toFixed(2)}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            disabled={cart.length === 0}
            className="w-full mt-8 text-base p-4 font-semibold tracking-wide text-slate-400 uppercase transition border-2 border-slate-400 hover:bg-slate-700 hover:cursor-pointer hover:text-white hover:border-slate-700 active:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            onClick={saveCart}
          >
            Save Cart
          </button>
          <button
            type="button"
            disabled={cart.length === 0}
            className="w-full mt-8 text-base p-4 font-semibold tracking-wide text-white uppercase transition bg-green-600 border-2 border-green-600 hover:bg-green-700 hover:cursor-pointer active:bg-green-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            onClick={saveCart}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
