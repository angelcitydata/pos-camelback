import React, { useState, useEffect } from "react";
import CheckoutMethod from "./Checkout/CheckoutMethod";
import PaymentDetail from "./Checkout/PaymentDetail";
import ProcessingScreen from "./Checkout/ProcessingScreen";
import PaymentComplete from "./Checkout/PaymentComplete";

import { checkoutActions } from "../utlis/filemakerBridge";

const CheckoutPage = ({ orderInfo = {}, storedPaymentMethods = [] }) => {
  const [view, setView] = useState("paymentDetail"); // 'paymentDetail', 'checkout', 'processing', 'complete'
  const [checkoutData, setCheckoutData] = useState(null); // Store payment form data and checkout selections

  // Listen for messages from FileMaker
  useEffect(() => {
    const handleFileMakerMessage = (event) => {
      if (event.data && event.data.message === "success") {
        setView("complete");
      }
    };

    // Set up global function for FileMaker to call
    window.handlePaymentResponse = (response) => {
      console.log("Received response from FileMaker:", response);
      try {
        const data =
          typeof response === "string" ? JSON.parse(response) : response;
        console.log("Parsed FileMaker response data:", data);
        if (data.message === "success") {
          setView("complete");
        }
      } catch (error) {
        console.error("Error parsing FileMaker response:", error);
      }
    };

    return () => {
      delete window.handlePaymentResponse;
    };
  }, []);

  const handleProcess = (stripeCheckoutData) => {
    // Show processing screen
    setView("processing");

    // Keep form data and checkout method selections separate
    const completeCheckoutData = {
      orderInfo,
      paymentDetail: checkoutData,
      checkoutMethod: stripeCheckoutData,
      paymentMethod: checkoutData.paymentMethod,
    };
    console.log(
      "Complete Checkout Data to send to FileMaker:",
      completeCheckoutData
    );
    checkoutActions.process(completeCheckoutData);
  };

  const handleDone = (formData) => {
    // Send checkout data to FileMaker with separate properties
    checkoutActions.done({
      paymentDetail: formData,
      checkoutMethod: null,
      orderInfo,
    });
  };

  const handleGoBack = () => {
    // Go back from checkout to payment detail
    setView("paymentDetail");
  };

  const backToOrder = () => {
    checkoutActions.toOrder();
  };
  const handleProceedToCheckout = (formData) => {
    // Store payment data as checkout data
    setCheckoutData(formData);

    // Only proceed to checkout if payment method is Credit Card
    if (
      formData?.paymentMethod?.toLowerCase().includes("credit") ||
      formData?.paymentMethod?.toLowerCase().includes("card")
    ) {
      setView("checkout");
    } else {
      // For non-credit card payments, send data and complete
      handleDone(formData);
    }
  };

  const handleComplete = () => {
    checkoutActions.done({
      paymentDetail: checkoutData,
      checkoutMethod: null,
      orderInfo,
    });
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      {view === "paymentDetail" && (
        <PaymentDetail
          orderInfo={orderInfo}
          onDone={handleProceedToCheckout}
          backToOrder={backToOrder}
        />
      )}
      {view === "checkout" && (
        <CheckoutMethod
          storedPaymentMethods={storedPaymentMethods}
          onProcess={handleProcess}
          onGoBack={handleGoBack}
        />
      )}
      {view === "processing" && <ProcessingScreen />}
      {view === "complete" && <PaymentComplete onDone={handleComplete} />}
    </div>
  );
};

export default CheckoutPage;
