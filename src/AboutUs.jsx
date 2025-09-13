import React from "react";
import "./AboutUs.css"; // custom styles

function AboutUs() {
  const sections = [
    {
      title: "👨‍👩‍👧 Who We Are",
      text: "We are a dedicated team of food enthusiasts committed to providing authentic flavors and the freshest products. From traditional recipes to modern favorites, our menu is crafted with love and care.",
    },
    {
      title: "🎯 Our Mission",
      text: "Our mission is simple – to deliver great-tasting, hygienic, and affordable food that makes every occasion special. We believe good food brings joy, and we want to share that joy with you.",
    },
    {
      title: "💡 Our Values",
      text: "✔️ Quality ingredients only\n✔️ Customer satisfaction first\n✔️ Hygienic and safe preparation\n✔️ Innovation in every recipe",
    },
    {
      title: "📞 Contact Us",
      text: "Have questions or feedback? We’d love to hear from you!\n\n📧 support@ourfoodstore.com\n📱 +91 98765 43210",
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

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center text-primary">About Us</h1>

      <div className="row">
        {sections.map((sec, index) => (
          <div className="col-12 col-md-6 mb-4" key={index}>
            <div className="card about-card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{sec.title}</h5>
                <p className="card-text" style={{ whiteSpace: "pre-line" }}>
                  {sec.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-5">
        <h2 className="text-center text-primary mb-4">❓ Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
