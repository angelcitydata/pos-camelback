import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import VariantCard from "./VariantCard";

const ProductGrid = ({ products, cart, addToCart }) => {
  const [animatedProducts, setAnimatedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );

    setAnimatedProducts(
      sortedProducts.map((product) => ({
        ...product,
        animate: true,
      }))
    );

    const timeout = setTimeout(() => {
      setAnimatedProducts(
        sortedProducts.map((product) => ({
          ...product,
          animate: false,
        }))
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [products]);

  useEffect(() => {
    setSelectedProduct(null);
  }, [products]);

  const renderProducts = () => (
    <div className="scrollbar-hide grid flex-1 min-h-0 grid-cols-2 auto-rows-[17rem] gap-4 pt-1.5 overflow-y-auto md:grid-cols-3 xl:grid-cols-4">
      {animatedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => setSelectedProduct(product)}
        />
      ))}
    </div>
  );

  const renderVariants = () => {
    const sortedVariants = [...selectedProduct.variants].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

    return (
      <div className="flex flex-1 min-h-0 flex-col pt-1.5">
        <div className="scrollbar-hide grid flex-1 min-h-0 grid-cols-2 auto-rows-[17rem] gap-4 overflow-y-auto md:grid-cols-3 xl:grid-cols-4">
          {sortedVariants.map((variant) => {
            const cartId = `${selectedProduct.id}-${variant.id}`;
            const quantityInCart =
              cart.find((item) => item.id === cartId)?.quantity ?? 0;

            return (
              <VariantCard
                key={variant.id}
                variant={variant}
                productName={selectedProduct.name}
                quantityInCart={quantityInCart}
                onClick={() =>
                  addToCart({
                    id: cartId,
                    name:
                      variant.name === "Default Title"
                        ? selectedProduct.name
                        : `${selectedProduct.name} - ${variant.name}`,
                    price: variant.price,
                  })
                }
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-2xl">
      <div className="flex items-center gap-2 px-1 pb-1.5">
        {selectedProduct ? (
          <>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Back to products"
            >
              <i
                className="text-lg fa-solid fa-arrow-left hover:cursor-pointer"
                aria-hidden
              />
            </button>
            <h2 className="text-base font-semibold tracking-wide uppercase text-slate-900">
              {selectedProduct.name}
            </h2>
          </>
        ) : (
          <h2 className="text-base font-semibold tracking-wide uppercase text-slate-900">
            Products
          </h2>
        )}
      </div>
      {selectedProduct ? renderVariants() : renderProducts()}
    </div>
  );
};

export default ProductGrid;
