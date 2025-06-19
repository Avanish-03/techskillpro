import React, { useState } from 'react';
import axios from 'axios';

const TeacherContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("❌ Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:5269/api/Contact", {
        Name: name,
        Email: email,
        Message: message,
      });

      alert("✅ Your message was sent to the admin!");
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full">
        <h2 className="text-4xl font-bold mb-4">Teacher Contact Page</h2>
        <p className="text-lg">Admins are here to assist you. Feel free to reach out!</p>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-4xl mt-10 bg-gray-100 p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-blue-600 mb-6">Send a Message</h3>
        <form onSubmit={handleFormSubmit}>
          {/* Name */}
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

          {/* Email */}
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

          {/* Message */}
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
            disabled={isSubmitting}
            className={`w-full py-2 rounded-lg text-white transition ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="w-full max-w-6xl mt-10 text-center">
        <p className="text-lg text-gray-600 mb-4">
          We'll respond as soon as possible. Thanks for reaching out!
        </p>
      </div>
    </div>
  );
};

export default TeacherContact;
