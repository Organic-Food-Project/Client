import React from 'react';
import ContactForm from './form';

const ContactPage = () => {
  return (
    <div className="p-[24px] space-y-5 max-w-2xl mx-auto">
      <h3 className="text-heading-05 font-bold text-black text-center">
        Contact Us
      </h3>

      <ContactForm />
    </div>
  );
};

export default ContactPage;
