/**
 * POLDEV ESTUDIO - Interactive Core Logic
 * High performance, zero runtime dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initHeaderScroll();
  initHeroShowcase();
  initPortfolioFilter();
  initProjectModal();
  initBudgetCalculator();
  initFaqAccordion();
  initMobileMenu();
  initContactActions();
});

/* --------------------------------------------------------------------------
   1. MOUSE FOLLOW GLOW (Linear / Vercel style)
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* --------------------------------------------------------------------------
   2. HEADER SCROLL & SCROLLSPY
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-menu-drawer .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. HERO SHOWCASE DEVICE TAB SWITCHER
   -------------------------------------------------------------------------- */
const heroProjectsData = {
  gmw: {
    title: "Motos GMW",
    badge: "Taller & Repuestos",
    desc: "Presencia digital para taller mecánico y venta de repuestos multimarcas con agenda de turnos online.",
    img: "assets/projects/gmw-hero.jpg",
    url: "gmwmotos.com.ar",
    metric: "+140% consultas por WhatsApp",
    stack: "HTML5 • CSS3 • WhatsApp API"
  },
  vivero: {
    title: "Vivero Vía Verde",
    badge: "Jardinería & Plantas",
    desc: "Catálogo botánico visual de plantas de interior/exterior e insumos de cultivo con atención directa.",
    img: "assets/projects/vivero-hero.jpg",
    url: "viveroviaverde.com.ar",
    metric: "Catálogo 50+ especies",
    stack: "Mobile-First • WebP • SEO"
  },
  danza: {
    title: "Escuela Danza Julieta Sánchez",
    badge: "Academia & Arte",
    desc: "Sitio web oficial con grilla de horarios de disciplinas, acrobacia en tela e inscripción digital en un clic.",
    img: "assets/projects/danza-hero.jpg",
    url: "danzajulieta.com.ar",
    metric: "80+ nuevas inscripciones",
    stack: "Diseño Editorial • Formulario"
  },
  almacen: {
    title: "Almacén PH",
    badge: "Comercio de Barrio",
    desc: "Digitalización de almacén barrial con ofertas del día, historia comunitaria y pedidos al paso.",
    img: "assets/projects/almacen-fachada.jpg",
    url: "almacenph.com.ar",
    metric: "Google Maps verificado",
    stack: "Geolocalización • Catálogo"
  },
  maderar: {
    title: "Maderar Maderas",
    badge: "Industria & Techos",
    desc: "Catálogo de tirantes, vigas y aislantes térmicos con cotizaciones rápidas para carpinteros y constructores.",
    img: "assets/projects/maderar-hero.jpg",
    url: "maderar.com.ar",
    metric: "Cotizaciones en <10min",
    stack: "Calculador • Responsive"
  }
};

