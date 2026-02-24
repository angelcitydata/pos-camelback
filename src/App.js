import React, { useState, useEffect } from "react";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Filter from "./components/Filter";

function App({ products }) {
  const updatedProducts = products.map((product) => {
    const fieldData = product.fieldData || {};
    const variants = (product.portalData?.prod_VARIANT || []).map(
      (variant) => ({
        id: Number(variant.recordId) || variant.recordId,
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

    return {
      id: Number(fieldData.__kp_Product_ID) || product.recordId,
      name: fieldData.ProductName || "Unnamed Product",
      variants,
      collections,
      isTopTen: Boolean(fieldData.flag_topTen),
      type: fieldData.ProductType__c || "General",
    };
  });

  const collectionFilters = [
    ...new Set(
      updatedProducts.flatMap((product) => product.collections).filter(Boolean)
    ),
  ];
  const productTypeFilters = [
    ...new Set(updatedProducts.map((product) => product.type).filter(Boolean)),
  ];

  const [cart, setCart] = useState([]);
  const [filterMode, setFilterMode] = useState("Collections");
  const [filter, setFilter] = useState("Top Ten");
  const [filteredProducts, setFilteredProducts] = useState(updatedProducts);

  const menuItems =
    filterMode === "Collections"
      ? ["Top Ten", ...collectionFilters]
      : ["Top Ten", ...productTypeFilters];

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

  const saveCart = () => {
    FileMaker.PerformScript("Save Cart", JSON.stringify(cart));
    setCart([]);
  };
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
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

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="min-h-screen text-gray-700 bg-slate-100">
      {/* Main Content */}
      <div className="p-3 md:p-4">
        <div className="grid h-[calc(100vh-2rem)] grid-cols-12 gap-4 p-2">
          <div className="col-span-12 md:col-span-2 min-h-0 p-4">
            <Filter
              setFilter={setFilter}
              selectedFilter={filter}
              filters={menuItems}
              filterMode={filterMode}
              setFilterMode={setFilterMode}
            />
          </div>
          <div className="min-h-0 col-span-12 md:col-span-6 lg:col-span-7">
            <ProductGrid products={filteredProducts} addToCart={addToCart} />
          </div>
          <div className="min-h-0 col-span-12 md:col-span-4 lg:col-span-3">
            <Cart
              cart={cart}
              total={total}
              removeFromCart={removeFromCart}
              saveCart={saveCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
