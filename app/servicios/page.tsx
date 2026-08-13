import type { Metadata } from "next";
import { Arrow, ContactBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = { title: "Servicios | CodeCraft", description: "Páginas web, catálogos, tiendas online y presencia digital." };

const services = [
  { n: "01", title: "Páginas web", intro: "Tu espacio propio para presentar una idea, un negocio o un servicio en internet.", items: ["Diseño adaptado a tu proyecto", "Versión móvil", "Secciones esenciales", "Botón de contacto", "Publicación online"] },
  { n: "02", title: "Catálogos", intro: "Muestra productos o servicios de forma ordenada sin necesidad de una compra online completa.", items: ["Fichas de producto", "Categorías y filtros", "Galería de imágenes", "Contacto para pedidos", "Actualización sencilla"] },
  { n: "03", title: "Tiendas online", intro: "Una web preparada para enseñar, vender y gestionar productos desde un mismo lugar.", items: ["Catálogo y carrito", "Proceso de pedido", "Métodos de pago", "Información de envío", "Panel de gestión"] },
  { n: "04", title: "Presencia digital", intro: "Damos coherencia a la forma en que tu proyecto aparece y comunica en internet.", items: ["Imagen visual", "Contenido para redes", "Google Business", "SEO básico", "Estrategia digital"] },
];

export default function Servicios() {
  return (
    <PageShell>
      <PageHero number="01" label="Servicios" description="Soluciones claras para transformar una idea en una presencia digital útil, profesional y preparada para crecer.">
        Lo que podemos<br />crear <em>contigo.</em>
      </PageHero>
      <section className="service-detail-list">
        {services.map((service) => (
          <article className="service-detail" key={service.n}>
            <div className="service-number">{service.n}</div>
            <div className="service-main"><h2>{service.title}</h2><p>{service.intro}</p></div>
            <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>
      <section className="deliverables">
        <p className="section-label">En todos los proyectos</p>
        <div className="deliverable-grid">
          <article><span>◎</span><h3>Orden</h3><p>Una estructura fácil de entender para ti y para las personas que visiten la web.</p></article>
          <article><span>◇</span><h3>Adaptación</h3><p>Diseño preparado para ordenador, tablet y móvil.</p></article>
          <article><span>↗</span><h3>Publicación</h3><p>Dejamos el proyecto funcionando y accesible en internet.</p></article>
        </div>
        <a className="text-link" href="/precios">Ver precios y extras <Arrow /></a>
      </section>
      <ContactBand />
    </PageShell>
  );
}
