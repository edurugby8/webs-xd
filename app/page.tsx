import { Arrow, ContactBand, PageShell } from "./components";
import { HeroShowcase } from "./hero-showcase";

const routes = [
  { n: "01", title: "Servicios", text: "Webs, catálogos, tiendas online y presencia digital.", href: "/servicios", tone: "lime" },
  { n: "02", title: "Cómo trabajamos", text: "Un proceso sencillo desde la primera idea hasta la publicación.", href: "/como-trabajamos", tone: "dark" },
  { n: "03", title: "Sobre nosotros", text: "Un estudio cercano, flexible y centrado en soluciones útiles.", href: "/sobre-nosotros", tone: "paper" },
  { n: "04", title: "Precios", text: "Servicios y extras explicados con cifras claras.", href: "/precios", tone: "coral" },
];

export default function Home() {
  return (
    <PageShell>
      <HeroShowcase />

      <section className="route-section">
        <div className="section-intro">
          <p>Explora CodeCraft</p>
          <h2>Todo en su sitio.</h2>
          <span>Una web sencilla de recorrer, con la información importante separada y bien explicada.</span>
        </div>
        <div className="route-grid">
          {routes.map((item) => (
            <a className={`route-card ${item.tone}`} href={item.href} key={item.href}>
              <span>{item.n}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="home-statement">
        <p>Estudio digital · Ourense</p>
        <h2>Menos complicaciones.<br />Más ideas <em>publicadas.</em></h2>
        <div className="statement-values"><span>Claridad</span><span>Diseño</span><span>Cercanía</span><span>Evolución</span></div>
      </section>
      <ContactBand />
    </PageShell>
  );
}
