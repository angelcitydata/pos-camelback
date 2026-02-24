import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";
import { products } from "./products";
window.loadApp = (json) => {
  console.log(products);
  const obj = JSON.parse(json);
  // const products = obj.data;
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(<App products={products} />);
};
