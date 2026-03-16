import React, { useState } from "react";
// import "./AboutUs.css"; // You can likely delete this file now!
import { ChevronDown, ChevronUp } from "lucide-react";

function AboutUs() {
  const [activeFaq, setActiveFaq] = useState(0); // Set the first FAQ as open by default

  const sections = [
    {
      icon: "👨‍👩‍👧",
      title: "Who We Are",
      text: "We are a dedicated team of food enthusiasts committed to providing authentic flavors and the freshest products. From traditional recipes to modern favorites, our menu is crafted with love and care.",
    },
    {
      icon: "🎯",
      title: "Our Mission",
      text: "Our mission is simple – to deliver great-tasting, hygienic, and affordable food that makes every occasion special. We believe good food brings joy, and we want to share that joy with you.",
    },
    {
      icon: "💡",
      title: "Our Values",
      text: "✔️ Quality ingredients only\n✔️ Customer satisfaction first\n✔️ Hygienic and safe preparation\n✔️ Innovation in every recipe",
    },
    {
      icon: "📞",
      title: "Contact Us",
      text: "Have questions or feedback? We’d love to hear from you!\n\n📧 patelavinash2693@gmail.com\n📱 +91 XXXXX XXXXX",
    },
  ];

  const faqs = [
    {
      question: "What kind of food do you serve?",
      answer: "We serve a mix of traditional and modern dishes, including veg, non-veg, dairy products, and chocolates – all made with fresh, quality ingredients.",
    },
    {
      question: "Do you offer home delivery?",
      answer: "Yes! We provide fast and reliable home delivery services so you can enjoy your favorite meals at the comfort of your home.",
    },
    {
      question: "Are your ingredients organic?",
      answer: "We prioritize quality and freshness. While not all ingredients are certified organic, we carefully source everything to ensure safety and great taste.",
    },
    {
      question: "How can I place an order?",
      answer: "Simply browse our website, add items to your cart, sign up or log in, and place your order securely. You can also track your orders easily.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 bg-clip-text text-transparent pb-2">
          About Us
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
          Discover the story behind Foody Sensations and what drives us to deliver the best flavors to your door.
        </p>
      </div>

      {/* INFO SECTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {sections.map((sec, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col items-start"
          >
            <div className="text-4xl mb-4 bg-orange-50 w-16 h-16 flex items-center justify-center rounded-2xl">
              {sec.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{sec.title}</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {sec.text}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ❓ Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-orange-50 transition-colors focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={activeFaq === index}
              >
                <span className="font-semibold text-gray-800 text-lg">
                  {faq.question}
                </span>
                {activeFaq === index ? (
                  <ChevronUp className="text-orange-500 w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-gray-400 w-5 h-5 flex-shrink-0" />
                )}
              </button>
              
              {/* Accordion Content */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  activeFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="p-5 pt-0 text-gray-600 border-t border-gray-50 bg-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AboutUs;