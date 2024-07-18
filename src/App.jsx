import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './utils/queryClient'
import Loading from './utils/Loading'
const Playlist = lazy(() => import('./components/dashboard/routeTypes/Playlist'))
const Artist = lazy(() => import('./components/dashboard/routeTypes/Artist'))
const Track = lazy(() => import('./components/dashboard/routeTypes/Track'))
const Album = lazy(() => import('./components/dashboard/routeTypes/Album'))
const Search = lazy(() => import('./components/dashboard/searchMenu/Search'))
const RecentlyPlayed = lazy(() => import('./components/dashboard/routeTypes/RecentlyPlayed'))
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
      {
        path: "/dashboard/recently-played",
        element: <RecentlyPlayed />,
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