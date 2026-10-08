"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products."
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get categories
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(searchText) ||
      product.description
        ?.toLowerCase()
        .includes(searchText);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-slate-900 text-white py-20 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-blue-400 font-semibold tracking-wide">
            OUR PRODUCTS
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
            Products
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-slate-300 leading-7">
            Explore our products and find the right solution
            for your requirements.
          </p>

        </div>

      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Search + Category */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

          <div className="grid md:grid-cols-2 gap-4">

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Products
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />

              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 text-center">

            <div className="text-4xl">
              📦
            </div>

            <p className="mt-4 text-slate-500">
              Loading products...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 bg-red-50 border border-red-200 rounded-xl p-5 text-center">

            <p className="text-red-600">
              {error}
            </p>

          </div>
        )}

        {/* No Products */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-10 text-center">

              <div className="text-5xl">
                📦
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-700">
                No Products Available
              </h2>

              <p className="mt-2 text-slate-500">
                Products will appear here when they are added.
              </p>

            </div>
          )}

        {/* No Search Results */}
        {!loading &&
          !error &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-10 text-center">

              <div className="text-5xl">
                🔍
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-700">
                No Products Found
              </h2>

              <p className="mt-2 text-slate-500">
                Try another search or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* Products Grid */}
        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <div className="mt-10">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-2xl font-bold text-slate-700">
                    Our Products
                  </h2>

                  <p className="mt-1 text-slate-500">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1
                      ? "s"
                      : ""}{" "}
                    available
                  </p>
                </div>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredProducts.map((product) => (

                  <div
                    key={product._id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                  >

                    {/* Image */}
                    <div className="h-52 bg-slate-100 overflow-hidden">

                      <img
                        src={
                          product.image ||
                          "/images/product-one.jpg"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {/* Content */}
                    <div className="p-6">

                      <p className="text-sm text-blue-600 font-semibold">
                        {product.category}
                      </p>

                      <h3 className="mt-2 text-xl font-bold text-slate-700">
                        {product.name}
                      </h3>

                      <p className="mt-3 text-slate-500 leading-6 line-clamp-3">
                        {product.description}
                      </p>

                      {/* View Product */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-block mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        View Product →
                      </Link>

                    </div>

                  </div>

                ))}

              </div>

            </div>
          )}

      </section>

    </main>
  );
}