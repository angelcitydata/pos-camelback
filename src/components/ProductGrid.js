import React, { useEffect, useState } from "react";

const ProductGrid = ({ products, addToCart }) => {
  const [animatedProducts, setAnimatedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const tileButtonClass =
    "h-full w-full border border-gray-300 bg-white p-1.5 text-left transition hover:bg-gray-100 active:bg-gray-200";

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
    <div className="grid flex-1 min-h-0 grid-cols-2 auto-rows-[8.5rem] gap-1.5 pt-1.5 overflow-y-auto md:grid-cols-3">
      {animatedProducts.map((product) => (
        <button
          key={product.id}
          onClick={() => setSelectedProduct(product)}
          className={`${tileButtonClass} ${product.animate ? "fade-in" : ""}`}
        >
          <p className="text-[16px] font-medium leading-4 text-gray-700 line-clamp-2">
            {product.name}
          </p>
        </button>
      ))}
    </div>
  );

  const renderVariants = () => {
    const sortedVariants = [...selectedProduct.variants].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

    return (
      <div className="flex flex-1 min-h-0 flex-col pt-1.5">
        <div className="grid flex-1 min-h-0 grid-cols-2 auto-rows-[8.5rem] gap-1.5 overflow-y-auto md:grid-cols-3">
          {sortedVariants.map((variant) => (
            <button
              key={variant.id}
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
              className={`${tileButtonClass} fade-in`}
            >
              <p className="text-[16px] font-medium leading-4 text-gray-700 line-clamp-2">
                {variant.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-gray-800">
                ${variant.price}
              </p>
            </button>
          ))}
        </div>
        <button
          onClick={() => setSelectedProduct(null)}
          className="mt-1.5 h-12 w-full border border-gray-300 bg-white px-3 text-[14px] font-semibold uppercase tracking-wide text-gray-700 transition hover:bg-gray-100"
        >
          Back
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full border border-gray-300 bg-gray-50 p-1.5">
      <h2 className="px-1 pb-1.5 text-[11px] font-semibold tracking-wide text-gray-600 uppercase border-b border-gray-300">
        {selectedProduct ? selectedProduct.name : "Products"}
      </h2>
      {selectedProduct ? renderVariants() : renderProducts()}
    </div>
  );
};

export default ProductGrid;
