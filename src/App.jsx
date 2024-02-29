import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async';
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

const App = () => {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
    <Router>
      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
    </HelmetProvider>
  )
}

export default App