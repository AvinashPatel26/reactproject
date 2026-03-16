import React, { useState } from "react";
import { toast } from "react-toastify";
// import "./ContactUs.css"; // You can delete this file now!

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    toast.success("Message sent successfully! We'll be in touch soon. 🍕");
    setFormData({ name: "", email: "", message: "" }); // Clear the form
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent pb-2">
          Contact Us
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          Have questions, feedback, or just want to say hi? We'd love to hear
          from you!
        </p>
      </div>

      {/* CONTACT INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: "📞", title: "Phone", value: "+91 6387995406" },
          { icon: "📧", title: "Email", value: "patelavinash2693@gmail.com" },
          {
            icon: "📍",
            title: "Address",
            value: "123 Food Street, Tasty City, India",
          },
        ].map((info, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 text-center"
          >
            <div className="text-4xl mb-4 bg-orange-50 w-16 h-16 mx-auto flex items-center justify-center rounded-2xl">
              {info.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {info.title}
            </h3>
            <p className="text-gray-500 font-medium">{info.value}</p>
          </div>
        ))}
      </div>

      {/* CONTACT FORM */}
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Send us a message 💬
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              rows="5"
              placeholder="Type your message..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/40"
          >
            Submit Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
