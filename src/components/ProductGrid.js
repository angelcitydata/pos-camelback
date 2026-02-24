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
        <button
          onClick={() => setSelectedProduct(null)}
          className="mt-1.5 h-12 w-full border border-slate-300 bg-white px-3 text-[14px] font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-100"
        >
          Back
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white p-4 rounded-2xl">
      <h2 className="px-1 pb-1.5 text-base font-semibold tracking-wide text-slate-900 uppercase">
        {selectedProduct ? selectedProduct.name : "Products"}
      </h2>
      {selectedProduct ? renderVariants() : renderProducts()}
    </div>
  );
};

export default ProductGrid;
