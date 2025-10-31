import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetail, postProductToCart } from '../services/apiService';
import { useGlobalCart } from '../hooks/useGlobalCart';

function ProductDetail() {
  const { productId } = useParams();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  
  const [selectedColorCode, setSelectedColorCode] = useState(null);
  const [selectedStorageCode, setSelectedStorageCode] = useState(null);
  
  // Hook para actualizar el contador de la cesta global
  const { cartCount, setCartCount } = useGlobalCart();

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getProductDetail(productId);
        
        setProduct(data);
        
        // Inicializar las selecciones con la primera opción por defecto
        if (data.options) {
          if (data.options.colors.length > 0) {
            setSelectedColorCode(data.options.colors[0].code);
          }
          if (data.options.storages.length > 0) {
            setSelectedStorageCode(data.options.storages[0].code);
          }
        }

      } catch (err) {
        setError('Error al cargar los detalles del producto. Producto no encontrado.');
        console.error("Error al cargar los detalles del producto:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProductDetail();
  }, [productId]); // Se ejecuta al cargar el componente o si cambia productId

  const handleAddToCart = async () => {
    if (!selectedColorCode || !selectedStorageCode) {
      setFormError("Por favor, selecciona opciones válidas.");
      return;
    }

    setFormError(null);
    setIsLoading(true);

    const payload = {
      id: product.id,
      colorCode: selectedColorCode,
      storageCode: selectedStorageCode,
    };

    try {
        await postProductToCart(payload);
        
        // Obtenemos el nuevo valor antes de guardarlo en el contexto
        const newCartCount = cartCount + 1;
        
        // Guardamos el nuevo valor en el contexto global
        setCartCount(newCartCount); 
        
        alert(`¡${product.model} añadido! Total en cesta: ${newCartCount}`);

    } catch (err) {
        setFormError('Error al añadir el producto a la cesta.');
        console.error("Error al añadir el producto a la cesta:", err);
    } finally {
        setIsLoading(false);
    }
  };

  if (isLoading && !product) {
    return <div className="loading-message">Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-detail-page">
      
      <Link to="/" className="back-button">Volver al Listado</Link>

      <div className="detail-container">
        
        <div className="detail-image">
          <img 
            src={product.imgUrl} 
            alt={product.model} 
          />
        </div>

        <div className="detail-info">
          <h1>{product.brand} {product.model}</h1>
          <p className="price-tag">{product.price ? `${product.price} €` : 'Consultar precio'}</p>

          <div className="specifications">
            <h3>Especificaciones</h3>
            <ul>
                <li><span className="spec-label">Marca:</span> {product.brand}</li>
                <li><span className="spec-label">Modelo:</span> {product.model}</li>
                <li><span className="spec-label">Precio:</span> {product.price ? `${product.price} €` : 'Consultar'}</li>
                <li><span className="spec-label">CPU:</span> {product.cpu || 'N/A'}</li>
                <li><span className="spec-label">RAM:</span> {product.ram || 'N/A'}</li>
                <li><span className="spec-label">Sistema Operativo:</span> {product.os || 'N/A'}</li>
                <li><span className="spec-label">Resolución Display:</span> {product.displayResolution || 'N/A'}</li>
                <li><span className="spec-label">Batería:</span> {product.battery || 'N/A'}</li>
                <li>
                    <span className="spec-label">Cámara Principal:</span> 
                    {Array.isArray(product.primaryCamera) 
                        ? product.primaryCamera.join(' + ') 
                        : product.primaryCamera || 'N/A'}
                </li>
                <li>
                    <span className="spec-label">Cámara Secundaria:</span> 
                    {Array.isArray(product.secondaryCamera) 
                        ? product.secondaryCamera.join(' + ') 
                        : product.secondaryCamera || 'N/A'}
                </li>
                <li><span className="spec-label">Dimensiones:</span> {product.dimentions || 'N/A'}</li>
                <li><span className="spec-label">Peso:</span> {product.weight || 'N/A'}</li>
            </ul>
          </div>

          <div className="options-and-actions">
            <h3>Opciones</h3>
            
            {product.options?.colors && product.options.colors.length > 0 && (
                <div className="options-selector">
                    <label htmlFor="color">Color:</label>
                    <select 
                        id="color" 
                        value={selectedColorCode || ''} 
                        onChange={(e) => setSelectedColorCode(parseInt(e.target.value))}
                    >
                        {product.options.colors.map(color => (
                            <option key={color.code} value={color.code}>
                                {color.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {product.options?.storages && product.options.storages.length > 0 && (
                <div className="options-selector">
                    <label htmlFor="storage">Almacenamiento:</label>
                    <select 
                        id="storage" 
                        value={selectedStorageCode || ''} 
                        onChange={(e) => setSelectedStorageCode(parseInt(e.target.value))}
                    >
                        {product.options.storages.map(storage => (
                            <option key={storage.code} value={storage.code}>
                                {storage.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            
            <button 
                className="add-to-cart-button" 
                onClick={handleAddToCart}
                disabled={isLoading || !selectedColorCode || !selectedStorageCode}
            >
                {isLoading ? 'Añadiendo...' : 'Añadir a la Cesta'}
            </button>
            
            {formError && <p className="form-error">{formError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;