

const OrderIsComplete = ({ orderStatus, saveCart }) => {
  if (orderStatus === "complete") {
    return (
      <section className="relative w-full max-w-2xl p-6 mx-auto mt-8 overflow-hidden border shadow-xl rounded-3xl border-emerald-200/70 bg-linear-to-br from-white via-emerald-50/40 to-emerald-100/40 shadow-emerald-200/40 sm:p-8">
        <div className="absolute rounded-full pointer-events-none -top-16 -right-14 h-44 w-44 bg-emerald-300/30 blur-3xl" />
        <div className="absolute w-40 h-40 rounded-full pointer-events-none -bottom-20 -left-10 bg-lime-300/30 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-3 inline-flex items-center rounded-full border border-emerald-200 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase shadow-sm">
            Order Confirmed
          </div>

          <h2 className="text-3xl font-black tracking-tight text-balance text-slate-900 sm:text-4xl">
            Order is complete!
          </h2>
          <p className="max-w-xl mt-2 text-base text-pretty text-slate-600 sm:text-lg">
            Thank you for your purchase. You can finish now or set up delivery
            in the next step.
          </p>

          <i
            className="relative mt-6 text-emerald-500 fa-duotone fa-party-horn text-7xl drop-shadow-[0_10px_20px_rgba(16,185,129,0.35)] sm:text-8xl"
            aria-hidden
          />

          <div className="flex flex-col w-full gap-3 mt-8 sm:flex-row sm:gap-4">
            <button
              type="button"
              // disabled={disableOrderActions}
              className="flex-1 rounded-xl border-2 border-slate-300 bg-white/90 px-5 py-3.5 text-sm font-semibold tracking-[0.14em] text-slate-700 uppercase shadow-sm transition hover:cursor-pointer hover:border-slate-700 hover:bg-slate-800 hover:text-white active:scale-[0.99] active:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-300 disabled:hover:bg-white"
              onClick={() => saveCart("delivery")}
            >
              Set Up Delivery
            </button>
            <button
              type="button"
              // disabled={disableOrderActions}
              className="flex-1 rounded-xl border-2 border-emerald-600 bg-emerald-600 px-5 py-3.5 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-lg shadow-emerald-300/50 transition hover:cursor-pointer hover:border-emerald-700 hover:bg-emerald-700 active:scale-[0.99] active:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-emerald-600 disabled:hover:bg-emerald-600"
              onClick={() => {
                saveCart("finish");
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default OrderIsComplete;