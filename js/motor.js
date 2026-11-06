// js/motor.js - Lógica interactiva y Panel Administrador
document.addEventListener("DOMContentLoaded", () => {
  cargarConfiguracionGuardada();
  vincularEnlacesGlobales();
  renderizarPestanas();
  inicializarVentanasServicios();
  inicializarControlVideo();
  inicializarPanelAdmin();
});

function cargarConfiguracionGuardada() {
  const localData = localStorage.getItem("nivel9_custom_config");
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (parsed.empresa) Object.assign(NIVEL9_CONFIG.empresa, parsed.empresa);
      if (parsed.servicios) Object.assign(NIVEL9_CONFIG.servicios, parsed.servicios);
    } catch (e) {
      console.warn(e);
    }
  }
  aplicarDatosEmpresa();
}

function aplicarDatosEmpresa() {
  const emp = NIVEL9_CONFIG.empresa;
  const elLema1 = document.getElementById("footer-lema-1");
  const elLema2 = document.getElementById("footer-lema-2");
  const elBase = document.getElementById("footer-base");

  if (elLema1) elLema1.textContent = emp.lema1;
  if (elLema2) elLema2.textContent = emp.lema2;
  if (elBase) elBase.textContent = emp.baseOperativa;
}

function vincularEnlacesGlobales() {
  const { links } = NIVEL9_CONFIG;
  const setLink = (id, url) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  };

  setLink("btn-header-cotizador", links.cotizador);
  setLink("btn-hero-cotizar", links.cotizador);
  setLink("btn-hero-portal", links.portalPublico);
  setLink("footer-link-portal", links.portalPublico);
  setLink("footer-link-cotizador", links.cotizador);
}

function renderizarPestanas() {
  const tabsContainer = document.getElementById("services-tabs-container");
  const selectCategory = document.getElementById("new-img-category");
  if (!tabsContainer) return;

  const keys = Object.keys(NIVEL9_CONFIG.servicios);

  tabsContainer.innerHTML = keys.map((k, index) => {
    const s = NIVEL9_CONFIG.servicios[k];
    const num = String(index + 1).padStart(2, "0");
    return `<button class="tab-btn ${index === 0 ? 'active' : ''}" data-tab="${k}">[ ${num} ${s.nombreMenu.toUpperCase()} ]</button>`;
  }).join("");

  if (selectCategory) {
    selectCategory.innerHTML = keys.map(k => {
      const s = NIVEL9_CONFIG.servicios[k];
      return `<option value="${k}">${s.nombreMenu}</option>`;
    }).join("");
  }
}

