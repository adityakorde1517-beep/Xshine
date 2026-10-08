const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white px-6 py-14">
      <div className="max-w-7xl mx-auto">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              YourBrand
            </h2>

            <p className="mt-4 text-slate-400 leading-7">
              Building innovative products and solutions
              that help businesses grow and succeed.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition"
              >
                f
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition"
              >
                in
              </a>

              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 transition"
              >
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>

              <li>
                <a href="/products" className="hover:text-white transition">
                  Products
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold">
              Products
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>Product One</li>
              <li>Product Two</li>
              <li>Product Three</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-slate-400">
              <p>
                📧 hello@yourbrand.com
              </p>

              <p>
                📞 +91 98765 43210
              </p>

              <p>
                📍 India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-7 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">

          <p>
            © 2026 YourBrand. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;