import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import './index.css';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flowbite/dist/flowbite.min.js';
import TokenContextProvider from './context/tokenContext.jsx';
import CartContextProvider from './context/CartContext.jsx';
import { WishContextProvider } from './context/WishListContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <WishContextProvider>
        <App />
        </WishContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>,
)
