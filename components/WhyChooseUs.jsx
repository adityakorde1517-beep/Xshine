const WhyChooseUs = () => {
  const benefits = [
    {
      number: "01",
      title: "Quality",
      description:
        "We focus on delivering reliable and high-quality products and solutions.",
    },
    {
      number: "02",
      title: "Innovation",
      description:
        "We continuously explore new ideas and technologies to create better solutions.",
    },
    {
      number: "03",
      title: "Customer Focus",
      description:
        "Our solutions are designed around real customer needs and expectations.",
    },
    {
      number: "04",
      title: "Reliability",
      description:
        "We aim to provide dependable solutions that customers can trust.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold tracking-wide">
            WHY CHOOSE US
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
            What Makes Us Different
          </h2>

          <p className="mt-5 text-slate-600 leading-7">
            We focus on quality, innovation, and creating solutions
            that provide real value to our customers.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="group p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-blue-600 hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              <span className="text-blue-600 group-hover:text-white font-bold text-lg transition">
                {benefit.number}
              </span>

              <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-white mt-5 transition">
                {benefit.title}
              </h3>

              <p className="text-slate-600 group-hover:text-blue-100 mt-4 leading-7 transition">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;