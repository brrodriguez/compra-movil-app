const API_BASE_URL = 'https://itx-frontend-test.onrender.com'; 
const CACHE_EXPIRATION_HOURS = 1;


async function fetchWithCache(endpoint, cacheKey) {
  const fullUrl = `${API_BASE_URL}${endpoint}`; 
  
  // Intentar recuperar desde la cache
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    const now = new Date().getTime();
    
    // Verificar la expiración: 1 hora
    const expirationTime = CACHE_EXPIRATION_HOURS * 60 * 60 * 1000;

    if (now - timestamp < expirationTime) {
      console.log(`[Cache]: Datos recuperados para ${cacheKey}.`);
      return data;
    } else {
      console.log(`[Cache]: Datos para ${cacheKey} expirados.`);
    }
  }

  // Si no hay cache o está expirada, hacer la llamada a la API
  try {
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      throw new Error(`Error en la petición API: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Almacenar la nueva respuesta en la cache con timestamp
    const dataToCache = {
      timestamp: new Date().getTime(),
      data: data,
    };
    localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
    console.log(`[Cache]: Nuevos datos para ${cacheKey} almacenados.`);

    return data;
    
  } catch (error) {
    console.error(`Error al obtener datos de ${fullUrl}:`, error);
    throw error;
  }
}


export const getProductList = async () => {
  try {
    return await fetchWithCache('/api/product', 'productListCache');
  } catch (error) {
    console.error("Error al obtener el listado desde la API/Cache. ", error);
    throw new Error('API o red no disponibles. Error al cargar el listado.');
  }
};

export const getProductDetail = (id) => {
  return fetchWithCache(`/api/product/${id}`, `productDetailCache_${id}`);
};

export const postProductToCart = async (payload) => {
  const fullUrl = `${API_BASE_URL}/api/cart`;
  
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error al añadir a la cesta: ${response.statusText}`);
    }

    return response.json();
    
  } catch (error) {
    console.error('Error al enviar producto a la cesta:', error);
    throw error;
  }
};