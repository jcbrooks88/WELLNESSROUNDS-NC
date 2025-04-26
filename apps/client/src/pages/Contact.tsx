import React from "react";
import ContactForm from "../components/features/contact/ContactForm.js";


const ContactPage: React.FC = () => {
  return (
    <div className="pages-container">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Fill out the form below to get in touch.</p>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
