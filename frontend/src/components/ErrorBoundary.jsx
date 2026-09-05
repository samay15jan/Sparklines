import { useRouteError, useNavigate } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  if (import.meta.env.DEV) {
    console.error(error)
  }

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[#0f0f0f] px-6 text-center text-white'>
      <h1 className='text-2xl font-bold'>Something went wrong</h1>
      <p className='max-w-sm opacity-70'>
        We hit an unexpected error. Reloading usually fixes it.
      </p>
      <div className='flex gap-3'>
        <button
          type='button'
          onClick={() => window.location.reload()}
          className='rounded-full bg-[#CAFC00] px-5 py-2 text-sm font-bold text-black'
        >
          Reload
        </button>
        <button
          type='button'
          onClick={() => navigate('/')}
          className='rounded-full border border-white/30 px-5 py-2 text-sm font-bold'
        >
          Go home
        </button>
      </div>
    </div>
  )
}

export default ErrorBoundary