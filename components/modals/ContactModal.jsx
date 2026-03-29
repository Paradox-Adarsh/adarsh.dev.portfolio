"use client";
import { useState } from "react";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 🔹 Background Blur Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 🔹 Glass Modal */}
      <div className="relative z-10 w-[90%] max-w-xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl p-6">
        
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Contact Me
        </h2>

        {/* 🔹 Grid Form */}
        <form className="grid gap-4">
          
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-white/70 outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-white/70 outline-none"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="p-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-white/70 outline-none resize-none"
          />

          <button
            type="submit"
            className="mt-2 bg-purple-600 hover:bg-purple-700 transition-all text-white py-2 rounded-lg"
          >
            Send Message
          </button>
        </form>

       
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ContactModal;