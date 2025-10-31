import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductItem({ product }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/products/${product.id}`); 
  };

  return (
    <div className="product-item" onClick={handleItemClick}>
      <div className="product-image-container">
        <img 
          src={product.imgUrl || 'placeholder.jpg'} 
          alt={product.model} 
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-model">{product.model}</h3>
        <p className="product-brand">{product.brand}</p>
        <p className="product-price">{product.price ? `${product.price} €` : 'Consultar precio'}</p>
      </div>
    </div>
  );
}

export default ProductItem;