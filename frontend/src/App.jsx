import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogoPage from './pages/LogoPage';
import SurveyForm from './pages/SurveyForm';
import ThankYou from './pages/ThankYou';
import { Toaster } from 'react-hot-toast';
import './style.css';
const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogoPage />} />
          <Route path="/home" element={<SurveyForm />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App