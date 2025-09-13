import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="container mt-4 bg-light">
      <h1 className="text-center text-primary mb-4 fw-bold">Contact Us</h1>
      <p className="text-center mb-5 text-muted">
        Have questions, feedback, or just want to say hi? We'd love to hear from you!
      </p>

      <div className="row mb-5">
        {[
          { icon: "📞", title: "Phone", value: "+91 98765 43210" },
          { icon: "📧", title: "Email", value: "support@ourfoodstore.com" },
          { icon: "📍", title: "Address", value: "123 Food Street, Tasty City, India" },
        ].map((info, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card contact-card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="fw-bold">{info.icon} {info.title}</h5>
                <p className="text-muted">{info.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow p-4 contact-form-card bg-white">
        <h4 className="mb-3 text-success fw-bold">Send us a message</h4>
        <form>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea className="form-control" rows="4" placeholder="Type your message..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;