function renderStage(key) {
  const data = NIVEL9_CONFIG.servicios[key];
  const stage = document.getElementById("service-stage");
  if (!data || !stage) return;

  const urlDestino = NIVEL9_CONFIG.links[data.botonAccion] || NIVEL9_CONFIG.links.wspOperaciones;

  const thumbsHtml = data.galeria.map((item, index) => {
    const imgSrc = typeof item === "string" ? item : item.url;
    const imgTitle = typeof item === "string" ? "Operación Nivel 9" : (item.titulo || "");
    return `
      <div class="thumb-item ${index === 0 ? 'active' : ''}" onclick="cambiarFotoPrincipal('${imgSrc}', '${imgTitle}', this)" title="${imgTitle}">
        <img src="${imgSrc}" alt="${imgTitle}" />
      </div>
    `;
  }).join("");

  const activeTitle = data.galeria[0] && data.galeria[0].titulo ? data.galeria[0].titulo : data.tag;

  stage.innerHTML = `
    <div class="stage-grid">
      <div class="stage-visuals">
        <div class="main-img-box">
          <span class="stage-badge" id="active-stage-badge">${activeTitle}</span>
          <img id="active-stage-img" src="${data.imagenPrincipal}" alt="${data.titulo}" />
        </div>
        <div class="thumbs-strip">
          ${thumbsHtml}
        </div>
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

function cambiarFotoPrincipal(src, title, el) {
  const mainImg = document.getElementById("active-stage-img");
  const badge = document.getElementById("active-stage-badge");
  if (mainImg) mainImg.src = src;
  if (badge && title) badge.textContent = title;

  document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
  if (el) el.classList.add("active");
}

function inicializarVentanasServicios() {
  const container = document.getElementById("services-tabs-container");
  const navLinks = document.querySelectorAll("[data-tab-target]");

  const activarPestana = (key) => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === key));
    renderStage(key);
  };

  if (container) {
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-btn")) {
        activarPestana(e.target.getAttribute("data-tab"));
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-tab-target");
      activarPestana(target);
      document.querySelector(".control-center").scrollIntoView({ behavior: "smooth" });
    });
  });

  const firstKey = Object.keys(NIVEL9_CONFIG.servicios)[0];
  if (firstKey) renderStage(firstKey);
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

/* ADMINISTRACIÓN */
function inicializarPanelAdmin() {
  const gearBtn = document.getElementById("admin-gear-btn");
  const modal = document.getElementById("admin-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const submitLogin = document.getElementById("admin-submit-login");
  const userInput = document.getElementById("admin-user");
  const passInput = document.getElementById("admin-pass");
  const errorMsg = document.getElementById("login-error-msg");
  const loginView = document.getElementById("admin-login-view");
  const panelView = document.getElementById("admin-panel-view");

  if (!gearBtn || !modal) return;

  gearBtn.addEventListener("click", () => modal.classList.add("open"));
  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  submitLogin.addEventListener("click", () => {
    if (userInput.value.trim() === "Admin" && passInput.value.trim() === "2468") {
      loginView.style.display = "none";
      panelView.style.display = "block";
      errorMsg.style.display = "none";
    } else {
      errorMsg.style.display = "block";
    }
  });

  const admTabs = document.querySelectorAll(".adm-tab");
  admTabs.forEach(t => {
    t.addEventListener("click", () => {
      admTabs.forEach(tab => tab.classList.remove("active"));
      t.classList.add("active");
      const secId = t.getAttribute("data-adm-sec");
      document.querySelectorAll(".adm-section").forEach(s => s.classList.remove("active"));
      document.getElementById(secId).classList.add("active");
    });
  });

  const btnSaveImg = document.getElementById("btn-save-image");
  const fileInput = document.getElementById("new-img-file");
  const urlInput = document.getElementById("new-img-url");
  const titleInput = document.getElementById("new-img-title");
  const catSelect = document.getElementById("new-img-category");
  const newCatInput = document.getElementById("new-category-name");

  btnSaveImg.addEventListener("click", () => {
    const title = titleInput.value.trim() || "Operativo Nivel 9";
    let catKey = catSelect.value;
    const newCatName = newCatInput.value.trim();

    if (newCatName) {
      catKey = newCatName.toLowerCase().replace(/\s+/g, "-");
      if (!NIVEL9_CONFIG.servicios[catKey]) {
        NIVEL9_CONFIG.servicios[catKey] = {
          id: catKey,
          nombreMenu: newCatName,
          tag: "DIVISIÓN OPERATIVA",
          titulo: newCatName,
          descripcion: "Servicio logístico especializado con cobertura en Córdoba y todo el país.",
          caracteristicas: ["Unidades monitoreadas", "Personal calificado", "Seguro de carga"],
          imagenPrincipal: "",
          galeria: [],
          botonTexto: "Cotizar Servicio",
          botonAccion: "cotizador"
        };
      }
    }

    const guardarImagenFinal = (imgSrc) => {
      if (!NIVEL9_CONFIG.servicios[catKey].imagenPrincipal) {
        NIVEL9_CONFIG.servicios[catKey].imagenPrincipal = imgSrc;
      }
      NIVEL9_CONFIG.servicios[catKey].galeria.push({ url: imgSrc, titulo: title });
      localStorage.setItem("nivel9_custom_config", JSON.stringify(NIVEL9_CONFIG));
      
      renderizarPestanas();
      renderStage(catKey);
      modal.classList.remove("open");
      alert("¡Imagen agregada con éxito!");
    };

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => guardarImagenFinal(e.target.result);
      reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput.value.trim()) {
      guardarImagenFinal(urlInput.value.trim());
    } else {
      alert("Por favor seleccioná un archivo o ingresá una URL.");
    }
  });

  const btnSaveFooter = document.getElementById("btn-save-footer");
  btnSaveFooter.addEventListener("click", () => {
    NIVEL9_CONFIG.empresa.lema1 = document.getElementById("adm-lema-1").value.trim();
    NIVEL9_CONFIG.empresa.lema2 = document.getElementById("adm-lema-2").value.trim();
    NIVEL9_CONFIG.empresa.baseOperativa = document.getElementById("adm-base").value.trim();

    localStorage.setItem("nivel9_custom_config", JSON.stringify(NIVEL9_CONFIG));
    aplicarDatosEmpresa();
    modal.classList.remove("open");
    alert("¡Datos del pie actualizados!");
  });
}