function initHeroShowcase() {
  const tabs = document.querySelectorAll('.device-tab-btn');
  const imgEl = document.getElementById('heroScreenImg');
  const badgeEl = document.getElementById('heroScreenBadge');
  const titleEl = document.getElementById('heroScreenTitle');
  const descEl = document.getElementById('heroScreenDesc');
  const urlEl = document.getElementById('heroScreenUrl');
  const metricEl = document.getElementById('heroScreenMetric');

  if (!tabs.length || !imgEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const projectKey = tab.dataset.project;
      const data = heroProjectsData[projectKey];
      if (!data) return;

      // Animate transition
      imgEl.style.opacity = '0';
      imgEl.style.transform = 'scale(1.03)';

      setTimeout(() => {
        imgEl.src = data.img;
        badgeEl.textContent = data.badge;
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        urlEl.textContent = data.url;
        metricEl.textContent = data.metric;

        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

/* --------------------------------------------------------------------------
   4. PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. CASE STUDY MODAL DETAILS
   -------------------------------------------------------------------------- */
const detailedProjects = {
  gmw: {
    title: "Motos GMW - Taller Especializado & Repuestos",
    tag: "Taller Mecánico & Repuestos Multimarca",
    img: "assets/projects/gmw-fachada.jpg",
    summary: "Motos GMW necesitaba profesionalizar su presencia online para dejar de depender únicamente del boca a boca y del teléfono de línea.",
    challenge: "El cliente perdía muchas consultas de personas que buscaban services o repuestos en Google y no encontraban una vía rápida para coordinar turnos ni saber con qué marcas trabajaban.",
    solution: "Desarrollamos una web ágil con catálogo de marcas líderes (Honda, Yamaha, Motomel, Zanella, Castrol), botón directo para solicitar turnos de mantenimiento por WhatsApp y geolocalización exacta del taller en Belén de Escobar.",
    metrics: [
      { label: "Consultas Directas", val: "+140%" },
      { label: "Tiempo de Carga", val: "0.9s" },
      { label: "Google Score", val: "99/100" }
    ]
  },
  vivero: {
    title: "Vivero Vía Verde - Catálogo Botánico Digital",
    tag: "Jardinería, Plantas & Insumos",
    img: "assets/projects/vivero-hero.jpg",
    summary: "Vivero Vía Verde cuenta con una enorme variedad botánica y necesitaba un escaparate virtual limpio y ordenado para mostrar sus especies y cuidados.",
    challenge: "Muchos clientes preguntaban repetidamente por WhatsApp qué plantas tenían disponibles para sombra o sol y cuáles eran sus cuidados básicos.",
    solution: "Creamos un catálogo visual categorizado por tipo de especie (interior, exterior, suculentas, insumos), con fichas técnicas simples y un botón para pedir el ejemplar directamente por chat.",
    metrics: [
      { label: "Especies mostradas", val: "+50" },
      { label: "Carga en Móvil", val: "1.1s" },
      { label: "Satisfacción Cliente", val: "100%" }
    ]
  },
  danza: {
    title: "Escuela de Danza Julieta Sánchez",
    tag: "Institución Educativa & Artística",
    img: "assets/projects/danza-hero.jpg",
    summary: "Academia de danza clásica, acrobacia en tela y gimnasia artística que precisaba un sitio web refinado que reflejara la pasión y el nivel de sus clases.",
    challenge: "Centralizar los horarios de todas las disciplinas, edades y niveles para evitar confusiones y agilizar el proceso de inscripción anual.",
    solution: "Diseñamos un sitio institucional con estética visual cuidada, cronograma de horarios interactivo y formulario ágil para reservar cupos de clases de prueba.",
    metrics: [
      { label: "Inscripciones Online", val: "+80" },
      { label: "Posicionamiento SEO", val: "Top 3 Zona" },
      { label: "Optimización", val: "100% Mobile" }
    ]
  },
  almacen: {
    title: "Almacén PH - Digitalización Barrial",
    tag: "Comercio Minorista de Cercanía",
    img: "assets/projects/almacen-fachada.jpg",
    summary: "Comercio histórico de barrio que decidió dar el paso hacia la era digital para fidelizar a los vecinos y atraer a nuevos residentes.",
    challenge: "Transmitir la calidez y la historia del comercio tradicional de barrio sin perder dinamismo para comunicar ofertas y horarios de atención.",
    solution: "Sitio One-Page moderno que combina la historia del local, fotos reales de la fachada y los mostradores, pizarra de promociones y botón de pedidos express.",
    metrics: [
      { label: "Perfil Google Maps", val: "Verificado" },
      { label: "Velocidad", val: "0.8s" },
      { label: "Retención Vecinos", val: "Alta" }
    ]
  },
  maderar: {
    title: "Maderar - Maderas, Techos & Construcción",
    tag: "Comercio Mayorista e Industria",
    img: "assets/projects/maderar-hero.jpg",
    summary: "Empresa proveedora de maderas, vigas, tirantes y aislaciones térmicas para carpinteros, arquitectos y constructores.",
    challenge: "Facilitar el pedido de presupuestos técnicos con medidas de tirantes y maderas para reducir llamadas telefónicas innecesarias.",
    solution: "Catálogo estructurado con especificaciones técnicas de maderas nobles, aislantes y un cotizador de materiales que deriva la consulta ya armada al equipo de ventas.",
    metrics: [
      { label: "Tiempo de Cotización", val: "<10 min" },
      { label: "Consultas B2B", val: "+65%" },
      { label: "Disponibilidad", val: "99.9%" }
    ]
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const viewDetailBtns = document.querySelectorAll('.btn-view-project');

  if (!modalOverlay || !modalCloseBtn) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.dataset.project;
      const data = detailedProjects[projectKey];
      if (!data) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalTag').textContent = data.tag;
      document.getElementById('modalImg').src = data.img;
      document.getElementById('modalSummary').textContent = data.summary;
      document.getElementById('modalChallenge').textContent = data.challenge;
      document.getElementById('modalSolution').textContent = data.solution;

      const metricsGrid = document.getElementById('modalMetricsGrid');
      metricsGrid.innerHTML = data.metrics.map(m => `
        <div class="modal-metric-box">
          <div class="modal-metric-val">${m.val}</div>
          <div class="modal-metric-label">${m.label}</div>
        </div>
      `).join('');

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE BUDGET CALCULATOR & WHATSAPP GENERATOR
   -------------------------------------------------------------------------- */
function initBudgetCalculator() {
  const choiceBtns = document.querySelectorAll('.calc-choice-btn');
  const checkInputs = document.querySelectorAll('.calc-check-input');
  const totalDisplay = document.getElementById('calcTotalEstimate');
  const timeDisplay = document.getElementById('calcTimeEstimate');
  const planNameDisplay = document.getElementById('calcPlanName');
  const sendWhatsAppBtn = document.getElementById('btnCalcWhatsApp');

  if (!choiceBtns.length || !totalDisplay) return;

  const basePlans = {
    institucional: { name: "Web Institucional & Comercial", basePrice: 180000, days: "5 a 7 días" },
    landing: { name: "Landing Page de Conversión", basePrice: 120000, days: "3 a 5 días" },
    ecommerce: { name: "Catálogo / Tienda con Carrito", basePrice: 280000, days: "10 a 14 días" }
  };

  const addOns = {
    maps_seo: { label: "Google Maps & SEO Local", price: 35000 },
    whatsapp_pro: { label: "WhatsApp Botón & Mensaje Pro", price: 20000 },
    hosting_maintenance: { label: "Hosting Rápido + SSL + Mantenimiento Mensual", price: 25000 }
  };

  let currentPlanKey = 'institucional';

  function updateCalculation() {
    const selectedPlan = basePlans[currentPlanKey];
    let total = selectedPlan.basePrice;
    let selectedAddonLabels = [];

    checkInputs.forEach(input => {
      if (input.checked && addOns[input.value]) {
        total += addOns[input.value].price;
        selectedAddonLabels.push(addOns[input.value].label);
      }
    });

    // Format currency (Argentine Peso style)
    totalDisplay.textContent = `$${total.toLocaleString('es-AR')} ARS`;
    timeDisplay.textContent = selectedPlan.days;
    planNameDisplay.textContent = selectedPlan.name;

    // Build personalized WhatsApp text
    let waText = `¡Hola Poldev Estudio! Estuve navegando en su web y me gustaría consultar por un presupuesto:%0A%0A`;
    waText += `📌 *Tipo de proyecto:* ${selectedPlan.name}%0A`;
    if (selectedAddonLabels.length > 0) {
      waText += `➕ *Adicionales:* ${selectedAddonLabels.join(', ')}%0A`;
    }
    waText += `💰 *Presupuesto estimado:* $${total.toLocaleString('es-AR')} ARS%0A`;
    waText += `⏱️ *Tiempo estimado:* ${selectedPlan.days}%0A%0A`;
    waText += `¿Podríamos coordinar una breve charla para contarles sobre mi negocio?`;

    // Poldev WhatsApp Phone Number (Argentina)
    const phoneNumber = "5491112345678";
    sendWhatsAppBtn.href = `https://wa.me/${phoneNumber}?text=${waText}`;
  }

  choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      choiceBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      currentPlanKey = btn.dataset.plan;
      updateCalculation();
    });
  });

  checkInputs.forEach(input => {
    input.addEventListener('change', updateCalculation);
  });

  // Initial calculation
  updateCalculation();
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.faq-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. MOBILE DRAWER MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  const overlay = document.getElementById('mobileMenuOverlay');
  const closeBtn = document.getElementById('mobileMenuClose');
  const links = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --------------------------------------------------------------------------
   9. CONTACT ACTIONS & CLIPBOARD NOTICES
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initContactActions() {
  // Copy buttons
  const copyBtns = document.querySelectorAll('.card-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copiado al portapapeles: ${textToCopy}`);
      }).catch(() => {
        showToast('No se pudo copiar automáticamente.');
      });
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const business = document.getElementById('formBusiness').value;
      const message = document.getElementById('formMessage').value;

      let waText = `¡Hola Poldev Estudio! Mi nombre es ${encodeURIComponent(name)}`;
      if (business) {
        waText += ` de ${encodeURIComponent(business)}`;
      }
      waText += `.%0A%0AConsulta:%0A${encodeURIComponent(message)}`;

      showToast('¡Redirigiendo a WhatsApp con tu consulta!');
      setTimeout(() => {
        window.open(`https://wa.me/5491112345678?text=${waText}`, '_blank');
      }, 800);
    });
  }
}
