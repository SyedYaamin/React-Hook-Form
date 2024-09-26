import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Screens/Home'
import { Login } from './Screens/Login'
import Signup from './Screens/Signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)
