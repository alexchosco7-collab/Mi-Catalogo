# BOX DEPORTES — Catálogo V1

Esta es la primera versión de la tienda.

## Estructura
- index.html → estructura de la página
- style.css → diseño
- script.js → productos, carrito y WhatsApp
- img/logo.png → logo de BOX DEPORTES

## Cambiar el WhatsApp
Abrí `script.js` y modificá:

const WHATSAPP = "5491124063322";

Cuando tengas el número definitivo, reemplazalo por el nuevo número en el mismo formato.

## Agregar productos
En `script.js`, buscá `const productos = [` y agregá productos con:
- id
- nombre
- precio
- categoria
- talles
- imagen

Ejemplo:
{
  id: 5,
  nombre: "Nike Air Max",
  precio: 85000,
  categoria: "Zapatillas",
  talles: ["40","41","42","43"],
  imagen: "img/productos/nike-air-max.jpg"
}

Creá la carpeta `img/productos/` y colocá allí las fotos.

## Probarla
Abrí `index.html` con Chrome o Edge.

## Publicarla
La opción recomendada para esta primera versión es GitHub Pages.
Más adelante podemos agregar:
- dominio propio
- panel administrador
- stock
- base de datos
- medios de pago
- envíos
