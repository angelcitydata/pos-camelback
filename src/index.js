import App from "./App";
import PreOrder from "./PreOrder";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { sampleProducts } from "./products";
window.loadApp = (json) => {
  const obj = JSON.parse(json);
  const {
    products,
    orderNumber,
    orderId,
    recordId,
    step = "newOrder",
    collections,
    orderMessage,
    message,
    cardMessage,
    deliveryAddresses,
    addresses,
    customerAddresses,
  } = obj;
  const queryClient = new QueryClient();

  const initialOrderMessage = orderMessage ?? message ?? cardMessage ?? "";
  const initialDeliveryAddresses =
    deliveryAddresses ?? addresses ?? customerAddresses ?? [];
  // alert("Products loaded: " + products.length);
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(
    <QueryClientProvider client={queryClient}>
      <App
        products={products ?? sampleProducts}
        orderNumber={orderNumber}
        orderId={orderId}
        step={step}
        collections={collections}
        recordId={recordId}
        initialOrderMessage={initialOrderMessage}
        initialDeliveryAddresses={initialDeliveryAddresses}
      />
    </QueryClientProvider>
  );
};;

window.loadPreOrder = () => {
  const container = document.getElementById("root");
  const root = createRoot(container);

  root.render(<PreOrder />);
};