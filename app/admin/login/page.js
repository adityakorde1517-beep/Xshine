"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Login successful
      router.push("/admin/message");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <p className="text-blue-600 font-semibold tracking-wide">
            ADMIN PANEL
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-700">
            Admin Login
          </h1>

          <p className="mt-3 text-slate-500">
            Login to manage your website.
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>

              <label className="block font-medium text-slate-600 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block font-medium text-slate-600 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />

            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login →"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}