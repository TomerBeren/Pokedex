import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { PokemonProvider } from './contexts/PokemonContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
      {/* Render the ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </PokemonProvider>
  </React.StrictMode>,
)
