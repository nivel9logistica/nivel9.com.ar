// js/config.js - Configuración central de Nivel 9
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
  // Conexión Supabase (opcional: si tenés proyecto activo, pegás tu URL y ANON KEY acá)
  supabase: {
    url: "", 
    anonKey: ""
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
      imagenPrincipal: "./assets/img/mudanza-entrega.jpg",
      galeria: [
        { url: "./assets/img/mudanza-entrega.jpg", titulo: "Entrega residencial con flota Nivel 9" },
        { url: "./assets/img/mudanza-operarios.jpg", titulo: "Operarios con rampa hidráulica y sillón" },
        { url: "./assets/img/mudanza-furgon.jpg", titulo: "Furgón acondicionado con mantas y estiba técnica" }
      ],
      botonTexto: "Calcular Mudanza Online",
      botonAccion: "cotizador"
    },
    "corporativo": {
      id: "corporativo",
      nombreMenu: "Corporativo B2B",
      tag: "POLO 52 | SERVICIOS 3PL & 4PL",
      titulo: "Hub Logístico, Almacenaje y B2B",
      descripcion: "Operamos desde nuestra nave en Polo 52, el centro logístico más importante del interior de Córdoba. Servicios de cross-docking, guarda y distribución capilar.",
      caracteristicas: [
        "Nave logística en Polo 52 para almacenaje y consolidación.",
        "Distribución capilar y abastecimiento comercial paletizado.",
        "Soluciones 3PL (picking, guarda) y 4PL (gestión integral).",
        "Control documental riguroso, remitos conformados y chóferes LiNTI."
      ],
      imagenPrincipal: "./assets/img/polo52-flota.jpg",
      galeria: [
        { url: "./assets/img/polo52-flota.jpg", titulo: "Flota mediana frente a nave Polo 52" },
        { url: "./assets/img/polo52-interior.jpg", titulo: "Interior de nave Polo 52 con oficinas y entrepiso" },
        { url: "./assets/img/b2b-mercedes-pallets.jpg", titulo: "Mercedes 712C con carga de pallets filmados" },
        { url: "./assets/img/b2b-mercedes-frente.jpg", titulo: "Frente de unidad 712C habilitada" }
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
        "Flota combinada: Scania R320, Mercedes-Benz Sprinter e Iveco Daily.",
        "Monitoreo satelital y tiempos de arribo certificados.",
        "Despachos consolidados y cargas completas exclusivas.",
        "Respaldo y trazabilidad en cada kilómetro de ruta federal."
      ],
      imagenPrincipal: "./assets/img/scania-larga-distancia.jpg",
      galeria: [
        { url: "./assets/img/scania-larga-distancia.jpg", titulo: "Scania R320 con furgón térmico de gran volumen" },
        { url: "./assets/img/sprinter-iveco-flota.jpg", titulo: "Sprinter carrozada e Iveco Daily en predio operativo" },
        { url: "./assets/img/mercedes-carrozado-blanco.jpg", titulo: "Camión paquetero para media y larga distancia" },
        { url: "./assets/img/cabina-ruta-mate.png", titulo: "Toma de cabina en ruta al amanecer" }
      ],
      botonTexto: "Canal Cargas y Transportistas",
      botonAccion: "portalPublico"
    }
  }
};
