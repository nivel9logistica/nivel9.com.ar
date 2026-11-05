// js/motor.js - Lógica de interactividad e inyección dinámica
document.addEventListener("DOMContentLoaded", () => {
  vincularEnlacesGlobales();
  inicializarVentanasServicios();
  inicializarControlVideo();
});

function vincularEnlacesGlobales() {
  const { links } = NIVEL9_CONFIG;
  
  const setLink = (id, url) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  };

  setLink("btn-header-wsp", links.whatsapp);
  setLink("btn-header-cotizador", links.cotizador);
  setLink("btn-hero-cotizar", links.cotizador);
  setLink("btn-hero-portal", links.portalCargas);
  setLink("footer-link-portal", links.portalPublico);
  setLink("footer-link-cotizador", links.cotizador);
  setLink("footer-link-wsp", links.whatsapp);
  setLink("floating-wsp", links.whatsapp);
}

function renderStage(key) {
  const data = NIVEL9_CONFIG.servicios[key];
  const stage = document.getElementById("service-stage");
  if (!data || !stage) return;

  const urlDestino = NIVEL9_CONFIG.links[data.botonAccion] || NIVEL9_CONFIG.links.whatsapp;

  stage.innerHTML = `
    <div class="stage-grid">
      <div class="stage-img-wrapper">
        <span class="stage-badge">${data.tag}</span>
        <img src="${data.imagen}" alt="${data.titulo}" onerror="this.src='https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80';" />
      </div>
      <div class="stage-info">
        <h3>${data.titulo}</h3>
        <p>${data.descripcion}</p>
        <ul class="stage-features">
          ${data.caracteristicas.map(item => `<li><span>✓</span> ${item}</li>`).join("")}
        </ul>
        <a href="${urlDestino}" target="_blank" class="btn-orange">[ ${data.botonTexto} ]</a>
      </div>
    </div>
  `;
}

function inicializarVentanasServicios() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const navLinks = document.querySelectorAll("[data-tab-target]");

  const activarPestaña = (key) => {
    tabBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === key));
    renderStage(key);
  };

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      activarPestaña(btn.getAttribute("data-tab"));
    });
  });

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-tab-target");
      activarPestaña(target);
      document.querySelector(".control-center").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Carga inicial
  renderStage("mudanzas");
}

function inicializarControlVideo() {
  const video = document.getElementById("ai-host-video");
  const audioBtn = document.getElementById("toggle-audio-btn");
  
  if (video && audioBtn) {
    audioBtn.addEventListener("click", () => {
      if (video.muted) {
        video.muted = false;
        audioBtn.textContent = "🔇 Silenciar";
      } else {
        video.muted = true;
        audioBtn.textContent = "🔊 Activar audio";
      }
    });
  }
}
