import React, { useState, useEffect } from "react";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Filter from "./components/Filter";

function App({ products }) {
  const updatedProducts = products.map((product) => {
    const p = product.fieldData;
    return {
      id: p.PrimaryKey,
      name: p["Items Name"],
      price: p["Unit Price"],
      type: p.Item_Group,
    };
  });
  const menuItems = [
    ...new Set(updatedProducts.map((product) => product.type)),
  ];

  console.log(updatedProducts);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(updatedProducts);
  console.log("FP", filteredProducts);
  useEffect(() => {
    const filtered = updatedProducts.filter(
      (product) => filter === "All" || product.type === filter
    );
    setFilteredProducts(filtered);
  }, [filter]);

  const saveCart = () => {
    FileMaker.PerformScript("Save Cart", JSON.stringify(cart));
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
    <div className="flex flex-col min-h-screen pb-16 mb-10 bg-gray-200">
      {/* Main Content */}
      <div className="flex flex-1 p-6 space-x-6">
        <div className="flex flex-row flex-1 h-screen p-4 mb-4 overflow-y-auto bg-white rounded-lg shadow-lg">
          <div className="w-full h-full md:w-1/3 md:h-auto">
            <Cart
              cart={cart}
              total={total}
              removeFromCart={removeFromCart}
              saveCart={saveCart}
            />
          </div>

          <div className="w-9/12 p-2 overflow-y-auto bg-gray-100 ">
            {" "}
            <ProductGrid products={filteredProducts} addToCart={addToCart} />
          </div>
          <div className="w-3/12 pt-2 pb-8 pr-3 rounded-r-lg bg-blue-950">
            <Filter
              setFilter={setFilter}
              selectedFilter={filter}
              filters={menuItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
