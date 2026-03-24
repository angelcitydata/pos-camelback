

const OrderIsComplete = ({ orderStatus }) => {
  if (orderStatus === "complete") {
    return (
      <div className="order-complete">
        <h2>Order is complete!</h2>
        <p>Thank you for your purchase.</p>
        <div className="flex gap-4">
          <button
            type="button"
            // disabled={disableOrderActions}
            className="flex-1 p-4 mt-8 text-base font-semibold tracking-wide uppercase transition border-2 rounded-lg text-slate-400 border-slate-400 hover:bg-slate-700 hover:cursor-pointer hover:text-white hover:border-slate-700 active:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            onClick={() => saveCart("save")}
          >
            Set Up Delivery
          </button>
          <button
            type="button"
            // disabled={disableOrderActions}
            className="flex-1 p-4 mt-8 text-base font-semibold tracking-wide text-white uppercase transition bg-green-600 border-2 border-green-600 rounded-lg hover:bg-green-700 hover:cursor-pointer active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            onClick={() => {
              saveCart("checkout");
            }}
          >
            Finish
          </button>
          
        </div>
      </div>
    );
  }
  return null;
};

export default OrderIsComplete;