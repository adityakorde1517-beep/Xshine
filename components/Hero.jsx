const Hero = () => {
  return (
    <section className="min-h-[85vh] flex items-center bg-slate-50 px-6">
      <div className="max-w-7xl mx-auto w-full">

        <div className="max-w-3xl">

          <p className="text-blue-600 font-semibold tracking-wide mb-5">
            
          </p>
        
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
            Build Your Business
            <span className="block text-blue-600">
              With Innovation
            </span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-slate-600 leading-8 max-w-2xl">
            We create modern products and smart solutions that help
            businesses improve, grow, and achieve their goals.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">

            <a
              href="/products"
              className="bg-blue-600 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore Products →
            </a>

            <a
              href="/contact"
              className="border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-lg font-semibold hover:bg-slate-100 transition"
            >
              Contact Us
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;