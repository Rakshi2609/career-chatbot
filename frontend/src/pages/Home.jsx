import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
        Welcome to Career Chatbot
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
        Your AI-powered career companion. Get instant advice, resume tips, interview prep, and more — all in a Gen Z-friendly chat experience.
      </p>
      <Link
        to="/chat"
        className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition"
      >
        Start Chatting
      </Link>
    </section>
  );
}