// js/motor.js - Lógica interactiva, Sincronización en la Nube (Supabase) y Panel Admin
const SUPABASE_URL = "https://yfrgqyezynojohqgkxjt.supabase.co";
const SUPABASE_KEY = "sb_publishable_JAp9zWYr_ugkEkVg0WPI5A_gaA5I0sL";

let supabaseClient = null;
let pestanaActivaActual = "mudanzas";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Renderizado rápido inicial con configuración base / caché local
  cargarConfiguracionLocal();
  refrescarTodaLaPagina();
  inicializarVentanasServicios();
  inicializarPanelAdmin();

  // 2. Conectar a Supabase y traer la última versión de la nube para todos los dispositivos
  await inicializarSupabaseYCargarNube();
});

// CARGA EL SDK DE SUPABASE AUTOMÁTICAMENTE Y SINCRONIZA DESDE LA NUBE
async function inicializarSupabaseYCargarNube() {
  try {
    if (!window.supabase) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    if (window.supabase && typeof window.supabase.createClient === "function") {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

      const { data, error } = await supabaseClient
        .from("configuracion_web")
        .select("datos")
        .eq("id", "principal")
        .maybeSingle();

      if (!error && data && data.datos) {
         fusionarConfiguracion(data.datos);
        localStorage.setItem("nivel9_custom_config", JSON.stringify(NIVEL9_CONFIG));
        refrescarTodaLaPagina();
      }
    }
  } catch (e) {
    console.warn("Modo local activo (sin conexión a tabla remota aún):", e);
  }
}

function fusionarConfiguracion(remoto) {
  if (!remoto) return;
  if (remoto.empresa) Object.assign(NIVEL9_CONFIG.empresa, remoto.empresa);
  if (remoto.textosWeb) {
    NIVEL9_CONFIG.textosWeb = Object.assign(NIVEL9_CONFIG.textosWeb || {}, remoto.textosWeb);
  }
  if (remoto.links) Object.assign(NIVEL9_CONFIG.links, remoto.links);
  if (Array.isArray(remoto.accesosDirectos) && remoto.accesosDirectos.length > 0) {
    NIVEL9_CONFIG.accesosDirectos = remoto.accesosDirectos;
  }
  if (remoto.servicios) {
    NIVEL9_CONFIG.servicios = remoto.servicios;
  }
  sanitizarTextosPolo52();
}

function cargarConfiguracionLocal() {
  const localData = localStorage.getItem("nivel9_custom_config");
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      fusionarConfiguracion(parsed);
    } catch (e) {
      console.warn("Error leyendo caché local:", e);
    }
  }
  sanitizarTextosPolo52();
}

function sanitizarTextosPolo52() {
  if (NIVEL9_CONFIG.servicios && NIVEL9_CONFIG.servicios.corporativo) {
    const corp = NIVEL9_CONFIG.servicios.corporativo;
    if (/nuestra nave/i.test(corp.descripcion)) {
      corp.descripcion = "Operamos con gran presencia estratégica en Polo 52, el centro logístico más importante del interior de Córdoba. Servicios directos de cross-docking, consolidación y distribución capilar.";
    }
    if (Array.isArray(corp.caracteristicas)) {
      corp.caracteristicas = corp.caracteristicas.map((c) =>
        c.replace(/Nave log[íi]stica en Polo 52/gi, "Fuerte presencia operativa en Polo 52")
      );
    }
  }
}

function refrescarTodaLaPagina() {
  aplicarDatosEmpresa();
  aplicarTextosWeb();
  vincularEnlacesGlobales();
  renderizarAccesosPie();
  renderizarPestanas();
  renderStage(pestanaActivaActual);
}

