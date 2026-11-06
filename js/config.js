// js/config.js - Configuración integral de Nivel 9
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
      tag: "EQUIPO CALIFICADO & CUIDADO TOTAL",
      titulo: "Mudanzas Residenciales y Corporativas",
      descripcion: "Traslados integrales dentro de Córdoba y hacia cualquier punto del país. Operarios uniformados, material de embalaje técnico y camiones acondicionados con rampa hidráulica.",
      caracteristicas: [
        "Unidades con rampa hidráulica para carga y descarga sin golpes.",
        "Embalaje técnico: film alveolar, mantas térmicas y cartón corrugado.",
        "Personal capacitado propio con vestimenta y protocolos Nivel 9.",
        "Seguro de carga en tránsito y seguimiento durante todo el trayecto."
      ],
      imagen: "assets/img/mudanza-principal.jpg",
      botonTexto: "Calcular Mudanza Online",
      botonAccion: "cotizador"
    },
    "corporativo": {
      tag: "POLO 52 | SERVICIOS 3PL & 4PL",
      titulo: "Distribución B2B y Almacenaje Estratégico",
      descripcion: "Operamos desde nuestra nave en Polo 52, el parque logístico e industrial más importante del interior. Soluciones directas de acopio, cross-docking y abastecimiento comercial.",
      caracteristicas: [
        "Nave logística propia en Polo 52 para almacenaje y consolidación.",
        "Distribución capilar y abastecimiento a depósitos con carga paletizada.",
        "Soluciones 3PL (picking, guarda) y 4PL (gestión integral de cadena).",
        "Control documental estricto, remitos conformados y choferes LiNTI."
      ],
      imagen: "assets/img/b2b-distribucion-pallets.jpg",
      botonTexto: "Acceder a Portal Clientes",
      botonAccion: "portalPublico"
    },
    "larga-distancia": {
      tag: "CORREDORES FEDERALES & MERCOSUR",
      titulo: "Cargas Generales, Pesadas y Larga Distancia",
      descripcion: "Conectividad troncal permanente desde Córdoba hacia Buenos Aires, Cuyo, NOA, Patagonia y pasos fronterizos. Movimiento de cargas generales y proyectos industriales.",
      caracteristicas: [
        "Flota integral: Mercedes-Benz Sprinter, Iveco Daily y unidades pesadas.",
        "Capacidad operativa para cargas industriales, sobredimensionadas y grúas.",
        "Trazabilidad de viaje y monitoreo satelital permanente.",
        "Facturación oficial Nivel 9 S.A.S. con respaldo corporativo."
      ],
      imagen: "assets/img/larga-distancia-scania.jpg",
      botonTexto: "Canal Cargas y Transportistas",
      botonAccion: "portalCargas"
    }
  }
};
