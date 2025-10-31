# Tienda Móviles

## Descripción del Proyecto
Este proyecto es una miniaplicación Single Page Application (SPA) para la compra de dispositivos móviles, desarrollada en React.

La aplicación consta de dos vistas principales:
1.  **Listado de Productos (PLP):** Muestra los productos con funcionalidad de búsqueda en tiempo real.
2.  **Detalle del Producto (PDP):** Muestra las especificaciones, opciones de compra y permite añadir al carrito.

## Características Implementadas
* Consumo de API externo (`https://itx-frontend-test.onrender.com/`).
* Mecanismo de **cacheo en cliente** con expiración de 1 hora para las peticiones API.
* **Persistencia** del contador de la cesta utilizando `localStorage`.
* Diseño responsivo y siguiendo las estructuras de la maqueta (PLP en 4 columnas y PDP en 2 columnas).
* Lógica de filtrado en tiempo real por Marca y Modelo.

## Cómo Ejecutar el Proyecto
Asegúrate de tener **Node.js** y **npm** (o yarn/pnpm) instalados.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/brrodriguez/compra-movil-app.git
    cd compra-movil-app
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar en modo desarrollo (Script START):**
    ```bash
    npm run start 
    # o si usas el script 'dev':
    npm run dev 
    ```
    La aplicación estará disponible en `http://localhost:5173/` (o el puerto que indique Vite).

## Scripts de Control de Calidad
El proyecto incluye los siguientes scripts obligatorios para testing y calidad:

* **Compilar para Producción (BUILD):** `npm run build`
* **Ejecutar Tests (TEST):** `npm run test`
* **Comprobación de Código (LINT):** `npm run lint`