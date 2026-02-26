import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
// import { products } from "./products";
window.loadApp = (json) => {
  const obj = JSON.parse(json);
  const products = obj.products;
  const orderNumber = obj.orderNumber;
  // alert("Products loaded: " + products.length);
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(<App products={products} orderNumber={orderNumber} />);
};;
