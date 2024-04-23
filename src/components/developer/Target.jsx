import React, { lazy } from 'react'
const GenerateKey = lazy(() => import('./API'))
const Playground = lazy(() => import('./Playground'))
const Docs = lazy(() => import('./Docs'))
const Settings = lazy(() => import('./Settings'))

const Target = ({ path }) => {
  const renderComponent = () => {
    switch (path) {
      case '/developer/api':
        return <GenerateKey />
      case '/developer/playground':
        return <Playground />
      case '/developer/docs':
        return <Docs />
      case '/developer/settings':
        return <Settings />
      default:
        return null
    }
  }
  
  return (
    <div className='grid col-span-4'>
      {renderComponent()}
    </div>
  )
}

export default Target