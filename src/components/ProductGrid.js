import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import VariantCard from "./VariantCard";

const ProductGrid = ({ products, addToCart }) => {
  const [animatedProducts, setAnimatedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setAnimatedProducts(
      products.map((product) => ({
        ...product,
        animate: true,
      }))
    );

    const timeout = setTimeout(() => {
      setAnimatedProducts(
        products.map((product) => ({
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
    <div className="scrollbar-hide grid flex-1 min-h-0 grid-cols-2 auto-rows-[8.5rem] gap-4 pt-1.5 overflow-y-auto md:grid-cols-3 xl:grid-cols-4">
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
        <div className="scrollbar-hide grid flex-1 min-h-0 grid-cols-2 auto-rows-[8.5rem] gap-4 overflow-y-auto md:grid-cols-3 xl:grid-cols-4">
          {sortedVariants.map((variant) => (
            <VariantCard
              key={variant.id}
              variant={variant}
              productName={selectedProduct.name}
              onClick={() =>
                addToCart({
                  id: `${selectedProduct.id}-${variant.id}`,
                  name:
                    variant.name === "Default Title"
                      ? selectedProduct.name
                      : `${selectedProduct.name} - ${variant.name}`,
                  price: variant.price,
                })
              }
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white p-4 rounded-2xl">
      <div className="flex items-center gap-2 px-1 pb-1.5">
        {selectedProduct ? (
          <>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Back to products"
            >
              <i
                className="fa-solid fa-arrow-left text-lg hover:cursor-pointer"
                aria-hidden
              />
            </button>
            <h2 className="text-base font-semibold tracking-wide text-slate-900 uppercase">
              {selectedProduct.name}
            </h2>
          </>
        ) : (
          <h2 className="text-base font-semibold tracking-wide text-slate-900 uppercase">
            Products
          </h2>
        )}
      </div>
      {selectedProduct ? renderVariants() : renderProducts()}
    </div>
  );
};

export default ProductGrid;
