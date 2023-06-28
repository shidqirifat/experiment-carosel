import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/globals.css'
import Provider from './components/global/Provider'
import { createBrowserRouter } from 'react-router-dom'
import Wrapper from './components/dashboard/Wrapper'
import CaroselWrapper from './components/carosel/CaroselWrapper'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
  },
  {
    path: '/carosel',
    element: <CaroselWrapper />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>{router}</Provider>
  </React.StrictMode>
)
