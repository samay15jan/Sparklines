import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import Loading from './utils/Loading'
import Playlist from './components/dashboard/routeTypes/Playlist'
import Artist from './components/dashboard/routeTypes/Artist'
import Track from './components/dashboard/routeTypes/Track'
import Album from './components/dashboard/routeTypes/Album'
import Search from './components/dashboard/searchMenu/Search'
import queryClient from './utils/queryClient'
const Landing = lazy(() => import('./pages/Landing'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Authentication = lazy(() => import('./pages/Authentication'))
const Developer = lazy(() => import('./pages/Developer'))
const API = lazy(() => import('./components/developer/API'))
const Playground = lazy(() => import('./components/developer/Playground'))
const Docs = lazy(() => import('./components/developer/Docs'))
const Settings = lazy(() => import('./components/developer/Settings'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/auth',
    element: <Authentication />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/playlist/:id",
        element: <Playlist />,
      },
      {
        path: "/dashboard/artist/:id",
        element: <Artist />,
      },
      {
        path: "/dashboard/track/:id",
        element: <Track />,
      },
      {
        path: "/dashboard/album/:id",
        element: <Album />,
      },
      {
        path: "/dashboard/search",
        element: <Search />,
      },
      {
        path: "/dashboard/search/:query",
        element: <Search />,
      },
    ]
  },
  {
    path: "/developer",
    element: <Developer />,
    children: [
      {
        path: "/developer/api",
        element: <API />,
      },
      {
        path: "/developer/playground",
        element: <Playground />,
      },
      {
        path: "/developer/docs",
        element: <Docs />,
      },
      {
        path: "/developer/settings",
        element: <Settings />,
      },
    ]
  }
])

const App = () => {
  const helmetContext = {}
  return (
    <div className='text-white bg-[#0f0f0f]'>
      <HelmetProvider context={helmetContext}>
        <Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Suspense>
      </HelmetProvider>
    </div>
  )
}

export default App