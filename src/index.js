import App from "./App";
import PreOrder from "./PreOrder";
import React from "react";
import { createRoot } from "react-dom/client";
// import { products } from "./products";
window.loadApp = (json) => {
  const obj = JSON.parse(json);
  console.log(obj);
  const {
    products,
    orderNumber,
    orderId,
    step = "newOrder",
    collections,
  } = obj;
  // alert("Products loaded: " + products.length);
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(
    <App
      products={products}
      orderNumber={orderNumber}
      orderId={orderId}
      step={step}
      collections={collections}
    />
  );
};;

window.loadPreOrder = () => {
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(<PreOrder />);
};