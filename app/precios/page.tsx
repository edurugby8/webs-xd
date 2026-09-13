import type { Metadata } from "next";
import { Arrow, ContactBand, PageHero, PageShell } from "../components";
import { EXTRAS, NOTAS, PAQUETES } from "../catalogo";

export const metadata: Metadata = { title: "Precios | CodeCraft", description: "Precios orientativos de páginas web, catálogos, tiendas online y extras de CodeCraft." };

export default function Precios() {
  return (
    <PageShell>
      <PageHero number="04" label="Precios" description="Una referencia clara para empezar. Antes de contratar, revisamos contigo el contenido y confirmamos por escrito el precio final.">
        Sencillo de entender.<br /><em>Claro</em> desde el inicio.
      </PageHero>
      <section className="pricing-grid">
        {PAQUETES.map((paquete) => (
          <article className={`price-card${paquete.destacado ? " price-main" : ""}`} key={paquete.id}>
            <span>{paquete.codigo}</span>
            <h2>{paquete.nombre}</h2>
            <div className="price">{paquete.precioEtiqueta}</div>
            <p>{paquete.descripcion}</p>
            <ul>{paquete.incluye.map((punto) => <li key={punto}>{punto}</li>)}</ul>
            <a
              href={paquete.enlace.href}
              {...(paquete.enlace.externo ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {paquete.enlace.texto} <Arrow />
            </a>
          </article>
        ))}
      </section>
      <section className="pricing-guide">
        <p>¿No sabes cuál encaja contigo?</p>
        <a className="button button-primary" href="/preparar-proyecto">Preparar mi proyecto <Arrow /></a>
      </section>
      <section className="extras-section">
        <div className="extras-head"><p className="section-label">Extras</p><h2>Añade solo lo que necesites.</h2><p>Los extras se suman al servicio principal. Si tu proyecto necesita algo distinto, preparamos un presupuesto personalizado.</p></div>
        <div className="extras-table">{EXTRAS.map((extra, index) => <div key={extra.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{extra.nombre}</strong><b>{extra.precioEtiqueta}</b></div>)}</div>
      </section>
      <section className="price-notes">
        {NOTAS.map((nota) => <div key={nota.titulo}><span>{nota.titulo}</span><p>{nota.texto}</p></div>)}
      </section>
      <ContactBand />
    </PageShell>
  );
}
