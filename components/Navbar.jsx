"use client";

import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="YourBrand Logo"
            width={140}
            height={45}
            className="object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="/"
            className="text-slate-700 font-medium hover:text-blue-600 transition"
          >
            Home
          </a>

          <a
            href="/about"
            className="text-slate-700 font-medium hover:text-blue-600 transition"
          >
            About
          </a>

          <a
            href="/products"
            className="text-slate-700 font-medium hover:text-blue-600 transition"
          >
            Products
          </a>

          <a
            href="/contact"
            className="text-slate-700 font-medium hover:text-blue-600 transition"
          >
            Contact
          </a>

          <a
            href="/contact"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </a>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-slate-700"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-5">

          <div className="flex flex-col gap-5">

            <a href="/" className="text-slate-700 font-medium">
              Home
            </a>

            <a href="/about" className="text-slate-700 font-medium">
              About
            </a>

            <a href="/products" className="text-slate-700 font-medium">
              Products
            </a>

            <a href="/contact" className="text-slate-700 font-medium">
              Contact
            </a>

            <a
              href="/contact"
              className="bg-blue-600 text-white text-center px-5 py-3 rounded-lg font-medium"
            >
              Get Started
            </a>

          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;