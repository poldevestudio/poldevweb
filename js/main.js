/**
 * POLDEV ESTUDIO — JavaScript Limpio y Modular
 * 100% Mobile-First y de Alto Rendimiento
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initPortfolioTabs();
  initFaqAccordion();
  initCaseModal();
  initCopyButtons();
  initQuickContactForm();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. MENÚ MÓVIL (DRAWER)
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const overlay = document.getElementById('mobileOverlay');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('menu-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  links.forEach(l => {
    l.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   2. FILTROS DE PORTFOLIO
   -------------------------------------------------------------------------- */
function initPortfolioTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.card-project');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-ans');

    if (!q || !ans) return;

    q.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(i => {
        i.classList.remove('active');
        const a = i.querySelector('.faq-ans');
        if (a) a.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. MODAL DE CASO DE ESTUDIO (3 PROYECTOS SELECCIONADOS)
   -------------------------------------------------------------------------- */
const projectsData = {
  gmw: {
    title: "Motos GMW — Taller & Repuestos",
    category: "Taller & Repuestos",
    img: "assets/projects/gmw-hero.jpg",
    summary: "Digitalización integral de taller mecánico oficial y venta de repuestos multimarca (Yamaha, Honda, Motomel).",
    challenge: "El cliente perdía turnos porque los clientes llamaban en horarios ocupados sin especificar modelo ni falla de la moto.",
    solution: "Diseñamos un sitio web móvil de carga instantánea con botón de turnos con mensaje pre-redactado hacia WhatsApp y catálogo de repuestos destacados."
  },
  vivero: {
    title: "Vivero Vía Verde — Jardinería",
    category: "Jardinería & Plantas",
    img: "assets/projects/vivero-hero.jpg",
    summary: "Catálogo botánico visual de plantas de interior, exterior e insumos de jardinería con asesoría.",
    challenge: "Consultas repetitivas en Instagram sobre especies disponibles, luz requerida y precios.",
    solution: "Un catálogo fotográfico optimizado en WebP donde los clientes pueden explorar especies con fichas de cuidados y solicitar pedidos por WhatsApp en un toque."
  },
  almacen: {
    title: "Almacén PH — Comercio Barrial",
    category: "Comercio Minorista",
    img: "assets/projects/almacen-fachada.jpg",
    summary: "Digitalización de almacén barrial tradicional con promociones semanales y mapa de ubicación.",
    challenge: "Llegada de nuevos vecinos al barrio que no sabían de la existencia del almacén ni cómo llegar.",
    solution: "One-Page ágil con geolocalización directa en Google Maps, fotos reales de la fachada y ofertas del día para pedidos rápidos."
  }
};

function initCaseModal() {
  const overlay = document.getElementById('modalCaseOverlay');
  const closeBtn = document.getElementById('mCloseBtn');
  const ctaBtn = document.getElementById('mCta');
  const openBtns = document.querySelectorAll('.btn-modal');

  if (!overlay) return;

  function closeModal() {
    overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.project;
      const data = projectsData[key];
      if (!data) return;

      document.getElementById('mTitle').textContent = data.title;
      document.getElementById('mCategory').textContent = data.category;
      document.getElementById('mImg').src = data.img;
      document.getElementById('mSummary').textContent = data.summary;
      document.getElementById('mChallenge').textContent = data.challenge;
      document.getElementById('mSolution').textContent = data.solution;

      overlay.classList.add('open');
      document.body.classList.add('menu-open');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (ctaBtn) ctaBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. BOTONES DE COPIADO
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const buttons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toastNotice');

  if (!buttons.length || !toast) return;

  let timeoutId;

  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        toast.textContent = `Copiado: "${text}"`;
        toast.classList.add('show');

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      } catch (err) {
        console.error(err);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. FORMULARIO RÁPIDO DE CONTACTO
   -------------------------------------------------------------------------- */
function initQuickContactForm() {
  const form = document.getElementById('contactQuickForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cName').value.trim();
    const biz = document.getElementById('cBiz').value.trim();
    const msg = document.getElementById('cMsg').value.trim();

    if (!name || !msg) return;

    let text = `Hola Polo! Soy ${name}`;
    if (biz) text += ` de "${biz}"`;
    text += `. Quería consultarte para crear mi web: ${msg}`;

    const url = `https://wa.me/5491125739968?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

/* --------------------------------------------------------------------------
   7. SCROLLSPY ACTIVO
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const links = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollMarker = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollMarker >= top && scrollMarker < top + height) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) {
        l.classList.add('active');
      }
    });
  }, { passive: true });
}
