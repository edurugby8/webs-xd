"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

const projects = [
  { id: "01", key: "landing", label: "Landing", title: "Haz que te\nrecuerden.", accent: "#c7ff38", detail: "Una primera impresión que convierte visitas en oportunidades.", stat: "01.8s", statLabel: "carga", theme: "NÓMADA" },
  { id: "02", key: "catalog", label: "Catálogo", title: "Todo lo que\nofreces.", accent: "#ff795f", detail: "Productos claros, visuales y fáciles de descubrir desde cualquier dispositivo.", stat: "+42%", statLabel: "consulta", theme: "FORMA" },
  { id: "03", key: "store", label: "Tienda", title: "Tu negocio,\nabierto siempre.", accent: "#73e8ff", detail: "Una experiencia de compra rápida, cuidada y preparada para vender.", stat: "24/7", statLabel: "online", theme: "SAVIA" },
  { id: "04", key: "dashboard", label: "Panel / App", title: "Todo bajo\ncontrol.", accent: "#d7a7ff", detail: "Herramientas digitales útiles para gestionar, medir y hacer crecer tu proyecto.", stat: "100%", statLabel: "a medida", theme: "PULSO" },
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const showcaseRef = useRef<HTMLElement>(null);
  const project = projects[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % projects.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      showcaseRef.current?.scrollTo({ top: 0, left: 0 });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--rx", `${-y * 5}deg`);
    event.currentTarget.style.setProperty("--ry", `${x * 8}deg`);
    event.currentTarget.style.setProperty("--mx", `${x * 16}px`);
    event.currentTarget.style.setProperty("--my", `${y * 12}px`);
  }

  function resetTilt(event: MouseEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
    event.currentTarget.style.setProperty("--mx", "0px");
    event.currentTarget.style.setProperty("--my", "0px");
  }

  return (
    <section ref={showcaseRef} className={`showcase scene-${project.key}`} style={{ "--scene": project.accent } as CSSProperties} onScroll={(event) => event.currentTarget.scrollTo({ top: 0, left: 0 })} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="showcase-grid" aria-hidden="true" />
      <div className="showcase-glow" aria-hidden="true" />
      <div className="scene-scan" aria-hidden="true" />
      <p className="scene-word" key={`word-${project.key}`} aria-hidden="true">{project.label}</p>

      <div className="showcase-heading" aria-live="polite">
        <p><span>CodeCraft / Experiencias digitales</span><b>0{active + 1} — 04</b></p>
        <h1 key={project.key}>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="showcase-lead">{project.detail}</p>
        <a className="showcase-guide" href="/preparar-proyecto">
          Preparar mi proyecto
          <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </a>
      </div>

      <div className="showcase-stage" onMouseMove={handleMove} onMouseLeave={resetTilt}>
        <span className="stage-label stage-label-top">Proyecto digital / {project.label} / 2026</span>
        <span className="stage-label stage-label-side">Mueve el cursor para explorar</span>
        <div className="orbit-track orbit-one" aria-hidden="true"><i /><i /></div>
        <div className="orbit-track orbit-two" aria-hidden="true"><i /></div>
        <div className="browser-echo echo-back" aria-hidden="true"><span /><span /><span /><strong>{project.theme}</strong><i /></div>
        <div className="browser-echo echo-mid" aria-hidden="true"><span /><span /><span /><strong>{project.label}</strong><i /></div>
        <div className={`browser-project ${project.key}`} key={project.key} aria-label={`Ejemplo animado de ${project.label}`}>
          <div className="browser-bar"><i /><i /><i /><span>codecraft.es/{project.key}</span><b>↗</b></div>
          <div className="browser-content">
            {project.key === "landing" && <LandingMock />}
            {project.key === "catalog" && <CatalogMock />}
            {project.key === "store" && <StoreMock />}
            {project.key === "dashboard" && <DashboardMock />}
          </div>
        </div>
        <div className="device-phone" key={`phone-${project.key}`} aria-hidden="true">
          <div className="phone-speaker" />
          <small>{project.theme}</small>
          <strong>{project.label}</strong>
          <div className="phone-art"><i /><i /><i /></div>
          <p>Una experiencia<br />que cabe en tu mano.</p>
          <b>DESLIZA ↓</b>
        </div>
        <div className="device-ticket ticket-one" key={`ticket-${project.key}`} aria-hidden="true"><span>0{active + 1}</span><strong>{project.stat}</strong><small>{project.statLabel}</small></div>
        <div className="device-ticket ticket-two" aria-hidden="true"><span>CODECRAFT®</span><strong>DISEÑO<br />EN MOVIMIENTO</strong><small>OURENSE / 2026</small></div>
        <div className="project-shadow" aria-hidden="true" />
        <div className="floating-note note-a" aria-hidden="true"><span>INTERACCIÓN</span><b>FLUIDA</b></div>
        <div className="floating-note note-b" aria-hidden="true"><span>DISEÑO</span><b>RESPONSIVE</b></div>
        <div className="floating-note note-c" aria-hidden="true"><span>ESTADO</span><b>● ONLINE</b></div>
      </div>

      <div className="showcase-meta">
        <div><span>Tipo</span><strong>{project.label}</strong></div>
        <div><span>{project.statLabel}</span><strong>{project.stat}</strong></div>
        <a href="/servicios">Ver posibilidades <b>↗</b></a>
      </div>

      <a className="showcase-cta" href="/servicios"><span>Explorar proyectos</span><b>↗</b></a>

      <div className="scene-switcher" role="tablist" aria-label="Tipos de proyecto">
        {projects.map((item, index) => (
          <button key={item.key} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
            <span>{item.id}</span>{item.label}<i />
          </button>
        ))}
      </div>
    </section>
  );
}

