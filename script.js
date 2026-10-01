// ============================================================
// BOX DEPORTES - CONFIGURACIÓN DE WHATSAPP
// ============================================================
const WHATSAPP = "5491124063322";

// ============================================================
// CATÁLOGO DE PRODUCTOS
// ============================================================
const productos = [
  { id: 1, nombre: "Air Jordan 1 Retro High", precio: 349999, categoria: "Zapatillas", talles: ["40","41","42","43","44"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 2, nombre: "Nike Dunk Low Retro", precio: 289999, categoria: "Zapatillas", talles: ["39","40","41","42","43"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 3, nombre: "Nike Air Force 1 '07", precio: 269999, categoria: "Zapatillas", talles: ["40","41","42","43","44","45"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 4, nombre: "Nike Air Max 90", precio: 299999, categoria: "Zapatillas", talles: ["40","41","42","43"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 5, nombre: "Nike ACG Mountain Fly", precio: 319999, categoria: "Indumentaria", talles: ["S","M","L","XL"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 6, nombre: "Camiseta Racing Club Oficial", precio: 119999, categoria: "Indumentaria", talles: ["S","M","L","XL","XXL"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 7, nombre: "Camisetas Internacionales FC", precio: 129999, categoria: "Indumentaria", talles: ["S","M","L","XL"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 8, nombre: "Camiseta Springboks Rugby", precio: 139999, categoria: "Indumentaria", talles: ["M","L","XL","XXL"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 9, nombre: "Nike Pegasus 41 Running", precio: 279999, categoria: "Zapatillas", talles: ["39","40","41","42","43","44"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 10, nombre: "Nike Vomero 17 Premium", precio: 329999, categoria: "Zapatillas", talles: ["40","41","42","43","44"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 11, nombre: "Botines Nike Phantom GX", precio: 309999, categoria: "Zapatillas", talles: ["39","40","41","42","43"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 12, nombre: "Nike Metcon 10", precio: 329999, categoria: "Zapatillas", talles: ["40","41","42","43","44"], imagen: "imgproductos/Nike+metcon+10.jfif" },
  { id: 13, nombre: "Calza / Remera Nike Pro Fit", precio: 69999, categoria: "Indumentaria", talles: ["S","M","L","XL"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 14, nombre: "Nike Air Max Plus Retro", precio: 359999, categoria: "Zapatillas", talles: ["40","41","42","43"], imagen: "https://pngimg.com/d/running_shoes_PNG5816.png" },
  { id: 15, nombre: "Nike Metcon 10", precio: 529999, categoria: "Zapatillas", talles: ["40","41","42","43","44"], imagen: "imgproductos/Nike+metconH+10.jfif" },
  { id: 16, nombre: "Nike Metcon 10", precio: 329999, categoria: "Zapatillas", talles: ["40","41","42","43","44"], imagen: "imgproductos/Nike+metconH1+10.WEBP" },
  { id: 17, nombre: "Nike Metcon 10", precio: 329999, categoria: "Zapatillas", talles: ["40","41","42","43","44"], imagen: "imgproductos/Nike+metconH12+10.WEBP" },
  { id: 18, nombre: "Nike Metcon 10", precio: 329999, categoria: "Zapatillas", talles: ["40","41","42","43","44"], imagen: "imgproductos/Nike+metconH13+10.jfif" },
];

let carrito = JSON.parse(localStorage.getItem("boxdeportes_carrito") || "[]");

const money = n => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const badgeWrap = document.getElementById("activeFilterBadge");
  const badgeText = document.getElementById("filterBadgeText");

  if (!grid || !searchInput || !categorySelect) return;

  const query = searchInput.value.toLowerCase().trim();
  const category = categorySelect.value;

  if (query && badgeWrap && badgeText) {
    badgeWrap.style.display = "flex";
    badgeText.textContent = `"${query}"`;
  } else if (badgeWrap) {
    badgeWrap.style.display = "none";
  }

  const filtered = productos.filter(p => {
    const matchesCat = (category === "Todos" || p.categoria === category);
    const matchesQuery = p.nombre.toLowerCase().includes(query) || p.categoria.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty"><i class="fa-solid fa-box-open" style="font-size:32px;margin-bottom:12px;display:block;"></i>No encontramos productos para tu búsqueda actual.<br><small>Probá limpiando el buscador o eligiendo otra categoría.</small></div>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="product">
      <div class="product-img">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.src='https://pngimg.com/d/running_shoes_PNG5816.png'">
      </div>
      <div class="product-body">
        <span class="product-cat">${p.categoria}</span>
        <h3>${p.nombre}</h3>
        <div class="price">${money(p.precio)}</div>
        <div class="product-actions">
          <select id="size-${p.id}">
            ${p.talles.map(t => `<option value="${t}">Talle ${t}</option>`).join("")}
          </select>
          <button class="add-btn" onclick="addToCart(${p.id})">AGREGAR</button>
        </div>
      </div>
    </article>
  `).join("");
}

// ============================================================
// INTERACCIÓN DE TENDENCIAS (CLICK / ENTER -> FILTRAR)
// ============================================================
document.querySelectorAll(".trend-item").forEach(item => {
  const triggerFilter = () => {
    const term = item.getAttribute("data-filter");
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");

    if (categorySelect) categorySelect.value = "Todos";
    if (searchInput) {
      searchInput.value = term;
      renderProducts();
    }

    const catalogoSec = document.getElementById("catalogo");
    if (catalogoSec) {
      catalogoSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  item.addEventListener("click", triggerFilter);

  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      triggerFilter();
    }
  });
});

const clearFilterBtn = document.getElementById("clearFilterBtn");
if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";
    renderProducts();
  });
}

// ============================================================
// CARRITO Y WHATSAPP
// ============================================================
function addToCart(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const sizeSelect = document.getElementById(`size-${id}`);
  const size = sizeSelect ? sizeSelect.value : (p.talles[0] || "Único");
  const key = `${id}-${size}`;
  const existing = carrito.find(x => x.key === key);

  if (existing) existing.cantidad++;
  else carrito.push({ key, id, size, cantidad: 1 });

  saveCart();
  openCart();
}

function saveCart() {
  localStorage.setItem("boxdeportes_carrito", JSON.stringify(carrito));
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cartItems");
  const countEl = document.getElementById("cartCount");
  const totalEl = document.getElementById("cartTotal");
  const totalCount = carrito.reduce((a, b) => a + b.cantidad, 0);
  if (countEl) countEl.textContent = totalCount;

  if (!items) return;

  if (!carrito.length) {
    items.innerHTML = '<div class="empty">Tu carrito está vacío.</div>';
    if (totalEl) totalEl.textContent = money(0);
    return;
  }

  let total = 0;
  items.innerHTML = carrito.map((item, index) => {
    const p = productos.find(x => x.id === item.id);
    const subtotal = (p ? p.precio : 0) * item.cantidad;
    total += subtotal;
    return `
      <div class="cart-item">
        <div>
          <strong>${p ? p.nombre : "Producto"}</strong><br>
          <small>Talle: ${item.size} · Cantidad: ${item.cantidad}</small><br>
          <small style="color:var(--orange);font-weight:700;">${money(subtotal)}</small>
        </div>
        <button class="remove" style="color:#ff4444;background:none;border:0;cursor:pointer;font-weight:bold;font-size:13px;" onclick="removeItem(${index})">✕ Quitar</button>
      </div>
    `;
  }).join("");

  if (totalEl) totalEl.textContent = money(total);
}

function removeItem(index) {
  carrito.splice(index, 1);
  saveCart();
}

function buildWhatsappMessage() {
  if (!carrito.length) return "";

  let total = 0;
  let lines = ["Hola BOX DEPORTES! 👋", "", "Quiero realizar el siguiente pedido:", ""];

  carrito.forEach(item => {
    const p = productos.find(x => x.id === item.id);
    const subtotal = (p ? p.precio : 0) * item.cantidad;
    total += subtotal;
    lines.push(`• ${p ? p.nombre : "Producto"} — Talle: ${item.size} — Cantidad: ${item.cantidad} — ${money(subtotal)}`);
  });

  lines.push("", `TOTAL ESTIMADO: ${money(total)}`, "", "Quedo a la espera de confirmación de stock y datos para el pago y envío. ¡Muchas gracias!");
  return lines.join("\n");
}

function openWhatsapp() {
  const msg = buildWhatsappMessage();
  if (!msg) {
    alert("Primero agregá al menos un producto al carrito.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}

function openCart() { 
  const overlay = document.getElementById("cartOverlay");
  if (overlay) overlay.classList.add("open"); 
}
function closeCart() { 
  const overlay = document.getElementById("cartOverlay");
  if (overlay) overlay.classList.remove("open"); 
}

const cartBtn = document.getElementById("cartBtn");
if (cartBtn) cartBtn.addEventListener("click", openCart);

const closeCartBtn = document.getElementById("closeCart");
if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);

const sendOrderBtn = document.getElementById("sendOrder");
if (sendOrderBtn) sendOrderBtn.addEventListener("click", openWhatsapp);

const clearCartBtn = document.getElementById("clearCart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    carrito = [];
    saveCart();
  });
}

const searchInputEl = document.getElementById("searchInput");
if (searchInputEl) searchInputEl.addEventListener("input", renderProducts);

const categorySelectEl = document.getElementById("categorySelect");
if (categorySelectEl) categorySelectEl.addEventListener("change", renderProducts);

// Enlaces directos a WhatsApp
const generalMessage = "Hola BOX DEPORTES! Quiero consultar por sus productos del catálogo.";
const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(generalMessage)}`;
const heroWa = document.getElementById("heroWhatsapp");
if (heroWa) heroWa.href = waUrl;

const floatingWa = document.getElementById("floatingWhatsapp");
if (floatingWa) floatingWa.href = waUrl;

const footerWaBtn = document.getElementById("footerWhatsappBtn");
if (footerWaBtn) footerWaBtn.href = waUrl;

// Carga inicial
renderProducts();
renderCart();
