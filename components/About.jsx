const About = () => {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div>

          <p className="text-blue-600 font-semibold tracking-wide">
            ABOUT OUR COMPANY
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Building Solutions
            <span className="block text-blue-600">
              That Make a Difference
            </span>
          </h2>

          <p className="mt-6 text-slate-600 leading-8">
            We are focused on creating innovative products and
            solutions that help businesses solve problems and
            achieve better results.
          </p>

          <p className="mt-4 text-slate-600 leading-8">
            Our goal is to combine technology, creativity, and
            practical business ideas to build solutions that are
            simple, useful, and reliable.
          </p>

          <a
            href="/about"
            className="inline-block mt-8 bg-blue-600 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Learn More →
          </a>

        </div>

        {/* Right Statistics */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200">

          <div className="grid grid-cols-2 gap-5">

            <div className="p-6 rounded-2xl bg-slate-50 hover:shadow-md transition">
              <h3 className="text-4xl font-bold text-blue-600">
                10+
              </h3>
              <p className="mt-2 text-slate-600">
                Products
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 hover:shadow-md transition">
              <h3 className="text-4xl font-bold text-blue-600">
                50+
              </h3>
              <p className="mt-2 text-slate-600">
                Clients
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 hover:shadow-md transition">
              <h3 className="text-4xl font-bold text-blue-600">
                5+
              </h3>
              <p className="mt-2 text-slate-600">
                Years Experience
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 hover:shadow-md transition">
              <h3 className="text-4xl font-bold text-blue-600">
                24/7
              </h3>
              <p className="mt-2 text-slate-600">
                Support
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;