// GUARDA EN SUPABASE (PARA TODOS LOS CELULARES Y PC) Y EN CACHÉ LOCAL
async function guardarConfiguracionGlobal(mensajeExito) {
  try {
    localStorage.setItem("nivel9_custom_config", JSON.stringify(NIVEL9_CONFIG));
  } catch (e) {
    console.warn("Memoria local llena, guardando en nube...");
  }

  if (supabaseClient) {
    const { error } = await supabaseClient
      .from("configuracion_web")
      .upsert(
        [{ id: "principal", datos: NIVEL9_CONFIG, actualizado: new Date().toISOString() }],
        { onConflict: "id" }
      );

    if (error) {
      alert("Se guardó en este dispositivo, pero faltó sincronizar con Supabase: " + error.message);
      return;
    }
  }

  if (mensajeExito) alert(mensajeExito);
}

// APLICACIÓN DE DATOS EN PANTALLA
function aplicarDatosEmpresa() {
  const emp = NIVEL9_CONFIG.empresa;
  const elLema1 = document.getElementById("footer-lema-1");
  const elLema2 = document.getElementById("footer-lema-2");
  const elBase = document.getElementById("footer-base");

  if (elLema1) elLema1.textContent = emp.lema1;
  if (elLema2) elLema2.textContent = emp.lema2;
  if (elBase) elBase.textContent = emp.baseOperativa;
}

function aplicarTextosWeb() {
  if (!NIVEL9_CONFIG.textosWeb) return;
  const t = NIVEL9_CONFIG.textosWeb;

  const badgeEl = document.querySelector(".hero-badge");
  const subEl = document.querySelector(".hero-subtitle");
  if (badgeEl && t.badgeHero) badgeEl.textContent = t.badgeHero;
  if (subEl && t.subtituloHero) subEl.textContent = t.subtituloHero;

  const cellItems = document.querySelectorAll(".trust-cell-item");
  if (cellItems.length >= 3) {
    if (t.celula1Titulo) cellItems[0].querySelector("h4").textContent = t.celula1Titulo;
    if (t.celula1Texto) cellItems[0].querySelector("p").textContent = t.celula1Texto;
    if (t.celula2Titulo) cellItems[1].querySelector("h4").textContent = t.celula2Titulo;
    if (t.celula2Texto) cellItems[1].querySelector("p").textContent = t.celula2Texto;
    if (t.celula3Titulo) cellItems[2].querySelector("h4").textContent = t.celula3Titulo;
    if (t.celula3Texto) cellItems[2].querySelector("p").textContent = t.celula3Texto;
  }
}

function vincularEnlacesGlobales() {
  const { links } = NIVEL9_CONFIG;
  const setLink = (id, url) => {
    const el = document.getElementById(id);
    if (el && url) el.href = url;
  };

  setLink("btn-header-cotizador", links.cotizador);
  setLink("btn-hero-cotizar", links.cotizador);
  setLink("btn-hero-portal", links.portalPublico);
  setLink("footer-link-portal", links.portalPublico);
  setLink("footer-link-cotizador", links.cotizador);
}

function renderizarAccesosPie() {
  const container = document.querySelector(".footer-links");
  if (!container || !Array.isArray(NIVEL9_CONFIG.accesosDirectos)) return;

  container.innerHTML = NIVEL9_CONFIG.accesosDirectos.map((acc) => `
    <a href="${acc.url}" target="_blank" class="footer-large-link ${acc.destacado ? 'guardia-accent' : ''}">
      <span class="link-bullet">▶</span> ${acc.nombre}
    </a>
  `).join("");
}

// PESTAÑAS Y VENTANAS DE SERVICIOS (FOTOS LIMPIAS SIN TÍTULOS)
function renderizarPestanas() {
  const tabsContainer = document.getElementById("services-tabs-container");
  if (!tabsContainer) return;

  const keys = Object.keys(NIVEL9_CONFIG.servicios);
  if (!keys.includes(pestanaActivaActual)) {
    pestanaActivaActual = keys[0];
  }

  tabsContainer.innerHTML = keys.map((k, index) => {
    const s = NIVEL9_CONFIG.servicios[k];
    const num = String(index + 1).padStart(2, "0");
    const isActive = k === pestanaActivaActual;
    return `<button class="tab-btn ${isActive ? 'active' : ''}" data-tab="${k}">[ ${num} ${s.nombreMenu.toUpperCase()} ]</button>`;
  }).join("");
}

