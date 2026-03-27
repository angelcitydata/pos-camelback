/**
 * FileMaker Bridge Utility
 * Handles communication between React widget and FileMaker
 */

/**
 * Execute a FileMaker script with a parameter
 * @param {string} scriptName - Name of the FileMaker script to run
 * @param {object|string} parameter - Parameter to pass to the script
 */
export const runFileMakerScript = (scriptName, parameter) => {
  // Convert parameter to JSON string if it's an object
  const paramString = typeof parameter === 'object' 
    ? JSON.stringify(parameter) 
    : parameter;

  // Check if FileMaker object is available
  if (window.FileMaker) {
    window.FileMaker.PerformScript(scriptName, paramString);
  } else {
    console.warn('FileMaker object not available. Script not executed:', {
      scriptName,
      parameter: paramString
    });
  }
};

/**
 * Main checkout controller function
 * Routes all checkout actions to FileMaker's "OrderCheckout" script
 * @param {string} action - The action to perform (e.g., 'process', 'done', 'goBack')
 * @param {object} data - Additional data for the action
 */
export const orderCheckout = (action, data = {}) => {
  const parameter = {
    action,
    data,
    timestamp: new Date().toISOString()
  };

  runFileMakerScript('OrderCheckout', parameter);
};

/**
 * Specific checkout actions
 */
export const checkoutActions = {
  // Process the checkout with selected method and payment
  process: (checkoutData) => {
    orderCheckout('process', checkoutData);
  },

  // Complete and close the payment detail view
  done: (checkoutData) => {
    orderCheckout('done', checkoutData);
  },

  // Navigate back to order view
  goBack: (checkoutData) => {
    orderCheckout('goBack', checkoutData);
  },
toOrder: () => {
    orderCheckout('toOrder', {} );
  },
  // Card present checkout
  cardPresent: (checkoutData) => {
    orderCheckout('cardPresent', checkoutData);
  },

  // Card not present checkout
  cardNotPresent: (checkoutData) => {
    orderCheckout('cardNotPresent', checkoutData);
  },

  // Send payment link to customer
  sendToCustomer: (checkoutData) => {
    orderCheckout('sendToCustomer', checkoutData);
  },

  // Keep checkout local
  keepLocal: (checkoutData) => {
    orderCheckout('keepLocal', checkoutData);
  },

  // Use stored payment method
  useStoredPayment: (checkoutData) => {
    orderCheckout('useStoredPayment', checkoutData);
  }
};

export default orderCheckout;
