import React, { useState, useEffect } from "react";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Filter from "./components/Filter";

function App({ products, orderNumber, orderId,step }) {
  console.log(orderId, orderNumber);
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
  const [filterMode, setFilterMode] = useState("Collections");
  const [filter, setFilter] = useState("Top Ten");
  const [filteredProducts, setFilteredProducts] = useState(updatedProducts);

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

  const saveCart = (action) => {
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
      action,
      orderId,
      items: filemakerCart,
    };
    FileMaker.PerformScript("Save Cart", JSON.stringify(cartData));
    setCart([]);
  };
  const addToCart = (product) => {
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
        return [...prevCart, { ...product, quantity: 1 }];
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

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="min-h-screen text-gray-700 bg-slate-100">
      <div className="px-4 pt-4 text-left">
        <div className="text-lg font-semibold tracking-wide text-slate-900">
          Order #{orderNumber}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 md:p-4">
        <div className="grid h-[calc(100vh-2.5rem)] grid-cols-12 gap-4 p-2">
          <div className="min-h-0 col-span-12 p-4 md:col-span-2">
            <Filter
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
              cart={cart}
              addToCart={addToCart}
            />
          </div>
          <div className="min-h-0 col-span-12 md:col-span-4 lg:col-span-3">
            <Cart
              cart={cart}
              total={total}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              saveCart={saveCart}
              step={step}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
