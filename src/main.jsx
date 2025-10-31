import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import ProductList from './views/ProductList.jsx';
import ProductDetail from './views/ProductDetail.jsx';

// Importación del proveedor del contexto global de la cesta.
import { CartProvider } from './hooks/useGlobalCart'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <CartProvider>
      
      <BrowserRouter>
        
        <Routes>
          
          <Route path="/" element={<App />}>
            
            <Route index element={<ProductList />} />
            
            <Route path="products/:productId" element={<ProductDetail />} />

            <Route path="*" element={<h1>404 | Recurso No Encontrado</h1>} />
            
          </Route>
        </Routes>
      </BrowserRouter>
      
    </CartProvider>
  </React.StrictMode>,
);