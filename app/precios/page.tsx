import type { Metadata } from "next";
import { Arrow, ContactBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = { title: "Precios | CodeCraft", description: "Precios orientativos de páginas web, catálogos, tiendas online y extras de CodeCraft." };

const extras = [
  ["Diseño de logo", "30 €"], ["Formulario + página de gracias", "30 €"],
  ["Barra informativa", "30 €"], ["Página adicional", "25 €"],
  ["SEO básico para publicación", "39 €"], ["Google Maps / ficha de negocio", "15 €"],
  ["Textos legales básicos", "25 €"], ["Versión multiidioma", "59 €"],
  ["Código QR", "15 €"], ["Mantenimiento web", "desde 29 €/mes"],
];

export default function Precios() {
  return (
    <PageShell>
      <PageHero number="04" label="Precios" description="Una referencia clara para empezar. Antes de contratar, revisamos contigo el contenido y confirmamos por escrito el precio final.">
        Sencillo de entender.<br /><em>Claro</em> desde el inicio.
      </PageHero>
      <section className="pricing-grid">
        <article className="price-card price-main"><span>01 / ESENCIAL</span><h2>Web básica</h2><div className="price">75 €</div><p>Una presencia web sencilla para publicar tu negocio o idea.</p><ul><li>Inicio</li><li>Quiénes somos</li><li>Servicios</li><li>Contacto y WhatsApp</li><li>Diseño móvil</li></ul><a href="https://www.instagram.com/codecraft.es/" target="_blank" rel="noreferrer">Pedir información <Arrow /></a></article>
        <article className="price-card"><span>02 / CATÁLOGO</span><h2>Catálogo o tienda</h2><div className="price">+150 €</div><p>Se añade a la web básica para mostrar o vender productos.</p><ul><li>Fichas de producto</li><li>Categorías</li><li>Carrito o pedidos</li><li>Proceso de compra</li><li>Gestión inicial</li></ul><a href="/servicios">Ver el servicio <Arrow /></a></article>
        <article className="price-card"><span>03 / PRESENCIA</span><h2>Web + Instagram</h2><div className="price">150 €</div><p>Una base web acompañada por la preparación visual del perfil.</p><ul><li>Web esencial</li><li>Ajuste del perfil</li><li>Imagen coherente</li><li>Contenido inicial</li><li>Conexión entre canales</li></ul><a href="https://www.instagram.com/codecraft.es/" target="_blank" rel="noreferrer">Consultar pack <Arrow /></a></article>
      </section>
      <section className="extras-section">
        <div className="extras-head"><p className="section-label">Extras</p><h2>Añade solo lo que necesites.</h2><p>Los extras se suman al servicio principal. Si tu proyecto necesita algo distinto, preparamos un presupuesto personalizado.</p></div>
        <div className="extras-table">{extras.map(([name, price], index) => <div key={name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><b>{price}</b></div>)}</div>
      </section>
      <section className="price-notes">
        <div><span>DOMINIO</span><p>El dominio se contrata y renueva aparte cada año. El precio depende del nombre y del proveedor elegido.</p></div>
        <div><span>CONTENIDO</span><p>Los precios parten de que el cliente facilita textos, imágenes y datos básicos. Podemos ayudarte a prepararlos como extra.</p></div>
        <div><span>PRESUPUESTO</span><p>Siempre confirmamos el alcance y el precio final antes de empezar el proyecto.</p></div>
      </section>
      <ContactBand />
    </PageShell>
  );
}
