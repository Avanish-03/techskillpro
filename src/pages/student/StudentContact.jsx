import React, { useState } from 'react';

const StudentContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., send form data to API)
    alert('Form submitted!');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-400 to-teal-500 p-10 text-white text-center rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg">We're here to help. Reach out with any questions or concerns!</p>
      </div>

      {/* Contact Form Section */}
      <div className="w-full max-w-4xl mt-10 bg-gray-50 p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-blue-600 mb-6">Send us a Message</h3>
        <form onSubmit={handleFormSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full border rounded px-4 py-2 mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              id="email"
              className="w-full border rounded px-4 py-2 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium">Your Message</label>
            <textarea
              id="message"
              className="w-full border rounded px-4 py-2 mt-2"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Google Map Section */}
      <div className="w-full max-w-6xl mt-10 bg-gray-50 p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-blue-600 mb-6">Our Location</h3>

        {/* Embed Google Map with Surat location */}
        <div className="w-full h-80">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.197971724413!2d72.83106231518107!3d21.1702409840429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395d3e078d58696d%3A0x7d7f000ee9aab0fd!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1672676901385!5m2!1sen!2sin"
            title="Surat Location"
            loading="lazy"
          ></iframe>
        </div>
      </div>


      {/* Footer Section */}
      <div className="w-full max-w-6xl mt-10 text-center">
        <p className="text-lg text-gray-600 mb-4">We're happy to assist you with any questions or issues you may have!</p>
      </div>
    </div>
  );
};

export default StudentContact;
