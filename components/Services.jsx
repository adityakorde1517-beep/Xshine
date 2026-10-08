const Services = () => {
  const services = [
    {
      icon: "🚀",
      title: "Product Development",
      description:
        "We build modern and reliable products designed to solve real business problems.",
    },
    {
      icon: "💡",
      title: "Business Solutions",
      description:
        "Smart solutions that help businesses improve their workflow and productivity.",
    },
    {
      icon: "⚙️",
      title: "Technology & Innovation",
      description:
        "We use modern technologies to create scalable and future-ready solutions.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-blue-600 font-semibold tracking-wide">
            WHAT WE OFFER
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
            Our Products & Services
          </h2>

          <p className="mt-5 text-slate-600 leading-7">
            Explore our solutions designed to help businesses grow,
            innovate, and work more efficiently.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl border border-slate-200 bg-white hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >

              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-50 text-3xl group-hover:bg-blue-600 transition">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-slate-600 leading-7">
                {service.description}
              </p>

              {/* Link */}
              <a
                href="/products"
                className="inline-block mt-6 text-blue-600 font-semibold hover:text-blue-800"
              >
                Learn More →
              </a>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;