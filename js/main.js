/**
 * POLDEV ESTUDIO — Neo-Precision Core Interactive Engine
 * Performance: Zero external runtime dependencies, 60fps animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initHeaderNavigation();
  initMobileDrawer();
  initHeroShowcase();
  initPortfolioFilters();
  initCaseStudyModal();
  initBudgetCalculator();
  initFaqAccordion();
  initContactInquiryForm();
  initClipboardButtons();
});

/* --------------------------------------------------------------------------
   1. CURSOR SPOTLIGHT
   -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight || window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function render() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    spotlight.style.left = `${curX}px`;
    spotlight.style.top = `${curY}px`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/* --------------------------------------------------------------------------
   2. HEADER SCROLL & SCROLLSPY (ANTI-OVERLAP NAVIGATION)
   -------------------------------------------------------------------------- */
function initHeaderNavigation() {
  const header = document.getElementById('siteHeader');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy activo
    let currentId = '';
    const scrollMarker = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollMarker >= top && scrollMarker < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      desktopLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   4. DATA DE CASOS DE ESTUDIO (PROYECTOS REALES)
   -------------------------------------------------------------------------- */
const projectsDatabase = {
  gmw: {
    title: "Motos GMW",
    category: "Taller & Repuestos",
    tag: "Taller Mecánico & Repuestos",
    url: "gmwmotos.com.ar",
    img: "assets/projects/gmw-hero.jpg",
    metric: "+140% consultas por WhatsApp",
    summary: "Presencia digital para taller oficial y venta de repuestos multimarca (Yamaha, Honda, Motomel, Corven) con solicitud de turnos online.",
    challenge: "El taller recibía llamadas dispersas y pedidos sin datos de marca/modelo por mensajes informales, lo que generaba demoras y pérdida de turnos de service.",
    solution: "POLDEV diseñó un sitio ultra-rápido en modo oscuro de alto impacto, con botón de turnos con mensaje pre-redactado a WhatsApp y catálogo visual de marcas y servicios.",
    metrics: [
      { figure: "+140%", label: "Consultas por WhatsApp" },
      { figure: "1.0s", label: "Velocidad de carga móvil" },
      { figure: "Top 3", label: "Posicionamiento en zona" }
    ]
  },
  vivero: {
    title: "Vivero Vía Verde",
    category: "Jardinería & Plantas",
    tag: "Plantas de Interior & Jardinería",
    url: "viveroviaverde.com.ar",
    img: "assets/projects/vivero-hero.jpg",
    metric: "50+ especies exhibidas",
    summary: "Catálogo botánico visual de plantas de interior, exterior, macetas artesanales e insumos para el cuidado botánico.",
    challenge: "Los clientes preguntaban constantemente por stock, cuidados de luz y riego, y precios a través de historias efímeras en Instagram que requerían atención manual constante.",
    solution: "Implementamos una galería visual optimizada con WebP y fichas sintéticas de cuidados botánicos, permitiendo a los clientes pedir cotizaciones y asesoría en 1 clic.",
    metrics: [
      { figure: "50+", label: "Especies catalogadas" },
      { figure: "3.2x", label: "Permanencia en la web" },
      { figure: "100%", label: "Diseño Mobile-First" }
    ]
  },
  danza: {
    title: "Escuela Danza Julieta Sánchez",
    category: "Educación & Arte",
    tag: "Academia de Danza & Acrobacia",
    url: "danzajulieta.com.ar",
    img: "assets/projects/danza-hero.jpg",
    metric: "80+ inscripciones gestionadas",
    summary: "Sitio web institucional con estética editorial para clases de ballet clásico, acrobacia aérea en tela y gimnasia artística en Escobar.",
    challenge: "El proceso de inscripción requería enviar planillas físicas y PDFs pesados por correo que los padres no llegaban a leer en sus celulares.",
    solution: "Creamos una plataforma estilizada con tipografía editorial, grilla de horarios interactiva y reserva directa de cupo para clases de prueba por WhatsApp.",
    metrics: [
      { figure: "80+", label: "Alumnas inscriptas" },
      { figure: "-70%", label: "Tiempo de atención administrativa" },
      { figure: "0.9s", label: "Carga en 4G" }
    ]
  },
  almacen: {
    title: "Almacén PH",
    category: "Comercio Minorista",
    tag: "Comercio Minorista de Barrio",
    url: "almacenph.com.ar",
    img: "assets/projects/almacen-fachada.jpg",
    metric: "Geolocalización barrial",
    summary: "Página web barrial para almacén de comestibles, fiambrería y bebidas, destacando la cercanía, promociones semanales y ubicación precisa.",
    challenge: "El almacén abría en una zona de nuevos loteos residenciales y los vecinos recién mudados no sabían de su existencia en Google Maps ni cómo hacer pedidos al paso.",
    solution: "Desarrollo de una One-Page ágil con fotos reales de la fachada, geolocalización directa con Google Maps e integración de promociones del día para pedidos por WhatsApp.",
    metrics: [
      { figure: "+300", label: "Vecinos guiados por Maps" },
      { figure: "4.9 ★", label: "Calificación Google Search" },
      { figure: "<0.8s", label: "Carga ultra veloz" }
    ]
  },
  maderar: {
    title: "Maderar Maderas",
    category: "Industria & Construcción",
    tag: "Industria, Maderas & Techos",
    url: "maderar.com.ar",
    img: "assets/projects/maderar-hero.jpg",
    metric: "Cotizaciones en <10min",
    summary: "Catálogo técnico de tirantes, vigas laminadas, machimbres y aislaciones térmicas para constructores y carpinteros.",
    challenge: "Los profesionales de la construcción necesitaban calcular medidas y precios de tirantes y maderas de forma ágil desde las obras sin esperar presupuestos lentos.",
    solution: "Construimos un catálogo de alta precisión con tablas de especificaciones técnicas y un cotizador express directo al WhatsApp mayorista.",
    metrics: [
      { figure: "<10min", label: "Respuesta de presupuesto" },
      { figure: "+65%", label: "Presupuestos cerrados" },
      { figure: "CDN", label: "Alojamiento global cloud" }
    ]
  }
};

/* --------------------------------------------------------------------------
   5. HERO SHOWCASE SWITCHER
   -------------------------------------------------------------------------- */
function initHeroShowcase() {
  const tabs = document.querySelectorAll('.showcase-tab-trigger');
  const imgEl = document.getElementById('showcaseImg');
  const urlEl = document.getElementById('showcaseUrl');
  const tagEl = document.getElementById('showcaseTag');
  const titleEl = document.getElementById('showcaseTitle');
  const descEl = document.getElementById('showcaseDesc');
  const metricEl = document.getElementById('showcaseMetric');
  const inspectBtn = document.getElementById('showcaseInspectBtn');

  if (!tabs.length || !imgEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const projectKey = tab.dataset.project;
      const data = projectsDatabase[projectKey];
      if (!data) return;

      // Animación suave de cambio
      imgEl.style.opacity = '0.3';
      imgEl.style.transform = 'scale(0.98)';

      setTimeout(() => {
        imgEl.src = data.img;
        urlEl.textContent = data.url;
        tagEl.textContent = data.tag;
        titleEl.textContent = data.title;
        descEl.textContent = data.summary;
        metricEl.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
          ${data.metric}
        `;
        if (inspectBtn) inspectBtn.dataset.target = projectKey;

        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 160);
    });
  });

  if (inspectBtn) {
    inspectBtn.addEventListener('click', () => {
      const key = inspectBtn.dataset.target || 'gmw';
      openCaseModal(key);
    });
  }
}

/* --------------------------------------------------------------------------
   6. FILTRO DE PORTFOLIO
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const cards = document.querySelectorAll('.project-case-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. MODAL DE CASO DE ESTUDIO
   -------------------------------------------------------------------------- */
function initCaseStudyModal() {
  const modalOverlay = document.getElementById('caseModalOverlay');
  const dismissBtn = document.getElementById('modalDismissBtn');
  const openButtons = document.querySelectorAll('.btn-open-modal');
  const ctaBtn = document.getElementById('modalCtaBtn');

  if (!modalOverlay) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.project;
      openCaseModal(key);
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', closeModal);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function openCaseModal(projectKey) {
  const modalOverlay = document.getElementById('caseModalOverlay');
  const data = projectsDatabase[projectKey];
  if (!modalOverlay || !data) return;

  document.getElementById('modalCaseCategory').textContent = data.category;
  document.getElementById('modalCaseTitle').textContent = data.title;
  document.getElementById('modalCaseImg').src = data.img;
  document.getElementById('modalCaseSummary').textContent = data.summary;
  document.getElementById('modalCaseChallenge').textContent = data.challenge;
  document.getElementById('modalCaseSolution').textContent = data.solution;

  const metricsStrip = document.getElementById('modalMetricsStrip');
  metricsStrip.innerHTML = '';

  data.metrics.forEach(m => {
    const chip = document.createElement('div');
    chip.className = 'modal-metric-chip';
    chip.innerHTML = `
      <strong>${m.figure}</strong>
      <span>${m.label}</span>
    `;
    metricsStrip.appendChild(chip);
  });

  modalOverlay.classList.add('active');
  document.body.classList.add('menu-open');
}

/* --------------------------------------------------------------------------
   8. CALCULADORA DE PRESUPUESTO EXPRESS
   -------------------------------------------------------------------------- */
function initBudgetCalculator() {
  const planButtons = document.querySelectorAll('.plan-radio-card');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox-input');
  const addonLabels = document.querySelectorAll('.addon-checkbox-label');

  const summaryPlanName = document.getElementById('summaryPlanName');
  const summaryTotalAmount = document.getElementById('summaryTotalAmount');
  const summaryTimeEstimate = document.getElementById('summaryTimeEstimate');
  const whatsappQuoteBtn = document.getElementById('btnSendQuoteWhatsapp');

  if (!planButtons.length || !summaryTotalAmount) return;

  const plans = {
    institucional: { name: "Web Institucional & Comercio", price: 180000, time: "5 a 7 días hábiles" },
    landing: { name: "Landing Page Ágil", price: 130000, time: "3 a 5 días hábiles" },
    ecommerce: { name: "Catálogo / Tienda", price: 240000, time: "10 a 14 días hábiles" }
  };

  const addons = {
    maps_seo: { name: "Google Maps & Alta en Buscador", price: 35000 },
    whatsapp_pro: { name: "Botón Flotante con Mensajes Pre-redactados", price: 20000 },
    cloud_hosting: { name: "Hosting Cloud Rápido + SSL (1er Mes)", price: 25000 }
  };

  let selectedPlanKey = 'institucional';

  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      planButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedPlanKey = btn.dataset.plan;
      updateCalculator();
    });
  });

  addonLabels.forEach(label => {
    const input = label.querySelector('.addon-checkbox-input');
    if (!input) return;

    label.addEventListener('click', (e) => {
      // Evitar doble evento si se clica el input directamente
      if (e.target !== input) {
        input.checked = !input.checked;
      }
      if (input.checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
      updateCalculator();
    });
  });

  function updateCalculator() {
    const currentPlan = plans[selectedPlanKey];
    let total = currentPlan.price;
    const activeAddonNames = [];

    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const item = addons[cb.value];
        if (item) {
          total += item.price;
          activeAddonNames.push(item.name);
        }
      }
    });

    // Formatear precio ARS
    const formattedPrice = `$${total.toLocaleString('es-AR')} ARS`;

    summaryPlanName.textContent = currentPlan.name;
    summaryTotalAmount.textContent = formattedPrice;
    summaryTimeEstimate.textContent = currentPlan.time;

    // Generar link WhatsApp dinámico
    const addonsText = activeAddonNames.length > 0 
      ? ` con ${activeAddonNames.join(', ')}` 
      : '';
    
    const message = `Hola Polo! Estuve cotizando en la web de POLDEV y me interesa el formato: ${currentPlan.name}${addonsText}. Presupuesto estimado: ${formattedPrice}. ¿Podemos coordinar una llamada o charlar detalles?`;

    const encodedMsg = encodeURIComponent(message);
    whatsappQuoteBtn.href = `https://wa.me/5491112345678?text=${encodedMsg}`;
  }

  // Inicializar cálculo en carga
  updateCalculator();
}

/* --------------------------------------------------------------------------
   9. PREGUNTAS FRECUENTES (FAQ ACCORDION)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger-btn');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.closest('.faq-panel-item');
      const drawer = panel.querySelector('.faq-content-drawer');
      const isOpen = panel.classList.contains('open');

      // Cerrar otros abiertos para mantener limpieza
      document.querySelectorAll('.faq-panel-item.open').forEach(openPanel => {
        if (openPanel !== panel) {
          openPanel.classList.remove('open');
          const d = openPanel.querySelector('.faq-content-drawer');
          if (d) d.style.maxHeight = '0';
          const t = openPanel.querySelector('.faq-trigger-btn');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        panel.classList.remove('open');
        drawer.style.maxHeight = '0';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        panel.classList.add('open');
        drawer.style.maxHeight = `${drawer.scrollHeight}px`;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. FORMULARIO DE CONSULTA DIRECTO A WHATSAPP
   -------------------------------------------------------------------------- */
function initContactInquiryForm() {
  const form = document.getElementById('contactInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formClientName').value.trim();
    const business = document.getElementById('formClientBusiness').value.trim();
    const message = document.getElementById('formClientMessage').value.trim();

    if (!name || !message) return;

    let text = `Hola Polo! Mi nombre es ${name}`;
    if (business) text += ` (del negocio/rubro: ${business})`;
    text += `. Mi consulta para la web es: "${message}".`;

    const waUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   11. BOTONES DE COPIAR Y TOAST
   -------------------------------------------------------------------------- */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-mini-btn');
  const toast = document.getElementById('toastAlert');
  const toastMsg = document.getElementById('toastMessage');

  if (!copyButtons.length || !toast) return;

  let toastTimeout;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        toastMsg.textContent = `Copiado: "${textToCopy}"`;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
        }, 2600);
      } catch (err) {
        console.error('Error al copiar al portapapeles:', err);
      }
    });
  });
}
