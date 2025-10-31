import { Outlet, Link, useLocation } from 'react-router-dom';
import React from 'react'; 
import './App.css';

// Importación del hook de contexto para acceder al contador global de la cesta.
import { useGlobalCart } from './hooks/useGlobalCart'; 

function App() {
    // Lectura del contador de la cesta persistente para el Header.
    const { cartCount } = useGlobalCart(); 
    
    const location = useLocation();
    // Determina si estamos en la vista de detalle para mostrar el breadcrumb secundario.
    const isDetailPage = location.pathname.startsWith('/products/'); 

    return (
        <div className="app-container">
            
            <header className="app-header">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>Tienda Móviles</h1>
                </Link>
                <div className="cart-indicator">
                    Cesta ({cartCount}) 
                </div>
            </header>
            
            <nav className="breadcrumbs-container">
                <Link to="/" className="breadcrumb-link">Listado de Productos</Link>
                {isDetailPage && <span> / Detalle del Producto</span>}
            </nav>
            
            <main className="app-content">
                <Outlet /> 
            </main>

        </div>
    );
}

export default App;