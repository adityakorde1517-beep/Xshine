const CTA = () => {
  return (
    <section className="py-24 px-6 bg-blue-600">
      <div className="max-w-5xl mx-auto text-center">

        <p className="text-blue-100 font-semibold tracking-wide">
          LET&apos;S WORK TOGETHER
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
          Ready to Get Started?
        </h2>

        <p className="mt-5 text-blue-100 text-lg leading-8 max-w-2xl mx-auto">
          Discover our products and solutions and find the right
          solution for your needs.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">

          <a
            href="/products"
            className="bg-white text-blue-600 px-7 py-3.5 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            Explore Products →
          </a>

          <a
            href="/contact"
            className="border border-white text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Contact Us
          </a>

        </div>

      </div>
    </section>
  );
};

export default CTA;