import React, { useState, useEffect } from 'react';
import { getProductList } from '../services/apiService';
import ProductItem from '../components/ProductItem';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para búsqueda en tiempo real)
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    // Función asíncrona para obtener los datos desde la API o la caché
    const loadProducts = async () => {
      try {
        setError(null);
        setIsLoading(true);
        
        const data = await getProductList();
        
        setProducts(data);
        
      } catch (err) {
        setError('Error al cargar la lista de productos.');
        console.error("Error al cargar la lista de productos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []); // Se ejecuta solo una vez

  // Se ejecuta cada vez que cambia 'searchTerm' o 'products'
  const displayedProducts = products.filter(product => {
    if (!searchTerm) return true;

    const lowerCaseSearch = searchTerm.toLowerCase();

    const matchesBrand = product.brand && product.brand.toLowerCase().includes(lowerCaseSearch);
    const matchesModel = product.model && product.model.toLowerCase().includes(lowerCaseSearch);
    
    return matchesBrand || matchesModel;
  });
  
  if (isLoading) {
    return <div className="loading-message">Cargando productos</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (products.length === 0 && !error) {
    return <div className="empty-message">No se encontraron productos disponibles.</div>;
  }

  return (
    <div className="product-list-view">
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por Marca o Modelo..."
          value={searchTerm}
          // Actualiza el estado en tiempo real para activar el filtro
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />
      </div>
      
      <div className="product-list-grid">
        {displayedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}

        {displayedProducts.length === 0 && searchTerm && (
          <p className="no-results-message">No hay resultados.</p>
        )}
      </div>
      
      <p>Total de productos: {displayedProducts.length} de {products.length} encontrados.</p>
      
    </div>
  );
}

export default ProductList;