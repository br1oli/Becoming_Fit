import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from "./COMPONENTS/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" element={<LandingPage />} />
    </BrowserRouter>
  );
}

export default App;
