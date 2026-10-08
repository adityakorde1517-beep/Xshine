"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminProducts() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  // Fetch products
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product."
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );

      // Return to first page if current page becomes empty
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Get unique categories
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
        .includes(searchText) ||
      product.slug?.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Pagination calculation
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );

  // Search change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  // Previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 lg:pt-0 px-5 sm:px-8 py-8 lg:py-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div>
            <p className="text-blue-600 font-semibold tracking-wide">
              ADMIN PANEL
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-700">
              Products
            </h1>

            <p className="mt-2 text-slate-500">
              Manage products displayed on your website.
            </p>
          </div>

          {/* Add Product */}
          <button
            onClick={() =>
              router.push("/admin/products/add")
            }
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Add Product
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Total Products */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <p className="text-slate-500">
            Total Products
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-700">
            {loading ? "..." : products.length}
          </h2>

        </div>

        {/* Search + Category */}
        {!loading && products.length > 0 && (
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">

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
                    onChange={handleSearch}
                    placeholder="Search by name, slug or description..."
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
                  onChange={handleCategoryChange}
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

            {/* Result Count */}
            <p className="mt-4 text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              matching products
            </p>

          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8 text-center">

            <p className="text-slate-500">
              Loading products...
            </p>

          </div>
        )}

        {/* No Products */}
        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8 text-center">

              <div className="text-4xl">
                📦
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-700">
                No Products Found
              </h2>

              <p className="mt-2 text-slate-500">
                Add your first product to get started.
              </p>

            </div>
          )}

        {/* No Search Results */}
        {!loading &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8 text-center">

              <div className="text-4xl">
                🔍
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-700">
                No Matching Products
              </h2>

              <p className="mt-2 text-slate-500">
                Try another search or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setCurrentPage(1);
                }}
                className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* Products */}
        {!loading &&
          currentProducts.length > 0 && (
            <section className="mt-8">

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {currentProducts.map((product) => (

                  <div
                    key={product._id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                  >

                    {/* Product Image */}
                    <div className="h-40 rounded-xl bg-slate-100 overflow-hidden">

                      <img
                        src={
                          product.image ||
                          "/images/product-one.jpg"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {/* Product Name */}
                    <h2 className="mt-5 text-xl font-bold text-slate-700">
                      {product.name}
                    </h2>

                    {/* Category */}
                    <p className="mt-2 text-sm text-blue-600 font-medium">
                      {product.category}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-slate-500 leading-6">
                      {product.description}
                    </p>

                    {/* Slug */}
                    <p className="mt-3 text-xs text-slate-400 break-all">
                      Slug: {product.slug}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">

                      {/* Edit */}
                      <button
                        onClick={() =>
                          router.push(
                            `/admin/products/edit/${product._id}`
                          )
                        }
                        className="flex-1 border border-slate-300 text-slate-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition"
                      >
                        ✏️ Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Previous */}
                    <button
                      onClick={previousPage}
                      disabled={currentPage === 1}
                      className="w-full sm:w-auto border border-slate-300 text-slate-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2">

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((page) => (

                        <button
                          key={page}
                          onClick={() =>
                            setCurrentPage(page)
                          }
                          className={`w-10 h-10 rounded-lg font-semibold transition ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>

                      ))}

                    </div>

                    {/* Next */}
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="w-full sm:w-auto border border-slate-300 text-slate-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>

                  </div>

                  {/* Page Info */}
                  <p className="mt-4 text-center text-sm text-slate-500">
                    Page{" "}
                    <span className="font-semibold text-slate-700">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-700">
                      {totalPages}
                    </span>
                  </p>

                </div>
              )}

            </section>
          )}

      </div>

    </main>
  );
}