// js/config.js - Configuración Nivel 9 con imágenes retocadas
const NIVEL9_CONFIG = {
  empresa: {
    nombre: "Nivel 9",
    razonSocial: "Nivel 9 S.A.S.",
    cuit: "30-71926083-3",
    basePolo: "Parque Industrial y Logístico Polo 52, Córdoba",
    direccion: "Lino Spilimbergo 7100, Los Boulevares, Córdoba"
  },
  links: {
    cotizador: "https://nivel9logistica.github.io/cotizador-nivel9/",
    portalPublico: "https://nivel9logistica.github.io/portal-publico.html/",
    whatsapp: "https://wa.me/5493517046541?text=Hola%20Nivel%209,%20estoy%20en%20la%20web%20y%20quiero%20cotizar%20un%20servicio.",
    portalCargas: "https://nivel9logistica.github.io/portal-publico.html#transportistas"
  },
  servicios: {
    "mudanzas": {
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
        "./assets/img/mudanza-entrega.jpg",
        "./assets/img/mudanza-operarios.jpg",
        "./assets/img/mudanza-furgon.jpg"
      ],
      botonTexto: "Calcular Mudanza Online",
      botonAccion: "cotizador"
    },
    "corporativo": {
      tag: "POLO 52 | SERVICIOS 3PL & 4PL",
      titulo: "Hub Logístico, Almacenaje y B2B",
      descripcion: "Operamos desde nuestra nave en Polo 52, el centro logístico e industrial más importante del interior. Soluciones directas de cross-docking, guarda y distribución capilar.",
      caracteristicas: [
        "Nave logística en Polo 52 acondicionada para almacenaje y consolidación.",
        "Distribución capilar y abastecimiento a depósitos con carga paletizada.",
        "Soluciones 3PL (picking, guarda) y 4PL (gestión integral de cadena).",
        "Control documental estricto, remitos conformados y chóferes LiNTI."
      ],
      imagenPrincipal: "./assets/img/polo52-flota.jpg",
      galeria: [
        "./assets/img/polo52-flota.jpg",
        "./assets/img/polo52-interior.jpg",
        "./assets/img/b2b-mercedes-pallets.jpg",
        "./assets/img/b2b-mercedes-frente.jpg"
      ],
      botonTexto: "Acceder a Portal Clientes",
      botonAccion: "portalPublico"
    },
    "larga-distancia": {
      tag: "CORREDORES FEDERALES & MERCOSUR",
      titulo: "Cargas Nacionales y Troncales de Ruta",
      descripcion: "Conectividad troncal permanente uniendo Córdoba con Buenos Aires, Rosario, Cuyo, NOA, Patagonia y pasos fronterizos.",
      caracteristicas: [
        "Flota pesada y mediana: Scania R320, Mercedes-Benz Sprinter e Iveco Daily.",
        "Monitoreo satelital y tiempos de arribo garantizados.",
        "Despachos consolidados y cargas completas exclusivas.",
        "Facturación oficial Nivel 9 S.A.S. con documentación comercial transparente."
      ],
      imagenPrincipal: "./assets/img/scania-larga-distancia.jpg",
      galeria: [
        "./assets/img/scania-larga-distancia.jpg",
        "./assets/img/mercedes-carrozado-blanco.jpg",
        "./assets/img/sprinter-iveco-flota.jpg",
        "./assets/img/sprinter-salinas.jpg",
        "./assets/img/cabina-ruta-mate.png"
      ],
      botonTexto: "Canal Cargas y Transportistas",
      botonAccion: "portalCargas"
    },
    "industrial": {
      tag: "CARGAS ESPECIALES & RIGGING",
      titulo: "Logística Industrial y Movimiento de Maquinaria",
      descripcion: "Operaciones complejas de elevación, izaje y traslado de maquinaria pesada, prensas fabriles y estructuras industriales.",
      caracteristicas: [
        "Montaje y desmontaje de equipos con hidrogúas especializadas.",
        "Traslado de líneas de producción y piezas de gran tonelaje.",
        "Personal técnico con indumentaria y protocolos de seguridad fabril.",
        "Seguro específico para izaje y transporte de cargas pesadas."
      ],
      imagenPrincipal: "./assets/img/industrial-semirremolque.jpg",
      galeria: [
        "./assets/img/industrial-semirremolque.jpg",
        "./assets/img/industrial-grua.jpg"
      ],
      botonTexto: "Consultar Operativo Especial",
      botonAccion: "whatsapp"
    }
  }
};
