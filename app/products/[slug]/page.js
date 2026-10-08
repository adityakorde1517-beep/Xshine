import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function ProductDetails({ params }) {
  const { slug } = await params;

  const response = await fetch(
    `http://localhost:3000/api/products`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  const product = data.products?.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="text-5xl">📦</div>

            <h1 className="mt-5 text-3xl font-bold text-slate-700">
              Product Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              The product you are looking for does not exist.
            </p>

            <Link
              href="/products"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              ← Back to Products
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Product Header */}
        <section className="bg-slate-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">

            <Link
              href="/products"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition"
            >
              ← Back to Products
            </Link>

            <p className="mt-8 text-blue-600 font-semibold tracking-wide">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-slate-600">
              {product.name}
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-500 leading-8">
              {product.description}
            </p>

          </div>
        </section>

        {/* Product Information */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            {/* Product Image */}
            <div className="relative h-96 bg-slate-50 rounded-3xl overflow-hidden border border-slate-200">

              <img
                src={
                  product.image ||
                  "/images/product-one.jpg"
                }
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />

            </div>

            {/* Product Details */}
            <div>

              <p className="text-blue-600 font-semibold tracking-wide">
                ABOUT THE PRODUCT
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-600">
                {product.name}
              </h2>

              <p className="mt-6 text-slate-500 leading-8">
                {product.description}
              </p>

              <h3 className="mt-8 text-xl font-semibold text-slate-600">
                Product Category
              </h3>

              <p className="mt-3 text-slate-500">
                {product.category}
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  href="/contact"
                  className="bg-blue-600 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Enquire Now →
                </Link>

                <Link
                  href="/products"
                  className="border border-slate-300 bg-white text-slate-600 px-7 py-3.5 rounded-lg font-semibold hover:bg-slate-100 transition"
                >
                  ← All Products
                </Link>

              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}