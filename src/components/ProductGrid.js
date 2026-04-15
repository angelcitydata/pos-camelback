import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import VariantCard from "./VariantCard";

const ProductGrid = ({
  products,
  allProducts = [],
  cart,
  addToCart,
  isLocked = false,
  resetToken = 0,
}) => {
  const [animatedProducts, setAnimatedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    if (!isLocked) {
      return;
    }

    setSelectedProduct(null);
    setSearchQuery("");
  }, [isLocked, resetToken]);

  const matchesSearch = (product, query) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    const name = (product.name || "").toLowerCase();
    const type = (product.type || "").toLowerCase();
    const collections = (product.collections || []).join(" ").toLowerCase();
    const variantNames = (product.variants || [])
      .map((v) => (v.name || "").toLowerCase())
      .join(" ");
    return (
      name.includes(q) ||
      type.includes(q) ||
      collections.includes(q) ||
      variantNames.includes(q)
    );
  };

  const handleProductClick = (product) => {
    if (isLocked) {
      return;
    }

    if (product.variants?.length === 1) {
      const variant = product.variants[0];
      addToCart({
        productId: product.id,
        variantId: variant.id,
        name:
          variant.name === "Default Title"
            ? product.name
            : `${product.name} - ${variant.name}`,
        price: variant.price,
      });
    } else {
      setSelectedProduct(product);
    }
  };

  const hasSearch = searchQuery.trim().length > 0;
  const searchedProducts = hasSearch
    ? [...allProducts]
        .filter((p) => matchesSearch(p, searchQuery))
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
    : animatedProducts;

  const renderProducts = () => (
    <div className="scrollbar-hide grid flex-1 min-h-0 grid-cols-2 auto-rows-[17rem] gap-4 pt-1.5 overflow-y-auto md:grid-cols-3 xl:grid-cols-4">
      {searchedProducts.map((product) => {
        const quantityInCart = cart
          .filter((item) => item.productId === product.id)
          .reduce((sum, item) => sum + item.quantity, 0);
        return (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={quantityInCart}
            disabled={isLocked}
            onClick={() => handleProductClick(product)}
          />
        );
      })}
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
            const quantityInCart =
              cart.find(
                (item) =>
                  item.productId === selectedProduct.id &&
                  item.variantId === variant.id
              )?.quantity ?? 0;

            return (
              <VariantCard
                key={variant.id}
                variant={variant}
                productName={selectedProduct.name}
                quantityInCart={quantityInCart}
                disabled={isLocked}
                onClick={() =>
                  addToCart({
                    productId: selectedProduct.id,
                    variantId: variant.id,
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
      <div className="flex items-center gap-2 px-1 pb-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {selectedProduct ? (
            <>
              <button
                type="button"
                disabled={isLocked}
                onClick={() => setSelectedProduct(null)}
                className="flex shrink-0 items-center justify-center w-8 h-8 transition rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Back to products"
              >
                <i
                  className="text-lg fa-solid fa-arrow-left hover:cursor-pointer"
                  aria-hidden
                />
              </button>
              <h2 className="text-base font-semibold tracking-wide uppercase text-slate-900 truncate">
                {selectedProduct.name}
              </h2>
            </>
          ) : (
            <h2 className="text-base font-semibold tracking-wide uppercase text-slate-900">
              Products
            </h2>
          )}
        </div>
        {!selectedProduct && (
          <div className="relative shrink-0 w-48 sm:w-56">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <i
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm fa-solid fa-magnifying-glass"
              aria-hidden
            />
            <input
              id="product-search"
              type="search"
              value={searchQuery}
              disabled={isLocked}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/80 py-1.5 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:[-webkit-appearance:none]"
              aria-label="Search products"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                disabled={isLocked}
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full text-slate-400 hover:bg-red-200 hover:text-red-600 transition hover:cursor-pointer"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-circle-xmark text-sm" aria-hidden />
              </button>
            )}
          </div>
        )}
      </div>
      {selectedProduct ? renderVariants() : renderProducts()}
    </div>
  );
};

export default ProductGrid;
