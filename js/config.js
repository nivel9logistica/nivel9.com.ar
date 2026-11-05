// js/config.js - Configuración central de datos y enlaces de Nivel 9
const NIVEL9_CONFIG = {
  empresa: {
    nombre: "Nivel 9",
    razonSocial: "Nivel 9 S.A.S.",
    cuit: "30-71926083-3",
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
      tag: "CUIDADO INTEGRAL & EMBALAJE",
      titulo: "Mudanzas Particulares y Ejecutivas",
      descripcion: "Traslados residenciales planificados con máxima protección. Cuidado exhaustivo de mobiliario, vajilla, tecnología y equipamiento.",
      caracteristicas: [
        "Unidades tipo furgón cerradas y acondicionadas.",
        "Embalaje y estiba con personal calificado.",
        "Monitoreo constante en ruta y seguro de carga.",
        "Servicio puerta a puerta en Córdoba y todo el territorio nacional."
      ],
      imagen: "assets/img/mudanza.jpg",
      botonTexto: "Calcular Mudanza Online",
      botonAccion: "cotizador"
    },
    "corporativo": {
      tag: "LOGÍSTICA B2B & DISTRIBUCIÓN",
      titulo: "Transporte Empresarial y Abastecimiento",
      descripcion: "Soluciones de distribución comercial para industrias y distribuidoras. Fletes programados con control documental riguroso.",
      caracteristicas: [
        "Capacidad de carga volumétrica y pesada para pallets.",
        "Gestión y rendición de remitos conformados.",
        "Chóferes profesionales habilitados con LiNTI.",
        "Facturación comercial Nivel 9 S.A.S. transparente."
      ],
      imagen: "assets/img/corporativo.jpg",
      botonTexto: "Acceder a Portal Clientes",
      botonAccion: "portalPublico"
    },
    "larga-distancia": {
      tag: "CONECTIVIDAD FEDERAL & MERCOSUR",
      titulo: "Cargas Generales y Troncales de Ruta",
      descripcion: "Corredores logísticos uniendo Córdoba con Buenos Aires, Cuyo, Patagonia, Norte y pasos internacionales.",
      caracteristicas: [
        "Salidas frecuentes y consolidación de cargas.",
        "Trazabilidad de kilometraje y tiempo estimado de llegada.",
        "Seguros de transporte de mercadería en tránsito.",
        "Vía directa con nuestra base de operaciones en Córdoba."
      ],
      imagen: "assets/img/larga-distancia.jpg",
      botonTexto: "Canal Cargas y Transportistas",
      botonAccion: "portalCargas"
    }
  }
};
