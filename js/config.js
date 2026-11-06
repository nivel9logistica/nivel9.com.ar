// js/config.js - Configuración Nivel 9 (Rutas vinculadas a js/assets/img/)
const NIVEL9_CONFIG = {
  empresa: {
    nombre: "NIVEL 9",
    lema1: "Logística de Excelencia",
    lema2: "Evolución Constante",
    baseOperativa: "Base Operativa: Polo 52, Córdoba"
  },
  links: {
    cotizador: "https://nivel9logistica.github.io/cotizador-nivel9/",
    portalPublico: "https://nivel9logistica.github.io/portal-publico.html/",
    wspOperaciones: "https://wa.me/5493517046541?text=Hola%20Nivel%209,%20quiero%20cotizar%20un%20servicio.",
    wspAdmin: "https://wa.me/5493516643875?text=Hola%20Nivel%209,%20contacto%20con%20Administraci%C3%B3n%20de%20Operaciones."
  },
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
        { url: "./js/assets/img/mudanza-operarios.jpg", titulo: "Operarios Nivel 9 con rampa y sillón" },
        { url: "./js/assets/img/sprinter-iveco-flota.jpg", titulo: "Flota mediana acondicionada" }
      ],
      botonTexto: "Calcular Mudanza Online",
      botonAccion: "cotizador"
    },
    "corporativo": {
      id: "corporativo",
      nombreMenu: "Corporativo B2B",
      tag: "POLO 52 | SERVICIOS 3PL & 4PL",
      titulo: "Hub Logístico, Almacenaje y B2B",
      descripcion: "Operamos desde nuestra nave en Polo 52, el centro logístico más importante del interior de Córdoba. Servicios directos de cross-docking, guarda y distribución capilar.",
      caracteristicas: [
        "Nave logística en Polo 52 para almacenaje y consolidación.",
        "Distribución capilar y abastecimiento comercial con carga paletizada.",
        "Soluciones 3PL (picking, guarda) y 4PL (gestión integral).",
        "Control documental estricto, remitos conformados y chóferes LiNTI."
      ],
      imagenPrincipal: "./js/assets/img/polo52-flota.jpg",
      galeria: [
        { url: "./js/assets/img/polo52-flota.jpg", titulo: "Flota frente a nave Polo 52" },
        { url: "./js/assets/img/b2b-mercedes-pallets.jpg", titulo: "Mercedes 712C con carga de pallets filmados" },
        { url: "./js/assets/img/b2b-mercedes-frente.jpg", titulo: "Frente Mercedes 712C habilitado" }
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
        { url: "./js/assets/img/scania-larga-distancia.jpg", titulo: "Scania R320 térmico de gran volumen" },
        { url: "./js/assets/img/cabina-ruta-mate.png", titulo: "Toma de cabina en ruta al amanecer" },
        { url: "./js/assets/img/industrial-semirremolque.jpg", titulo: "Semirremolque en parque logístico" }
      ],
      botonTexto: "Canal Cargas y Transportistas",
      botonAccion: "portalPublico"
    }
  }
};
