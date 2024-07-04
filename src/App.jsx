import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Loading from './utils/Loading'
import Playlist from './components/dashboard/routeTypes/Playlist'
import Artist from './components/dashboard/routeTypes/Artist'
import Track from './components/dashboard/routeTypes/Track'
import Album from './components/dashboard/routeTypes/Album'
import Search from './components/dashboard/searchMenu/Search'
const Landing = lazy(() => import('./pages/Landing'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Authentication = lazy(() => import('./pages/Authentication'))
const Developer = lazy(() => import('./pages/Developer'))
const API = lazy(() => import('./components/developer/API'))
const Playground = lazy(() => import('./components/developer/Playground'))
const Docs = lazy(() => import('./components/developer/Docs'))
const Settings = lazy(() => import('./components/developer/Settings'))

const App = () => {
  const helmetContext = {}
  return (
    <div className='text-white bg-[#0f0f0f]'>
      <HelmetProvider context={helmetContext}>
        <Suspense fallback={<Loading />}>
          <Router>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/auth' element={<Authentication />} />
              <Route path='/dashboard' element={<Dashboard />}>
                <Route path='playlist/:id' element={<Playlist />} />
                <Route path='artist/:id' element={<Artist />} />
                <Route path='track/:id' element={<Track />} />
                <Route path='album/:id' element={<Album />} />
                <Route path='search' element={<Search />} />
                <Route path='search/:query' element={<Search />} />
              </Route>
              <Route path='/developer' element={<Developer />}>
                <Route path='api' element={<API />} />
                <Route path='playground' element={<Playground />} />
                <Route path='docs' element={<Docs />} />
                <Route path='settings' element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </Suspense>
      </HelmetProvider>
    </div>
  )
}

export default App
