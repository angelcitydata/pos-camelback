import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import OrderIsComplete from "./components/OrderIsComplete";
import CheckoutPage from "./components/CheckoutPage";
const confettiColors = [
  "#10b981",
  "#34d399",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#f97316",
];

const normalizeDeliveryAddresses = (rawAddresses) => {
  if (!rawAddresses) {
    return [];
  }

  if (Array.isArray(rawAddresses)) {
    return rawAddresses
      .map((entry) => {
        if (typeof entry === "string") {
          return entry.trim();
        }

        if (entry && typeof entry === "object") {
          return (
            entry.label ||
            entry.address ||
            entry.name ||
            entry.value ||
            ""
          )
            .toString()
            .trim();
        }

        return "";
      })
      .filter(Boolean);
  }

  if (typeof rawAddresses === "string") {
    return rawAddresses
      .split(/\r?\n/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
};

function App({
  products,
  orderNumber,
  orderId,
  step,
  collections,
  recordId,
  initialDeliveryAddresses = [],
}) {
  const updatedProducts = products.map((product) => {
    const fieldData = product.fieldData || {};
    const variants = (product.portalData?.prod_VARIANT || []).map(
      (variant) => ({
        id:
          Number(variant["prod_VARIANT::__kp_Variant_ID"]) ||
          variant["prod_VARIANT::__kp_Variant_ID"] ||
          Number(variant.recordId) ||
          variant.recordId,
        productId: Number(fieldData.__kp_Product_ID) || product.recordId,
        image: variant["prod_rate_docjoin_DOC::ThumbnailBase64"]
          ? `data:image/png;base64,${variant["prod_rate_docjoin_DOC::ThumbnailBase64"]}`
          : null,
        name: variant["prod_VARIANT::Description__c"] || "Variant",
        price: Number(variant["prod_VARIANT::Price"]) || 0,
        sortOrder: Number(variant["prod_VARIANT::SortOrder"]) || 0,
      })
    );
    const collectionPortalData =
      product.portalData?.prod_colljoin_COLL ||
      product.portalData?.prod_COLLECTION__vl ||
      [];

    const collections = collectionPortalData
      .map(
        (collection) =>
          collection["prod_colljoin_COLL::Collection"] ||
          collection["prod_COLLECTION__vl::Collection"]
      )
      .filter(Boolean);

    const thumbBase64 = fieldData.ThumbBase64;
    const image = thumbBase64 ? `data:image/png;base64,${thumbBase64}` : null;

    return {
      id: Number(fieldData.__kp_Product_ID) || product.recordId,
      name: fieldData.ProductName || "Unnamed Product",
      variants,
      collections,
      isTopTen: Boolean(fieldData.flag_topTen),
      type: fieldData.ProductType__c || "General",
      image,
    };
  });

  const collectionFilters = [
    ...new Set(
      updatedProducts.flatMap((product) => product.collections).filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));
  const productTypeFilters = [
    ...new Set(updatedProducts.map((product) => product.type).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b));

  const [cart, setCart] = useState([]);
  const [orderStatus, setOrderStatus] = useState("open");
  const [customer, setCustomer] = useState(null);
  const [deliveryAddresses, setDeliveryAddresses] = useState(
    normalizeDeliveryAddresses(initialDeliveryAddresses)
  );
  const [filterMode, setFilterMode] = useState("Collections");
  const [filter, setFilter] = useState("Top Ten");
  const [filteredProducts, setFilteredProducts] = useState(updatedProducts);
  const [productGridResetToken, setProductGridResetToken] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfettiBurst, setShowConfettiBurst] = useState(false);
  const [confettiBurstToken, setConfettiBurstToken] = useState(0);

  const confettiPieces = useMemo(() => {
    if (!showConfettiBurst) {
      return [];
    }

    return Array.from({ length: 72 }, (_, index) => ({
      id: `${confettiBurstToken}-${index}`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 240}ms`,
      duration: `${1300 + Math.random() * 900}ms`,
      drift: `${-120 + Math.random() * 240}px`,
      rise: `${55 + Math.random() * 30}vh`,
      rotate: `${540 + Math.random() * 540}deg`,
      size: `${6 + Math.random() * 8}px`,
      color: confettiColors[index % confettiColors.length],
    }));
  }, [confettiBurstToken, showConfettiBurst]);

  const menuItems =
    filterMode === "Collections"
      ? ["Top Ten", ...collectionFilters]
      : ["Top Ten", ...productTypeFilters];

  const filterCounts = {
    "Top Ten": updatedProducts.filter((product) => product.isTopTen).length,
  };

  if (filterMode === "Collections") {
    collectionFilters.forEach((collection) => {
      filterCounts[collection] = updatedProducts.filter((product) =>
        product.collections.includes(collection)
      ).length;
    });
  } else {
    productTypeFilters.forEach((type) => {
      filterCounts[type] = updatedProducts.filter(
        (product) => product.type === type
      ).length;
    });
  }

  useEffect(() => {
    setFilter("Top Ten");
  }, [filterMode]);

  useEffect(() => {
    const filtered = updatedProducts.filter((product) => {
      if (filter === "Top Ten") {
        return product.isTopTen;
      }

      if (filterMode === "Collections") {
        return product.collections.includes(filter);
      }

      return product.type === filter;
    });

    setFilteredProducts(filtered);
  }, [filter, filterMode, products]);

  useEffect(() => {
    if (orderStatus === "complete") {
      setCart([]);
      setFilterMode("Collections");
      setFilter("Top Ten");
      setProductGridResetToken((prevToken) => prevToken + 1);
      setShowCheckout(false);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (orderStatus !== "complete") {
      setShowConfettiBurst(false);
      return;
    }

    setConfettiBurstToken((prevToken) => prevToken + 1);
    setShowConfettiBurst(true);

    const timeoutId = setTimeout(() => {
      setShowConfettiBurst(false);
    }, 2400);

    return () => clearTimeout(timeoutId);
  }, [orderStatus]);

  const buildOrderGroups = (items) => {
    const groups = [];

    items.forEach((item, index) => {
      const fulfillmentType = item.fulfillmentType || "pickup";
      const rawAddress = (item.deliveryAddress || "").trim();
      const addressLabel = rawAddress || "Unassigned Delivery Address";
      const groupKey =
        fulfillmentType === "delivery"
          ? `delivery:${addressLabel.toLowerCase()}`
          : "pickup";

      let group = groups.find((entry) => entry.groupKey === groupKey);
      if (!group) {
        group = {
          groupKey,
          fulfillmentType,
          deliveryAddress: fulfillmentType === "delivery" ? rawAddress : "",
          items: [],
        };
        groups.push(group);
      }

      group.items.push({ ...item, cartIndex: index });
    });

    return groups;
  };

  const handleNewCustomer = () => {
    FileMaker.PerformScript("New Customer at POS");
  };
  window.getNewCustomerFromFileMaker = (json) => {
    const obj = JSON.parse(json);
    const customer = obj.customer;
    setCustomer(customer);
    // You can add any additional handling logic here if needed
  };
  window.updateOrderStatus = (status) => {
    setOrderStatus(status);
  };
  const saveCart = (action) => {
    const orderGroups = buildOrderGroups(cart);

    const filemakerCart = cart.map((item) => ({
      action: "create",
      layouts: "api_orderItems",
      fieldData: {
        ItemName: item.name,
        // Price__lu: item.price,
        Qty: item.quantity,
        Unit: item.unit || "",
        _kf_OrderID: orderId,
        _kf_ProductID: item.productId,
        _kf_VariantID: item.variantId,
      },
    }));

    const cartData = {
      customer,
      action,
      orderId,
      recordId,
      items: filemakerCart,
      splitIntoMultipleOrders: false,
      orderGroups: orderGroups.map((group) => ({
        groupKey: group.groupKey,
        fulfillmentType: group.fulfillmentType,
        deliveryAddress: group.deliveryAddress,
        items: group.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          fulfillmentType: item.fulfillmentType || "pickup",
          deliveryAddress:
            item.fulfillmentType === "delivery"
              ? item.deliveryAddress || ""
              : "",
        })),
      })),
    };

    FileMaker.PerformScript("Save Cart", JSON.stringify(cartData));
    // setCart([]);
  };
console.log(customer);
  const addToCart = (product) => {
    if (orderStatus === "complete") {
      return;
    }

    setCart((prevCart) => {
      const productIndex = prevCart.findIndex(
        (item) =>
          item.productId === product.productId &&
          item.variantId === product.variantId
      );
      if (productIndex !== -1) {
        return prevCart.map((item, index) =>
          index === productIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
            fulfillmentType: "pickup",
            deliveryAddress: "",
          },
        ];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      } else {
        updatedCart.splice(index, 1);
      }
      return updatedCart;
    });
  };

  const updateQuantity = (index, delta) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const newQty = updatedCart[index].quantity + delta;
      if (newQty < 1) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index] = { ...updatedCart[index], quantity: newQty };
      }
      return updatedCart;
    });
  };

  const updateDeliveryAddress = (index, deliveryAddress) => {
    setCart((prevCart) =>
      prevCart.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              deliveryAddress,
            }
          : item
      )
    );
  };

  const addDeliveryAddress = (address) => {
    const normalizedAddress = address.trim();
    if (!normalizedAddress) {
      return;
    }

    setDeliveryAddresses((prevAddresses) => {
      if (
        prevAddresses.some(
          (existingAddress) =>
            existingAddress.toLowerCase() === normalizedAddress.toLowerCase()
        )
      ) {
        return prevAddresses;
      }

      return [...prevAddresses, normalizedAddress];
    });
  };

  const orderGroups = buildOrderGroups(cart);
  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const fileMakerCart = cart.map((item) => ({
    action: "create",
    layouts: "api_orderItems",
    fieldData: {
      ItemName: item.name,
      Qty: item.quantity,
      Unit: item.unit || "",
      _kf_OrderID: orderId,
      _kf_ProductID: item.productId,
      _kf_VariantID: item.variantId,
    },
  }));

  return (
    <div className="min-h-screen text-gray-700 bg-slate-100">
      {showConfettiBurst && (
        <div className="app-confetti-layer" aria-hidden>
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="app-confetti-piece"
              style={{
                left: piece.left,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                "--confetti-delay": piece.delay,
                "--confetti-duration": piece.duration,
                "--confetti-drift": piece.drift,
                "--confetti-rise": piece.rise,
                "--confetti-rotate": piece.rotate,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 px-4 pt-4 text-left md:flex-row md:items-center ">
        <div className="text-lg font-semibold tracking-wide text-slate-900">
          Order #{orderNumber}
        </div>
        {/* <CustomerSelect
          selectedCustomer={customer}
          onSelectCustomer={(customer) => {
            setCustomer(customer);
          }}
        /> */}
      </div>

      {/* Main Content */}
      <div className="p-3 md:p-4">
        <div className="grid h-[calc(100vh-2.5rem)] grid-cols-12 gap-4 p-2">
          <div className="min-h-0 col-span-12 p-4 md:col-span-2">
            <Filter
              collections={collections}
              setFilter={setFilter}
              selectedFilter={filter}
              filters={menuItems}
              filterCounts={filterCounts}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
            />
          </div>
          <div className="min-h-0 col-span-12 md:col-span-6 lg:col-span-7">
            <ProductGrid
              products={filteredProducts}
              allProducts={updatedProducts}
              cart={cart}
              addToCart={addToCart}
              isLocked={orderStatus === "complete"}
              resetToken={productGridResetToken}
            />
          </div>
          <div className="min-h-0 col-span-12 md:col-span-4 lg:col-span-3">
            {orderStatus === "complete" ? (
              <OrderIsComplete orderStatus={orderStatus} saveCart={saveCart} />
            ) : (
              <Cart
                cart={cart}
                step={step}
                updateQuantity={updateQuantity}
                updateDeliveryAddress={updateDeliveryAddress}
                deliveryAddresses={deliveryAddresses}
                addDeliveryAddress={addDeliveryAddress}
                total={total}
                saveCart={saveCart}
                handleNewCustomer={handleNewCustomer}
                selectedCustomer={customer}
                onSelectCustomer={(customer) => {
                  setCustomer(customer);
                }}
                onCheckout={() => setShowCheckout(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Checkout Drawer Portal */}
      {showCheckout &&
        createPortal(
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Dim overlay */}
            <div
              className="checkout-overlay absolute inset-0 bg-black/50 backdrop-blur-[2px]"
              onClick={() => setShowCheckout(false)}
            />
            {/* Drawer */}
            <div className="relative z-10 flex flex-col w-1/2 h-full shadow-2xl checkout-drawer bg-slate-100">
              <div className="flex flex-col flex-1 min-h-0 gap-0 p-4">
                <CheckoutPage
                  orderInfo={{
                    cart: fileMakerCart,
                    total,
                    orderId,
                    recordId,
                    orderNumber,
                    customer,
                  }}
                  onBack={() => setShowCheckout(false)}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default App;
