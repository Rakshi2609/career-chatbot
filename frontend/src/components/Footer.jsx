import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-center py-5 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} CareerBot. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          AI-powered career advice, powered by Google Gemini.
        </p>
      </div>
    </footer>
  );
}