# POLDEV Estudio — Sitio Web Oficial & Portfolio

<p align="center">
  <img src="assets/logo/poldev-logo.svg" alt="POLDEV Logo" width="340">
</p>

<p align="center">
  <strong>Páginas web a medida que hacen crecer tu negocio</strong><br>
  <em>"Tu idea, nuestro código."</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Producci%C3%B3n-10b981?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-38bdf8?style=flat-square" alt="Stack">
  <img src="https://img.shields.io/badge/Performance-Score%2099-2563eb?style=flat-square" alt="Performance">
  <img src="https://img.shields.io/badge/Hosting-GitHub%20Pages%20%2F%20Vercel-black?style=flat-square" alt="Hosting">
</p>

---

## 🚀 Acerca de POLDEV

**POLDEV Estudio** es un estudio de desarrollo y presencia digital dedicado a impulsar comercios barriales, pymes y profesionales independientes a través de sitios web modernos, ultrarrápidos, 100% responsivos y con integración directa a WhatsApp y Google Maps.

Este repositorio contiene la web oficial de presentación del estudio, pensada para desplegarse fácilmente en **GitHub Pages**, **Vercel** o **Cloudflare Pages**.

---

## 🌟 Características Destacadas

- **Estética Neo-Precision Studio (Dark Mode):** Obsidian Canvas profundo, Electric Indigo, acentos Cyan y Emerald, micro-bordes milimétricos y texturas satinadas de nivel internacional (estilo Linear, Raycast, Framer Premier Studios).
- **Arquitectura de Navegación Anti-Superposición:** Header flotante con glassmorphism nativo (`backdrop-filter: blur(20px)`), altura controlada, `scroll-margin-top` en todas las secciones para evitar que los títulos queden ocultos, y drawer móvil táctil accesible con bloqueo de scroll.
- **Showcase Interactivo en el Hero:** Navegador simulado con pestañas en tiempo real para alternar y previsualizar en vivo los desarrollos destacados (Motos GMW, Vivero Vía Verde, Danza Sánchez, Almacén PH, Maderar).
- **Portfolio con Filtro por Categorías:** Clasificación dinámica de casos de estudio por rubro con ventanas modales detalladas con desafíos, soluciones y métricas de conversión.
- **Calculadora de Presupuesto Express:** Herramienta interactiva que calcula presupuestos en tiempo real y genera un mensaje prearmado personalizado para consultar vía WhatsApp en un clic.
- **Microinteracciones Modernas:** Cursor spotlight glow, acordeón FAQ fluido y accesible, botones con copia de portapapeles y toast notifications instantáneas.
- **Zero Dependencies:** Construido en HTML5 semántico, CSS3 moderno con variables nativas y JavaScript Vanilla modular. Máxima velocidad de carga (&lt; 1.2s).

---

## 📂 Estructura del Proyecto

```text
Poldev_web/
├── index.html              # Estructura principal semántica y SEO
├── css/
│   └── styles.css          # Estilos globales, variables CSS, layout y dark-theme
├── js/
│   └── main.js             # Lógica interactiva (cotizador, filtros, tabs, modales)
├── assets/
│   ├── logo/
│   │   ├── poldev-logo.svg # Isologo oficial vectorial
│   │   ├── poldev-icon.svg # Isotipo P
│   │   └── favicon.svg     # Favicon circular para navegadores
│   └── projects/           # Imágenes y capturas de trabajos reales
│       ├── gmw-fachada.jpg
│       ├── gmw-hero.jpg
│       ├── gmw-logo.png
│       ├── vivero-hero.jpg
│       ├── vivero-logo.png
│       ├── danza-hero.jpg
│       ├── danza-logo.png
│       ├── almacen-fachada.jpg
│       ├── almacen-local.jpg
│       ├── almacen-logo.png
│       ├── maderar-hero.jpg
│       └── maderar-logo.png
├── .gitignore
└── README.md
```

---

## 🛠️ Cómo Subir este Proyecto a GitHub y Publicar en GitHub Pages

Para crear tu repositorio y tener tu web online gratis en GitHub Pages:

### 1. Iniciar el repositorio local
Abre una terminal en la carpeta `Poldev_web`:
```bash
git init
git add .
git commit -m "feat: lanzamiento web oficial de Poldev Estudio"
```

### 2. Vincular con GitHub
1. Crea un repositorio nuevo en tu cuenta de GitHub (ejemplo: `poldev-web` o `poldev.github.io`).
2. Ejecuta los comandos:
```bash
git branch -M main
git remote add origin https://github.com/TU-USUARIO/poldev-web.git
git push -u origin main
```

### 3. Activar GitHub Pages
1. En tu repositorio de GitHub, ve a **Settings** > **Pages**.
2. En **Build and deployment** > **Source**, selecciona `Deploy from a branch`.
3. Elige la rama `main` y la carpeta `/ (root)`.
4. Haz clic en **Save**. ¡En pocos segundos tu sitio estará activo en `https://TU-USUARIO.github.io/poldev-web/`!

---

## 💬 Contacto & Soporte

- **WhatsApp:** [+54 9 11 1234 5678](https://wa.me/5491112345678)
- **Email:** [hola@poldev.com.ar](mailto:hola@poldev.com.ar)
- **Ubicación:** Belén de Escobar, Buenos Aires, Argentina
