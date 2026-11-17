// js/config.js - Configuración Nivel 9 (Rutas vinculadas a js/assets/img/)
const NIVEL9_CONFIG = {
  empresa: {
    nombre: "NIVEL 9",
    lema1: "Logística de Excelencia",
    lema2: "Evolución Constante",
    baseOperativa: "Base Operativa: Polo 52, Córdoba"
  },
  textosWeb: {
    badgeHero: "OPERACIONES LOGÍSTICAS NACIONALES",
    subtituloHero: "El transporte inteligente que tu negocio y tu vida necesitan. Distribución estratégica, gran presencia operativa en Polo 52, flota monitoreada, respuestas inmediatas y cobertura integral desde Córdoba a todo el país.",
    celula1Titulo: "Mudanzas Particulares Seguras",
    celula1Texto: "Tratamos cada mobiliario como propio. Cuidado extremo, puntualidad y respaldo total para que tu mudanza sea impecable.",
    celula2Titulo: "Soluciones Corporativas B2B",
    celula2Texto: "Estructura logística y gran presencia operativa en Polo 52 para abastecimiento comercial, cross-docking y distribución capilar.",
    celula3Titulo: "Larga Distancia Federal",
    celula3Texto: "Conexión directa desde Córdoba hacia todo el país con monitoreo continuo y unidades habilitadas."
  },
  links: {
    cotizador: "https://nivel9logistica.github.io/cotizador-nivel9/",
    portalPublico: "https://nivel9logistica.github.io/portal-publico.html/",
    wspOperaciones: "https://wa.me/5493517046541?text=Hola%20Nivel%209,%20quiero%20cotizar%20un%20servicio.",
    wspAdmin: "https://wa.me/5493516643875?text=Hola%20Nivel%209,%20contacto%20con%20Administraci%C3%B3n%20de%20Operaciones."
  },
  accesosDirectos: [
    {
      nombre: "Guardia Operativa",
      url: "https://wa.me/5493517046541?text=Hola%20Nivel%209,%20contacto%20con%20Guardia%20Operativa",
      destacado: true
    },
    {
      nombre: "Portal Publico",
      url: "https://nivel9logistica.github.io/portal-publico.html/",
      destacado: false
    },
    {
      nombre: "Autocotizador",
      url: "https://nivel9logistica.github.io/cotizador-nivel9/",
      destacado: false
    }
  ],
  servicios: {
    "mudanzas": {
      id: "mudanzas",
      nombreMenu: "Mudanzas",
      tag: "EQUIPAMIENTO PROFESIONAL & EMBALAJE",
      titulo: "Mudanzas Residenciales y Corporativas",
      descripcion: "Traslados integrales dentro de Córdoba y hacia todo el país. Operarios capacitados, equipamiento de estiba técnica y camiones acondicionados con rampa hidráulica.",
      caracteristicas: [
        "Unidades con rampa hidráulica para carga y descarga sin golpes.",
        "Embalaje técnico con film alveolar, mantas térmicas y esquineros.",
        "Personal uniformado propio con protocolos de cuidado patrimonial.",
        "Seguro de carga en tránsito y seguimiento permanente."
      ],
      imagenPrincipal: "./js/assets/img/mudanza-operarios.jpg",
      galeria: [
        { url: "./js/assets/img/mudanza-operarios.jpg", titulo: "" },
        { url: "./js/assets/img/sprinter-iveco-flota.jpg", titulo: "" }
      ],
      botonTexto: "Calcular Mudanza Online",
      botonAccion: "cotizador"
    },
    "corporativo": {
      id: "corporativo",
      nombreMenu: "Corporativo B2B",
      tag: "POLO 52 | SERVICIOS 3PL & 4PL",
      titulo: "Hub Logístico, Operaciones y B2B",
      descripcion: "Operamos con gran presencia estratégica en Polo 52, el centro logístico más importante del interior de Córdoba. Servicios directos de cross-docking, consolidación y distribución capilar.",
      caracteristicas: [
        "Fuerte presencia operativa en Polo 52 para consolidación y logística integral.",
        "Distribución capilar y abastecimiento comercial con carga paletizada.",
        "Soluciones 3PL (cross-docking, consolidación) y 4PL (gestión integral).",
        "Control documental estricto, remitos conformados y choferes LiNTI."
      ],
      imagenPrincipal: "./js/assets/img/polo52-flota.jpg",
      galeria: [
        { url: "./js/assets/img/polo52-flota.jpg", titulo: "" },
        { url: "./js/assets/img/b2b-mercedes-pallets.jpg", titulo: "" },
        { url: "./js/assets/img/b2b-mercedes-frente.jpg", titulo: "" }
      ],
      botonTexto: "Acceder a Portal Clientes",
      botonAccion: "portalPublico"
    },
    "larga-distancia": {
      id: "larga-distancia",
      nombreMenu: "Larga Distancia",
      tag: "CORREDORES FEDERALES & MERCOSUR",
      titulo: "Cargas Nacionales y Troncales de Ruta",
      descripcion: "Conectividad troncal permanente uniendo Córdoba con Buenos Aires, Rosario, Cuyo, NOA, Patagonia y pasos fronterizos.",
      caracteristicas: [
        "Flota pesada y mediana: Scania R320, Mercedes-Benz Sprinter e Iveco Daily.",
        "Monitoreo satelital y tiempos de arribo certificados.",
        "Despachos consolidados y cargas completas exclusivas.",
        "Respaldo y trazabilidad en cada kilómetro de ruta federal."
      ],
      imagenPrincipal: "./js/assets/img/scania-larga-distancia.jpg",
      galeria: [
        { url: "./js/assets/img/scania-larga-distancia.jpg", titulo: "" },
        { url: "./js/assets/img/cabina-ruta-mate.png", titulo: "" },
        { url: "./js/assets/img/industrial-semirremolque.jpg", titulo: "" }
      ],
      botonTexto: "Canal Cargas y Transportistas",
      botonAccion: "portalPublico"
    }
  }
};