function LandingMock() {
  return <div className="mock-landing"><nav><strong>BRAVA®</strong><span>TRABAJO</span><span>ESTUDIO</span><b>HABLEMOS ↗</b></nav><div className="landing-index">01 / 04</div><small>ESTUDIO CREATIVO INDEPENDIENTE</small><h2>Marcas<br />con <em>pulso.</em></h2><p>Dirección creativa y experiencias digitales<br />para proyectos que no quieren pasar desapercibidos.</p><button>VER PROYECTOS ↗</button><div className="orb"><i /><i /><i /></div><div className="landing-marquee">IDENTIDAD — DIRECCIÓN — DIGITAL — IDENTIDAD —</div></div>;
}

function CatalogMock() {
  return <div className="mock-catalog"><nav><strong>FORMA</strong><span>COLECCIÓN</span><span>MATERIALES</span><span>ÍNDICE</span><b>ES / EN</b></nav><header><small>ARCHIVO DE OBJETOS — Nº 24</small><h2>Una colección<br />para <i>habitar.</i></h2><p>Piezas esenciales. Materiales honestos.<br />Diseño para todos los días.</p></header><div className="catalog-cards"><article><i /><b>01 — ARC</b><small>ROBLE / ACERO</small></article><article><i /><b>02 — MONO</b><small>PIEDRA / LINO</small></article><article><i /><b>03 — NIDO</b><small>BARRO / VIDRIO</small></article></div><footer><span>DESLIZA PARA EXPLORAR</span><b>2026 © FORMA STUDIO</b></footer></div>;
}

function StoreMock() {
  return <div className="mock-store"><img className="np-live" src="/nortepack-site.png" alt="Portada real de la tienda NORTEPACK" /><div className="np-live-label"><span>PROYECTO REAL</span><strong>NORTEPACK.ES</strong><b>↗</b></div></div>;
}

function DashboardMock() {
  return <div className="mock-dashboard"><aside><b>P</b><i /><i /><i /><i /><span>AL</span></aside><main><nav><small>PULSO / CONTROL</small><span>Buscar</span><b>31 AGO 2026</b></nav><header><div><small>RESUMEN GENERAL</small><h2>Tu proyecto<br />avanza.</h2></div><button>+ NUEVA CAMPAÑA</button></header><div className="dashboard-cards"><article><span>VISITAS TOTALES</span><b>12.480</b><small>↗ 18,2%</small><i /></article><article><span>CONVERSIÓN</span><b>8,4%</b><em>+24%</em></article><article><span>ACTIVIDAD / 7 DÍAS</span><div className="bars"><i /><i /><i /><i /><i /><i /><i /></div></article></div></main></div>;
}
