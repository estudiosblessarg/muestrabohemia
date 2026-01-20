// ==================================================
// CONFIGURACIÓN CENTRAL
// ==================================================
const SITE = {
  name: "Bohemia",
  slogan: "Panadería artesanal.",
  manifesto: [
    "Delicias para el paladar.",
    "Pan elaborado a mano todos los días.",
    "Elavorados con harinas de primera calidad.",
    "Sabor auténtico, como antes."
  ],

  // Coordenadas reales (Capital Federal)
  lat: -34.6410833,
  lon: -58.4799167,

  address: "Av. Lacarra 1234, Buenos Aires, Argentina"
};

// ==================================================
// HERO
// ==================================================
const hero = document.getElementById("hero");

if (hero) {
  hero.innerHTML = `
    <div class="hero-bg" style="background-image:url('https://source.unsplash.com/1600x900/?bakery,bread')"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>${SITE.name}</h1>
      <p>${SITE.slogan}</p>
    </div>
  `;
}

// ==================================================
// MANIFESTO
// ==================================================
const manifesto = document.getElementById("manifesto");

const manifestoImages = [
  "img/img1.jpg",
  "img/img2.jpg",
  "img/img3.jpg",
  "img/img4.jpg"
];

if (manifesto) {
  manifesto.innerHTML = `
    <h2>Nuestros productos</h2>
    <div class="manifesto-grid">
      ${SITE.manifesto.map((line, i) => `
        <div class="manifesto-card">
          <img
            src="${manifestoImages[i] || manifestoImages[0]}"
            loading="lazy"
            alt="Producto de panadería artesanal"
          >
          <p>${line}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// ==================================================
// CLIMA (Open-Meteo)
// ==================================================
async function loadWeather(lat, lon) {
  const weatherEl = document.getElementById("weather");
  if (!weatherEl) return;

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await res.json();

    weatherEl.textContent = data.current_weather.temperature + "°C";
  } catch (err) {
    weatherEl.textContent = "No disponible";
  }
}

// ==================================================
// MAPA (COORDENADAS DIRECTAS, SIN CORS, ZOOM FIJO)
// ==================================================
(() => {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map", {
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    boxZoom: false,
    keyboard: false
  }).setView([SITE.lat, SITE.lon], 19);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 19
  }).addTo(map);

  L.marker([SITE.lat, SITE.lon])
    .addTo(map)
    .bindPopup(`<strong>${SITE.name}</strong><br>${SITE.address}`)
    .openPopup();

  loadWeather(SITE.lat, SITE.lon);
})();

// ==================================================
// NAV SCROLL SUAVE
// ==================================================
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ==================================================
// FOOTER
// ==================================================
const footer = document.getElementById("footer");

if (footer) {
  footer.innerHTML = `
    <div class="footer-content">
      <span>© ${new Date().getFullYear()} ${SITE.name}</span>
      <span>Powered by <strong>Estudios Bless</strong></span>
    </div>
  `;
}
