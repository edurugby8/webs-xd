"use client";

import { useEffect, useRef, useState } from "react";

type Phase = {
  id: string;
  kicker: string;
  title: string;
  em: string;
  text: string;
};

const phases: Phase[] = [
  {
    id: "idea",
    kicker: "Fase 01 / Idea",
    title: "Todo empieza",
    em: "con una idea.",
    text: "Nos cuentas qué quieres publicar y para quién. Ahí no hay código todavía: hay una intención que merece verse bien.",
  },
  {
    id: "estructura",
    kicker: "Fase 02 / Estructura",
    title: "Le damos",
    em: "forma.",
    text: "Secciones, contenido y jerarquía. Decidimos qué va primero y qué sobra. Antes del color, el orden.",
  },
  {
    id: "diseno",
    kicker: "Fase 03 / Diseño",
    title: "Diseñamos",
    em: "cada detalle.",
    text: "Tipografía, imagen, ritmo y movimiento. Capa sobre capa, hasta que todo encaja y la web empieza a parecerse a ti.",
  },
  {
    id: "resultado",
    kicker: "Fase 04 / Resultado",
    title: "Tu próxima web",
    em: "empieza aquí.",
    text: "Esto es NORTEPACK: una tienda online real que diseñamos, montamos y publicamos. El proceso que acabas de ver, terminado.",
  },
];

const codeChips = ["<section>", "grid", "hero", "flex", "</div>"];
const designLayers = ["Tipografía", "Imagen", "Interfaz"];

function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/** Progreso local de un tramo [from, to] con suavizado, para encadenar fases sin saltos. */
function segment(progress: number, from: number, to: number) {
  const raw = clamp01((progress - from) / (to - from));
  return raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
}

export function ProjectsScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    setLive(true);

    const scene = sceneRef.current;
    const sticky = stickyRef.current;
    if (!scene || !sticky) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let progress = 0;
    let target = 0;
    let frame = 0;
    let running = false;
    let lastIndex = -1;

    const readProgress = () => {
      const rect = scene.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      target = travel > 0 ? clamp01(-rect.top / travel) : 0;
    };

    const render = () => {
      progress += (target - progress) * 0.2;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      const p = Math.abs(target - progress) < 0.0005 ? target : progress;
      const style = sticky.style;
      style.setProperty("--p", p.toFixed(4));
      style.setProperty("--glyph", (1 - segment(p, 0.13, 0.29)).toFixed(4));
      style.setProperty("--build", segment(p, 0.2, 0.4).toFixed(4));
      style.setProperty("--design", segment(p, 0.44, 0.62).toFixed(4));
      style.setProperty("--final", segment(p, 0.7, 0.88).toFixed(4));
      style.setProperty("--mx", pointer.x.toFixed(4));
      style.setProperty("--my", pointer.y.toFixed(4));

      const index = p < 0.21 ? 0 : p < 0.455 ? 1 : p < 0.715 ? 2 : 3;
      if (index !== lastIndex) {
        lastIndex = index;
        setActive(index);
      }

      const settled =
        Math.abs(target - progress) < 0.0005 &&
        Math.abs(pointer.tx - pointer.x) < 0.0005 &&
        Math.abs(pointer.ty - pointer.y) < 0.0005;

      if (settled) {
        running = false;
        return;
      }
      frame = window.requestAnimationFrame(render);
    };

    const schedule = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(render);
    };

    const onScroll = () => {
      readProgress();
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = sticky.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      schedule();
    };

    readProgress();
    progress = target;
    schedule();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (fine) {
      sticky.addEventListener("pointermove", onPointerMove);
      sticky.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      sticky.removeEventListener("pointermove", onPointerMove);
      sticky.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className={`pscene${live ? " is-live" : ""}`} ref={sceneRef}>
      <div className="pscene-sticky" ref={stickyRef}>
        <div className="pscene-bg" aria-hidden="true">
          <i className="ps-floor" />
          <i className="ps-glow ps-glow-cold" />
          <i className="ps-glow ps-glow-warm" />
          <i className="ps-vignette" />
        </div>

        <div className="pscene-stage" aria-hidden="true">
          <div className="ps-glyph">
            {Array.from({ length: 7 }, (_, index) => (
              <i key={index} style={{ ["--i" as string]: index }}>
                &lt;/&gt;
              </i>
            ))}
          </div>

          <div className="ps-chips">
            {codeChips.map((chip, index) => (
              <span key={chip} style={{ ["--i" as string]: index }}>
                {chip}
              </span>
            ))}
          </div>

          <div className="ps-layers">
            {designLayers.map((layer, index) => (
              <div className="ps-layer" key={layer} style={{ ["--i" as string]: index }}>
                <b>{layer}</b>
                <i />
              </div>
            ))}
          </div>

          <div className="ps-frame">
            <div className="ps-bar">
              <i />
              <i />
              <i />
              <span>nortepack.es</span>
            </div>
            <div className="ps-screen">
              <div className="ps-wire">
                <i className="w-nav" />
                <i className="w-hero" />
                <i className="w-line" />
                <i className="w-line short" />
                <div className="w-grid">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="ps-design">
                <div className="d-nav">
                  <b>NORTEPACK</b>
                  <span />
                  <span />
                </div>
                <strong>Mochilas para el norte.</strong>
                <p>Diseño resistente para todos los días.</p>
                <div className="d-cards">
                  <i />
                  <i />
                  <i />
                </div>
                <em>VER COLECCIÓN</em>
              </div>
              <img className="ps-real" src="/nortepack-site.png" alt="" />
            </div>
          </div>

          <span className="ps-tag">
            <b>Proyecto real</b>
            NORTEPACK.ES
          </span>
        </div>

        <div className="pscene-copy">
          <ol className="ps-phases">
            {phases.map((phase, index) => (
              <li className={`ps-phase${live && index === active ? " is-on" : ""}`} key={phase.id}>
                <p className="ps-kicker">{phase.kicker}</p>
                <h3>
                  {phase.title}
                  <br />
                  <em>{phase.em}</em>
                </h3>
                <p className="ps-text">{phase.text}</p>
                {index === phases.length - 1 && (
                  <div className="ps-actions">
                    <a
                      className="ps-cta"
                      href="https://www.instagram.com/codecraft.es/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Cuéntanos tu proyecto
                      <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </a>
                    <a className="ps-visit" href="https://www.nortepack.es" target="_blank" rel="noreferrer">
                      Ver nortepack.es ↗
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div className="ps-progress" aria-hidden="true">
            {phases.map((phase, index) => (
              <i key={phase.id} className={live && index <= active ? "is-done" : undefined} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
