import './global.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={routes}/>
    </AuthProvider>
  </ThemeProvider>,
)
