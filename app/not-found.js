import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] flex items-center justify-center px-6 bg-slate-50">
        <div className="text-center max-w-xl">

          <p className="text-8xl font-bold text-blue-600">
            404
          </p>

          <h1 className="mt-6 text-4xl font-bold text-slate-600">
            Page Not Found
          </h1>

          <p className="mt-4 text-lg text-slate-500 leading-8">
            Sorry, the page you are looking for does not exist
            or may have been moved.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">

            <Link
              href="/"
              className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              ← Back to Home
            </Link>

            <Link
              href="/products"
              className="border border-slate-300 bg-white text-slate-600 px-7 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              View Products
            </Link>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}