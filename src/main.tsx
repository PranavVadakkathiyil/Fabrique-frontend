import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { NavContextProvider } from './context/NavContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <NavContextProvider>
      <App />
    </NavContextProvider>


  </BrowserRouter>,
)
