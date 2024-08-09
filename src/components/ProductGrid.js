import React, { useEffect, useState } from "react";

const ProductGrid = ({ products, addToCart }) => {
  const [animatedProducts, setAnimatedProducts] = useState([]);
  console.log(products);
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

  return (
    <div className="grid justify-center grid-cols-2 gap-4 md:grid-cols-3">
      {animatedProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => addToCart(product)}
          className={`justify-center hover:bg-blue-300 active:bg-blue-200 active:shadow-inner  cursor-pointer h-32  bg-white p-4  pt-8 rounded-lg shadow-sm text-center ${
            product.animate ? "fade-in" : ""
          } hover:bg-gray-100 transition`}
        >
          {/* <img src={product.image} alt={product.name} className="object-cover w-full h-32 mb-4 rounded-lg" /> */}
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="pt-4 text-blue-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
