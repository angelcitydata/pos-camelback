import React from "react";
import Blob, { DEFAULT_BLOB_INDEX } from "./Blob";

const Cart = ({
  cart,
  total,
  removeFromCart,
  updateQuantity,
  saveCart,
  step,
}) => {
  const isEmpty = cart.length === 0;

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-2xl">
      <h2 className="px-1 pb-4 text-base font-semibold tracking-wide text-slate-900 uppercase">
        Cart
      </h2>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center flex-1 min-h-0 gap-2 py-8">
          <div className="relative grid flex-shrink-0 w-96 h-96 place-items-center">
            <Blob
              index={DEFAULT_BLOB_INDEX}
              className="absolute inset-0 w-full h-full opacity-40"
              color="rgba(226, 232, 240, 0.5)"
            />
            <i
              className="relative z-10 text-green-500 fa-duotone fa-cart-circle-xmark text-9xl"
              aria-hidden
            />
          </div>
          <div className="px-4 text-center">
            <p className="font-medium text-slate-600">Your cart is empty</p>
            <p className="mt-1 text-sm text-slate-500">
              Add something from the products to get started.
            </p>
          </div>
        </div>
      ) : (
        <ul className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {cart.map((item, index) => {
            const lineTotal = item.price * item.quantity;
            const itemKey =
              item.productId != null && item.variantId != null
                ? `${item.productId}-${item.variantId}`
                : `${item.name}-${index}`;
            return (
              <li
                key={itemKey}
                className="group flex items-start justify-between gap-3 py-4 text-[14px] border-b border-slate-200 last:border-b-0"
              >
                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <span className="font-medium leading-tight text-slate-900">
                    {item.name}
                  </span>
                  <span className="text-slate-500 text-[13px]">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, -1)}
                      className="inline-flex items-center justify-center text-sm font-medium transition bg-white border rounded w-7 h-7 border-slate-300 text-slate-600 hover:bg-slate-50 active:bg-slate-200 hover:cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-6 text-sm font-semibold text-center tabular-nums text-slate-700">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, 1)}
                      className="inline-flex items-center justify-center text-sm font-medium transition bg-white border rounded w-7 h-7 border-slate-300 text-slate-600 hover:bg-slate-50 active:bg-slate-200 hover:cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, -item.quantity)}
                      className="inline-flex items-center justify-center ml-4 text-sm transition bg-white border rounded w-7 h-7 border-slate-300 text-slate-400 hover:border-red-400 hover:bg-red-50 hover:text-red-500 active:bg-red-100 hover:cursor-pointer"
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
        {step === "newOrder" && (
          <div className="text-sm font-semibold text-right text-slate-900">
            Total: ${total.toFixed(2)}
          </div>
        )}
        {step === "newOrder" && (
          <div className="flex gap-4">
            <button
              type="button"
              disabled={cart.length === 0}
              className="w-full p-4 mt-8 text-base font-semibold tracking-wide uppercase transition border-2 rounded-lg text-slate-400 border-slate-400 hover:bg-slate-700 hover:cursor-pointer hover:text-white hover:border-slate-700 active:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
              onClick={() => saveCart("save")}
            >
              Save Cart
            </button>
            <button
              type="button"
              disabled={cart.length === 0}
              className="w-full p-4 mt-8 text-base font-semibold tracking-wide text-white uppercase transition bg-green-600 border-2 border-green-600 rounded-lg hover:bg-green-700 hover:cursor-pointer active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
              onClick={() => {
                saveCart("checkout");
              }}
            >
              Check Out
            </button>
          </div>
        )}
        {step === "add" && (
          <button
            type="button"
            disabled={cart.length === 0}
            className="w-full p-4 mt-8 text-base font-semibold tracking-wide text-white uppercase transition bg-green-600 border-2 border-green-600 rounded-lg hover:bg-green-700 hover:cursor-pointer active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            onClick={() => saveCart("addToOrder")}
          >
            Add to Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
