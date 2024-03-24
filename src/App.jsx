import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'
import Loading from './utils/Loading'
const Landing = lazy(() => import('./pages/Landing'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Authentication = lazy(() => import('./pages/Authentication'))

const App = () => {
  const helmetContext = {}
  return (
    <HelmetProvider context={helmetContext}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Suspense>
    </HelmetProvider>
  )
}

export default App