import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './assets/components/Chat';

function App() {
  return (
    // The BrowserRouter should be the single, top-level router for your app.
    <BrowserRouter>
      {/* The Routes component is a container for all your individual routes. */}
      <Routes>
        {/* This route will automatically redirect the user from the base URL ("/") to "/chat". */}
        <Route path="/" element={<Navigate to="/chat" />} />
        
        {/* This route renders your Chat component when the URL is "/chat". */}
        <Route path="/chat" element={<Chat />} />

        {/* You can add other routes for other pages here in the future. */}
        {/* For example: <Route path="/about" element={<div>About Page</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
