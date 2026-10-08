"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSubmitted(true);
      e.target.reset();

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main>

        {/* Header */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">

            <p className="text-blue-600 font-semibold tracking-wide">
              CONTACT US
            </p>

            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-slate-600">
              Let&apos;s Work Together
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-500 leading-8">
              Have a question or want to know more about our products?
              Get in touch with us.
            </p>

          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">

            {/* Contact Information */}
            <div>

              <p className="text-blue-600 font-semibold tracking-wide">
                GET IN TOUCH
              </p>

              <h2 className="mt-3 text-4xl font-bold text-slate-600">
                We&apos;d Love to Hear From You
              </h2>

              <p className="mt-6 text-slate-500 leading-8">
                Contact us for product information, business inquiries,
                partnerships, or any other questions.
              </p>

              <div className="mt-10 space-y-7">

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-xl">
                    📧
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-600">
                      Email
                    </h3>

                    <p className="mt-1 text-slate-500">
                      hello@yourbrand.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-xl">
                    📞
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-600">
                      Phone
                    </h3>

                    <p className="mt-1 text-slate-500">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-xl">
                    📍
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-600">
                      Location
                    </h3>

                    <p className="mt-1 text-slate-500">
                      India
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">

              {submitted ? (

                <div className="text-center py-14">

                  <div className="text-5xl mb-5">
                    ✅
                  </div>

                  <h2 className="text-2xl font-bold text-slate-600">
                    Message Sent!
                  </h2>

                  <p className="mt-3 text-slate-500">
                    Thank you for contacting us. We will get back
                    to you soon.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-7 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Send Another Message
                  </button>

                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Name */}
                  <div>
                    <label className="block font-medium text-slate-600 mb-2">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block font-medium text-slate-600 mb-2">
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      required
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-medium text-slate-600 mb-2">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      placeholder="Enter subject"
                      required
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-medium text-slate-600 mb-2">
                      Message
                    </label>

                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Write your message..."
                      required
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                    ></textarea>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-600 text-sm">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>

                </form>

              )}

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}