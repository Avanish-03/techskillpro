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
      {/* <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 p-10 text-white text-center rounded-lg shadow-lg"> */}
        <h2 className="text-4xl font-bold mb-4">Teacher Contact Page</h2>
        <p className="text-lg">Admins are here to assist you. Feel free to reach out!</p>
      {/* </div> */}

      {/* Contact Form */}
      <div className="w-full max-w-4xl mt-10 bg-gray-50 p-8 rounded-lg shadow-md">
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

      {/* Google Map */}
      <div className="w-full max-w-6xl mt-10 bg-gray-50 p-8 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-blue-600 mb-6">Our Location</h3>
        <div className="w-full h-80">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.197971724413!2d72.83106231518107!3d21.1702409840429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395d3e078d58696d%3A0x7d7f000ee9aab0fd!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1672676901385!5m2!1sen!2sin"
            title="Surat Location"
            loading="lazy"
          ></iframe>
        </div>
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
