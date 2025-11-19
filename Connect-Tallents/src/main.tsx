import './global.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={routes}/>
  </AuthProvider>,
)