function renderStage(key) {
  const data = NIVEL9_CONFIG.servicios[key];
  const stage = document.getElementById("service-stage");
  if (!data || !stage) return;

  pestanaActivaActual = key;
  const urlDestino = NIVEL9_CONFIG.links[data.botonAccion] || data.botonAccion || NIVEL9_CONFIG.links.wspOperaciones;

  const galeriaValida = Array.isArray(data.galeria) && data.galeria.length > 0
    ? data.galeria
    : (data.imagenPrincipal ? [{ url: data.imagenPrincipal }] : []);

  const fotoInicial = data.imagenPrincipal || (galeriaValida[0] && (galeriaValida[0].url || galeriaValida[0])) || "";

  const thumbsHtml = galeriaValida.map((item, index) => {
    const imgSrc = typeof item === "string" ? item : item.url;
    const isAct = imgSrc === fotoInicial || index === 0;
    return `
      <div class="thumb-item ${isAct ? 'active' : ''}" onclick="cambiarFotoPrincipal('${imgSrc}', this)">
        <img src="${imgSrc}" alt="" />
      </div>
    `;
  }).join("");

  const caracteristicasList = Array.isArray(data.caracteristicas) ? data.caracteristicas : [];

  stage.innerHTML = `
    <div class="stage-grid">
      <div class="stage-visuals">
        <div class="main-img-box">
          <img id="active-stage-img" src="${fotoInicial}" alt="" />
        </div>
        <div class="thumbs-strip">
          ${thumbsHtml}
        </div>
      </div>
      <div class="stage-info">
        <h3>${data.titulo}</h3>
        <p>${data.descripcion}</p>
        <ul class="stage-features">
          ${caracteristicasList.map((item) => `<li><span>✓</span> ${item}</li>`).join("")}
        </ul>
        <a href="${urlDestino}" target="_blank" class="btn-orange">[ ${data.botonTexto} ]</a>
      </div>
    </div>
  `;
}

window.cambiarFotoPrincipal = function(src, el) {
  const mainImg = document.getElementById("active-stage-img");
  if (mainImg) mainImg.src = src;

  document.querySelectorAll(".thumb-item").forEach((t) => t.classList.remove("active"));
  if (el) el.classList.add("active");
};

function inicializarVentanasServicios() {
  const container = document.getElementById("services-tabs-container");
  const navLinks = document.querySelectorAll("[data-tab-target]");

  const activarPestana = (key) => {
    document.querySelectorAll(".tab-btn").forEach((b) =>
      b.classList.toggle("active", b.getAttribute("data-tab") === key)
    );
    renderStage(key);
  };

  if (container) {
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (btn) activarPestana(btn.getAttribute("data-tab"));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-tab-target");
      if (NIVEL9_CONFIG.servicios[target]) activarPestana(target);
      const ctrlCenter = document.querySelector(".control-center");
      if (ctrlCenter) ctrlCenter.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// COMPRESOR AUTOMÁTICO DE FOTOS PARA SUBIDA RÁPIDA EN NUBE Y CELULARES
function comprimirImagenArchivo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxAncho = 1100;
        let w = img.width;
        let h = img.height;
        if (w > maxAncho) {
          h = Math.round((h * maxAncho) / w);
          w = maxAncho;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.80));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// PANEL DE ADMINISTRACIÓN (CON CAMBIO DE PESTAÑAS ACTIVO Y GUARDADO EN SUPABASE)
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

  gearBtn.addEventListener("click", () => {
    modal.classList.add("open");
    if (panelView && panelView.style.display !== "none") {
      construirInterfazAdminCompleta();
    }
  });

  closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  // ACTIVADOR DE LAS 4 PESTAÑAS DEL ENGRANAJE (FOTOS / TEXTOS WEB / ACCESOS / PIE)
  const admTabs = document.querySelectorAll(".adm-tab");
  admTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      admTabs.forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".adm-section").forEach((s) => s.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-adm-sec");
      const targetSec = document.getElementById(targetId);
      if (targetSec) targetSec.classList.add("active");
    });
  });

  submitLogin.addEventListener("click", () => {
    if (userInput.value.trim().toLowerCase() === "admin" && passInput.value.trim() === "2468") {
      loginView.style.display = "none";
      panelView.style.display = "block";
      errorMsg.style.display = "none";
      construirInterfazAdminCompleta();
    } else {
      errorMsg.style.display = "block";
    }
  });
}

