"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function Messages() {
  const router = useRouter();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Fetch messages
  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages.");
      }

      setContacts(data.contacts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete message
  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete message.");
      }

      setContacts((currentContacts) =>
        currentContacts.filter((contact) => contact._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed.");
      }

      router.push("/admin/login");
    } catch (error) {
      setError(error.message);
      setLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 lg:pt-0 px-5 sm:px-8 py-8 lg:py-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-blue-600 font-semibold tracking-wide">
              ADMIN PANEL
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-700">
              Contact Messages
            </h1>

            <p className="mt-2 text-slate-500">
              Messages submitted through the contact form.
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loggingOut ? "Logging out..." : "🚪 Logout"}
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="mt-10 text-slate-500">
            Loading messages...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="mt-10 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* No Messages */}
        {!loading && !error && contacts.length === 0 && (
          <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-8 text-center">

            <div className="text-4xl">
              📭
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-700">
              No Messages Found
            </h2>

            <p className="mt-2 text-slate-500">
              There are currently no customer messages.
            </p>

          </div>
        )}

        {/* Messages */}
        {!loading && !error && contacts.length > 0 && (
          <div className="mt-8 lg:mt-10 space-y-5 lg:space-y-6">

            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
              >

                {/* Message Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                  <div className="min-w-0">

                    <h2 className="text-xl font-bold text-slate-700 break-words">
                      {contact.name}
                    </h2>

                    <p className="mt-1 text-slate-500 break-all">
                      {contact.email}
                    </p>

                    <p className="text-slate-500 break-words">
                      {contact.phone}
                    </p>

                  </div>

                  <div className="text-sm text-slate-400 lg:text-right">
                    {new Date(contact.createdAt).toLocaleString()}
                  </div>

                </div>

                {/* Message Details */}
                <div className="mt-5 border-t border-slate-200 pt-5">

                  {/* Subject */}
                  <p className="font-semibold text-slate-700">
                    Subject
                  </p>

                  <p className="mt-1 text-slate-500 break-words">
                    {contact.subject}
                  </p>

                  {/* Message */}
                  <p className="mt-5 font-semibold text-slate-700">
                    Message
                  </p>

                  <p className="mt-1 text-slate-500 leading-7 whitespace-pre-line break-words">
                    {contact.message}
                  </p>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteMessage(contact._id)}
                    className="mt-6 w-full sm:w-auto bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    🗑️ Delete Message
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}