import type { Metadata } from "next";
import { Arrow, ContactBand, PageHero, PageShell } from "../components";
import { ProjectsScene } from "../projects-scene";

export const metadata: Metadata = { title: "Cómo trabajamos | CodeCraft", description: "Proceso, equipo y proyectos realizados por CodeCraft." };

export default function ComoTrabajamos() {
  return (
    <PageShell>
      <PageHero number="02" label="Cómo trabajamos" description="Un proceso cercano y ordenado. Tú conoces tu idea; nosotros la convertimos en una experiencia digital que se pueda publicar y utilizar.">
        De la primera idea<br />a estar <em>online.</em>
      </PageHero>
      <section className="work-steps">
        <article><span>01</span><div><h2>Escuchamos</h2><p>Nos explicas qué quieres publicar, para quién es y qué debería conseguir la web.</p></div><small>IDEA / OBJETIVO</small></article>
        <article><span>02</span><div><h2>Organizamos</h2><p>Definimos páginas, contenido, funciones y un presupuesto antes de empezar.</p></div><small>PLAN / CONTENIDO</small></article>
        <article><span>03</span><div><h2>Diseñamos</h2><p>Creamos la web, te enseñamos el avance y corregimos contigo lo importante.</p></div><small>DISEÑO / DESARROLLO</small></article>
        <article><span>04</span><div><h2>Publicamos</h2><p>Comprobamos que todo funcione, conectamos el dominio y ponemos la idea en internet.</p></div><small>REVISIÓN / ONLINE</small></article>
      </section>
      <section className="studio-team">
        <div className="team-copy"><p className="section-label">El equipo</p><h2>Pequeño por elección.<br /><em>Flexible por diseño.</em></h2><p>CodeCraft funciona como un estudio digital independiente. Una persona coordina el proyecto y, cuando hace falta, se incorporan perfiles especializados. Así mantienes un contacto directo durante todo el trabajo.</p></div>
        <div className="team-roles">
          <article><span>01</span><h3>Dirección y estrategia</h3><p>Define contigo el objetivo, la estructura y las prioridades.</p></article>
          <article><span>02</span><h3>Diseño y desarrollo</h3><p>Construye la experiencia visual y el funcionamiento de la web.</p></article>
          <article><span>03</span><h3>Contenido y presencia</h3><p>Da coherencia a los textos, las imágenes y la comunicación digital.</p></article>
        </div>
      </section>
      <section className="projects-block">
        <div className="projects-title">
          <p className="section-label">Proyectos realizados</p>
          <h2>Trabajo real,<br />explicado <em>claro.</em></h2>
        </div>
        <ProjectsScene />
      </section>

      <section className="pcases" aria-label="Caso de estudio">
        <article className="pcase">
          <div className="pcase-shot">
            <img src="/nortepack-site.png" alt="Portada de la tienda online NORTEPACK" loading="lazy" />
          </div>
          <div className="pcase-body">
            <div className="pcase-head"><span>CASO / 001</span><b>TIENDA ONLINE</b></div>
            <h3>NORTEPACK</h3>
            <p>Una marca de mochilas que necesitaba vender por su cuenta, sin depender de un marketplace. Montamos la tienda completa y la dejamos publicada y funcionando con dominio propio.</p>
            <ul className="pcase-list">
              <li>Catálogo y fichas de producto</li>
              <li>Carrito y proceso de pedido</li>
              <li>Identidad visual y tono de marca</li>
              <li>Publicación con dominio propio</li>
            </ul>
            <div className="pcase-tags"><span>Tienda online</span><span>Catálogo</span><span>Identidad</span><span>Ourense</span></div>
            <a className="pcase-link" href="https://www.nortepack.es" target="_blank" rel="noreferrer">Ver nortepack.es <Arrow /></a>
          </div>
        </article>
      </section>

      <ContactBand />
    </PageShell>
  );
}