function construirInterfazAdminCompleta() {
  const secFotos = document.getElementById("sec-fotos");
  const secTextos = document.getElementById("sec-textos");
  const secAccesos = document.getElementById("sec-accesos");
  const secDatos = document.getElementById("sec-datos");

  // 1. PESTAÑA FOTOS
  if (secFotos) {
    secFotos.innerHTML = `
      <div class="form-group">
        <label>División de destino</label>
        <select id="new-img-category"></select>
      </div>
      <div class="form-group">
        <label>O crear NUEVA División</label>
        <input type="text" id="new-category-name" placeholder="Ej: Logística Industrial" />
      </div>
      <div class="form-group">
        <label>URL de imagen o Subir foto desde tu PC / Celular</label>
        <input type="text" id="new-img-url" placeholder="./js/assets/img/foto.jpg o link https://" />
        <input type="file" id="new-img-file" accept="image/*" class="file-picker" style="margin-top:8px;" />
      </div>
      <button id="btn-save-image" class="btn-orange full-width">Guardar y Publicar Imagen</button>
      <hr style="border:0; border-top:1px solid #3f3f46; margin:16px 0;" />
      <label style="display:block; font-size:0.85rem; color:#a1a1aa; margin-bottom:8px;">Fotos actuales en esta división:</label>
      <div id="admin-current-photos-list" style="display:flex; gap:10px; flex-wrap:wrap; max-height:150px; overflow-y:auto;"></div>
    `;

    const catSelect = document.getElementById("new-img-category");
    const keys = Object.keys(NIVEL9_CONFIG.servicios);
    catSelect.innerHTML = keys.map((k) => `<option value="${k}">${NIVEL9_CONFIG.servicios[k].nombreMenu}</option>`).join("");
    catSelect.value = pestanaActivaActual;

    const renderListaFotosAdmin = () => {
      const k = catSelect.value;
      const listEl = document.getElementById("admin-current-photos-list");
      const serv = NIVEL9_CONFIG.servicios[k];
      if (!serv || !listEl) return;
      listEl.innerHTML = (serv.galeria || []).map((item, idx) => {
        const src = typeof item === "string" ? item : item.url;
        return `
          <div style="position:relative; width:70px; height:52px; border:1px solid #3f3f46; border-radius:6px; overflow:hidden;">
            <img src="${src}" style="width:100%; height:100%; object-fit:cover;" />
            <button type="button" onclick="eliminarFotoAdmin('${k}', ${idx})" title="Eliminar foto" style="position:absolute; top:2px; right:2px; background:#ef4444; color:#fff; border:none; border-radius:4px; width:18px; height:18px; font-size:11px; line-height:1; cursor:pointer;">&times;</button>
          </div>
        `;
      }).join("");
    };

    catSelect.addEventListener("change", renderListaFotosAdmin);
    renderListaFotosAdmin();

    document.getElementById("btn-save-image").addEventListener("click", async () => {
      const btn = document.getElementById("btn-save-image");
      let catKey = catSelect.value;
      const newCatName = document.getElementById("new-category-name").value.trim();
      const fileInput = document.getElementById("new-img-file");
      const urlInput = document.getElementById("new-img-url");

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

      const procesarGuardadoImagen = async (imgSrc) => {
        btn.disabled = true;
        btn.textContent = "Sincronizando en la nube...";
        const srv = NIVEL9_CONFIG.servicios[catKey];
        if (!Array.isArray(srv.galeria)) srv.galeria = [];
        srv.galeria.push({ url: imgSrc, titulo: "" });
        srv.imagenPrincipal = imgSrc;

        renderizarPestanas();
        renderStage(catKey);
        renderListaFotosAdmin();
        await guardarConfiguracionGlobal("¡Imagen publicada en todos los dispositivos!");

        urlInput.value = "";
        fileInput.value = "";
        document.getElementById("new-category-name").value = "";
        btn.disabled = false;
        btn.textContent = "Guardar y Publicar Imagen";
      };

      if (fileInput.files && fileInput.files[0]) {
        const b64Optimizada = await comprimirImagenArchivo(fileInput.files[0]);
        await procesarGuardadoImagen(b64Optimizada);
      } else if (urlInput.value.trim()) {
        await procesarGuardadoImagen(urlInput.value.trim());
      } else {
        alert("Seleccioná una imagen o pegá una URL.");
      }
    });
  }

  // 2. PESTAÑA TEXTOS WEB
  if (secTextos) {
    const t = NIVEL9_CONFIG.textosWeb || {};
    const keys = Object.keys(NIVEL9_CONFIG.servicios);

    secTextos.innerHTML = `
      <div style="max-height:340px; overflow-y:auto; padding-right:6px;">
        <div class="form-group">
          <label>Subtítulo de Portada (Hero)</label>
          <textarea id="adm-hero-sub" rows="3" style="width:100%; background:#18181b; color:#fff; border:1px solid #3f3f46; border-radius:8px; padding:8px;">${t.subtituloHero || ""}</textarea>
        </div>
        <div class="form-group">
          <label>Célula 1 (Título y Texto)</label>
          <input type="text" id="adm-c1-tit" value="${t.celula1Titulo || ""}" style="margin-bottom:5px;" />
          <input type="text" id="adm-c1-txt" value="${t.celula1Texto || ""}" />
        </div>
        <div class="form-group">
          <label>Célula 2 (Título y Texto)</label>
          <input type="text" id="adm-c2-tit" value="${t.celula2Titulo || ""}" style="margin-bottom:5px;" />
          <input type="text" id="adm-c2-txt" value="${t.celula2Texto || ""}" />
        </div>
        <div class="form-group">
          <label>Célula 3 (Título y Texto)</label>
          <input type="text" id="adm-c3-tit" value="${t.celula3Titulo || ""}" style="margin-bottom:5px;" />
          <input type="text" id="adm-c3-txt" value="${t.celula3Texto || ""}" />
        </div>
        <hr style="border:0; border-top:1px solid #3f3f46; margin:14px 0;" />
        <div class="form-group">
          <label>Editar Textos de Ventana de Servicio:</label>
          <select id="adm-serv-select">
            ${keys.map((k) => `<option value="${k}">${NIVEL9_CONFIG.servicios[k].nombreMenu}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label>Título de la División</label>
          <input type="text" id="adm-serv-titulo" />
        </div>
        <div class="form-group">
          <label>Descripción de la División</label>
          <textarea id="adm-serv-desc" rows="2" style="width:100%; background:#18181b; color:#fff; border:1px solid #3f3f46; border-radius:8px; padding:8px;"></textarea>
        </div>
        <div class="form-group">
          <label>Ítems con tilde ✓ (Uno por renglón)</label>
          <textarea id="adm-serv-items" rows="4" style="width:100%; background:#18181b; color:#fff; border:1px solid #3f3f46; border-radius:8px; padding:8px;"></textarea>
        </div>
        <div class="form-group">
          <label>Texto del Botón Naranja</label>
          <input type="text" id="adm-serv-btn" />
        </div>
      </div>
      <button id="btn-save-all-textos" class="btn-orange full-width" style="margin-top:12px;">Guardar y Publicar Textos</button>
    `;

    const servSelect = document.getElementById("adm-serv-select");
    const cargarCamposServicio = () => {
      const s = NIVEL9_CONFIG.servicios[servSelect.value];
      if (!s) return;
      document.getElementById("adm-serv-titulo").value = s.titulo || "";
      document.getElementById("adm-serv-desc").value = s.descripcion || "";
      document.getElementById("adm-serv-items").value = (s.caracteristicas || []).join("\n");
      document.getElementById("adm-serv-btn").value = s.botonTexto || "";
    };
    servSelect.addEventListener("change", cargarCamposServicio);
    cargarCamposServicio();

    document.getElementById("btn-save-all-textos").addEventListener("click", async () => {
      const btn = document.getElementById("btn-save-all-textos");
      btn.disabled = true;
      btn.textContent = "Guardando en la nube...";

      NIVEL9_CONFIG.textosWeb = {
        badgeHero: "OPERACIONES LOGÍSTICAS NACIONALES",
        subtituloHero: document.getElementById("adm-hero-sub").value.trim(),
        celula1Titulo: document.getElementById("adm-c1-tit").value.trim(),
        celula1Texto: document.getElementById("adm-c1-txt").value.trim(),
        celula2Titulo: document.getElementById("adm-c2-tit").value.trim(),
        celula2Texto: document.getElementById("adm-c2-txt").value.trim(),
        celula3Titulo: document.getElementById("adm-c3-tit").value.trim(),
        celula3Texto: document.getElementById("adm-c3-txt").value.trim()
      };

      const sk = servSelect.value;
      if (NIVEL9_CONFIG.servicios[sk]) {
        NIVEL9_CONFIG.servicios[sk].titulo = document.getElementById("adm-serv-titulo").value.trim();
        NIVEL9_CONFIG.servicios[sk].descripcion = document.getElementById("adm-serv-desc").value.trim();
        NIVEL9_CONFIG.servicios[sk].caracteristicas = document.getElementById("adm-serv-items").value
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        NIVEL9_CONFIG.servicios[sk].botonTexto = document.getElementById("adm-serv-btn").value.trim();
      }

      aplicarTextosWeb();
      renderStage(sk);
      await guardarConfiguracionGlobal("¡Textos publicados en todos los dispositivos!");
      btn.disabled = false;
      btn.textContent = "Guardar y Publicar Textos";
    });
  }

  // 3. PESTAÑA ACCESOS DIRECTOS
  if (secAccesos) {
    secAccesos.innerHTML = `
      <div class="form-group">
        <label>Link del Autocotizador</label>
        <input type="text" id="adm-url-cotizador" value="${NIVEL9_CONFIG.links.cotizador || ""}" />
      </div>
      <div class="form-group">
        <label>Link del Portal Público / B2B</label>
        <input type="text" id="adm-url-portal" value="${NIVEL9_CONFIG.links.portalPublico || ""}" />
      </div>
      <button id="btn-save-main-links" class="btn-orange full-width" style="margin-bottom:14px;">Guardar Links Principales</button>
      <hr style="border:0; border-top:1px solid #3f3f46; margin:12px 0;" />
      <div class="form-group">
        <label>Agregar Nuevo Acceso Directo al Pie</label>
        <input type="text" id="adm-link-name" placeholder="Nombre (Ej: Seguimiento Satelital)" style="margin-bottom:6px;" />
        <input type="text" id="adm-link-url" placeholder="https://..." />
      </div>
      <button id="btn-add-link" class="btn-orange full-width">Agregar y Publicar Acceso</button>
      <div id="adm-accesos-list" style="margin-top:12px; max-height:110px; overflow-y:auto;"></div>
    `;

    const renderListaAccesosAdmin = () => {
      const box = document.getElementById("adm-accesos-list");
      if (!box) return;
      box.innerHTML = (NIVEL9_CONFIG.accesosDirectos || []).map((acc, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:5px 8px; background:#18181b; border:1px solid #27272a; border-radius:6px; margin-bottom:4px; font-size:0.85rem;">
          <span>▶ ${acc.nombre}</span>
          <button type="button" onclick="eliminarAccesoAdmin(${i})" style="background:#ef4444; color:#fff; border:none; border-radius:4px; padding:2px 7px; cursor:pointer;">Quitar</button>
        </div>
      `).join("");
    };
    renderListaAccesosAdmin();

    document.getElementById("btn-save-main-links").addEventListener("click", async () => {
      NIVEL9_CONFIG.links.cotizador = document.getElementById("adm-url-cotizador").value.trim();
      NIVEL9_CONFIG.links.portalPublico = document.getElementById("adm-url-portal").value.trim();
      vincularEnlacesGlobales();
      renderStage(pestanaActivaActual);
      await guardarConfiguracionGlobal("¡Links principales actualizados en todos los dispositivos!");
    });

    document.getElementById("btn-add-link").addEventListener("click", async () => {
      const name = document.getElementById("adm-link-name").value.trim();
      const url = document.getElementById("adm-link-url").value.trim();
      if (!name || !url) return alert("Completá el nombre y el link.");
      if (!Array.isArray(NIVEL9_CONFIG.accesosDirectos)) NIVEL9_CONFIG.accesosDirectos = [];
      NIVEL9_CONFIG.accesosDirectos.push({ nombre: name, url: url, destacado: false });
      renderizarAccesosPie();
      renderListaAccesosAdmin();
      document.getElementById("adm-link-name").value = "";
      document.getElementById("adm-link-url").value = "";
      await guardarConfiguracionGlobal("¡Acceso directo agregado en todos los dispositivos!");
    });
  }

  // 4. PESTAÑA PIE DE PÁGINA
  if (secDatos) {
    secDatos.innerHTML = `
      <div class="form-group">
        <label>Línea 1</label>
        <input type="text" id="adm-lema-1" value="${NIVEL9_CONFIG.empresa.lema1 || ""}" />
      </div>
      <div class="form-group">
        <label>Línea 2</label>
        <input type="text" id="adm-lema-2" value="${NIVEL9_CONFIG.empresa.lema2 || ""}" />
      </div>
      <div class="form-group">
        <label>Base Operativa</label>
        <input type="text" id="adm-base" value="${NIVEL9_CONFIG.empresa.baseOperativa || ""}" />
      </div>
      <button id="btn-save-footer" class="btn-orange full-width">Guardar y Publicar Pie</button>
    `;

    document.getElementById("btn-save-footer").addEventListener("click", async () => {
      NIVEL9_CONFIG.empresa.lema1 = document.getElementById("adm-lema-1").value.trim();
      NIVEL9_CONFIG.empresa.lema2 = document.getElementById("adm-lema-2").value.trim();
      NIVEL9_CONFIG.empresa.baseOperativa = document.getElementById("adm-base").value.trim();
      aplicarDatosEmpresa();
      await guardarConfiguracionGlobal("¡Datos del pie publicados en todos los dispositivos!");
    });
  }
}

window.eliminarFotoAdmin = async function(catKey, index) {
  const srv = NIVEL9_CONFIG.servicios[catKey];
  if (!srv || !Array.isArray(srv.galeria)) return;
  srv.galeria.splice(index, 1);
  srv.imagenPrincipal = srv.galeria[0] ? (srv.galeria[0].url || srv.galeria[0]) : "";
  renderStage(catKey);
  construirInterfazAdminCompleta();
  await guardarConfiguracionGlobal("Foto eliminada.");
};

window.eliminarAccesoAdmin = async function(index) {
  if (!Array.isArray(NIVEL9_CONFIG.accesosDirectos)) return;
  NIVEL9_CONFIG.accesosDirectos.splice(index, 1);
  renderizarAccesosPie();
  construirInterfazAdminCompleta();
  await guardarConfiguracionGlobal("Acceso eliminado.");
};
