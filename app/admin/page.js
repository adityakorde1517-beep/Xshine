"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboard() {
  const router = useRouter();

  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  // Fetch messages
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();

        if (!response.ok) {
          router.push("/admin/login");
          return;
        }

        setContacts(data.contacts || []);
      } catch (error) {
        console.error(error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [router]);

  // Fetch products
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
        console.error("PRODUCT FETCH ERROR:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const recentMessages = contacts.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 lg:pt-0 px-5 sm:px-8 py-8 lg:py-12">

        {/* Header */}
        <div>
          <p className="text-blue-600 font-semibold tracking-wide">
            ADMIN PANEL
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-700">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your website from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-8 lg:mt-10">

          {/* Messages */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 shadow-sm">

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-2xl">
              💬
            </div>

            <p className="mt-5 text-slate-500">
              Total Messages
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-700">
              {loading ? "..." : contacts.length}
            </h2>

          </div>

          {/* Products */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 shadow-sm">

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-2xl">
              📦
            </div>

            <p className="mt-5 text-slate-500">
              Products
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-700">
              {productsLoading ? "..." : products.length}
            </h2>

          </div>

          {/* Admin Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 shadow-sm">

            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-50 text-2xl">
              👤
            </div>

            <p className="mt-5 text-slate-500">
              Admin Status
            </p>

            <h2 className="mt-2 text-2xl font-bold text-green-600">
              Active
            </h2>

          </div>

        </div>

        {/* Recent Messages */}
        <section className="mt-10 lg:mt-12">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold text-slate-700">
                Recent Messages
              </h2>

              <p className="mt-1 text-slate-500">
                Latest messages received from customers.
              </p>
            </div>

            <button
              onClick={() =>
                router.push("/admin/message")
              }
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              View All Messages →
            </button>

          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-slate-500">
                Loading recent messages...
              </p>
            </div>
          )}

          {/* No Messages */}
          {!loading && recentMessages.length === 0 && (
            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-8 text-center">

              <div className="text-4xl">
                📭
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-700">
                No Messages Yet
              </h3>

              <p className="mt-2 text-slate-500">
                Customer messages will appear here.
              </p>

            </div>
          )}

          {/* Messages */}
          {!loading && recentMessages.length > 0 && (
            <div className="mt-6 grid lg:grid-cols-3 gap-5">

              {recentMessages.map((contact) => (

                <div
                  key={contact._id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                      👤
                    </div>

                    <div className="min-w-0">

                      <h3 className="font-bold text-slate-700 truncate">
                        {contact.name}
                      </h3>

                      <p className="text-sm text-slate-400 truncate">
                        {contact.email}
                      </p>

                    </div>

                  </div>

                  <div className="mt-5">

                    <p className="text-sm font-semibold text-slate-700">
                      {contact.subject}
                    </p>

                    <p className="mt-2 text-sm text-slate-500 leading-6 line-clamp-3">
                      {contact.message}
                    </p>

                  </div>

                  <p className="mt-5 text-xs text-slate-400">
                    {new Date(
                      contact.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>
          )}

        </section>

        {/* Quick Actions */}
        <section className="mt-10 lg:mt-12">

          <h2 className="text-2xl font-bold text-slate-700">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 mt-6">

            {/* Messages */}
            <button
              onClick={() =>
                router.push("/admin/message")
              }
              className="text-left bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 hover:-translate-y-1 hover:shadow-lg transition"
            >

              <div className="text-3xl">
                💬
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-700">
                View Messages
              </h3>

              <p className="mt-2 text-slate-500">
                View and manage customer contact messages.
              </p>

            </button>

            {/* Products */}
            <button
              onClick={() =>
                router.push("/admin/products")
              }
              className="text-left bg-white border border-slate-200 rounded-2xl p-6 lg:p-7 hover:-translate-y-1 hover:shadow-lg transition"
            >

              <div className="text-3xl">
                📦
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-700">
                Manage Products
              </h3>

              <p className="mt-2 text-slate-500">
                Add, edit and delete website products.
              </p>

            </button>

          </div>

        </section>

      </div>

    </main>
  );
}