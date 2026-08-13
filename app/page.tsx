import { Arrow, ContactBand, PageShell } from "./components";

const routes = [
  { n: "01", title: "Servicios", text: "Webs, catálogos, tiendas online y presencia digital.", href: "/servicios", tone: "lime" },
  { n: "02", title: "Cómo trabajamos", text: "Un proceso sencillo desde la primera idea hasta la publicación.", href: "/como-trabajamos", tone: "dark" },
  { n: "03", title: "Sobre nosotros", text: "Un estudio cercano, flexible y centrado en soluciones útiles.", href: "/sobre-nosotros", tone: "paper" },
  { n: "04", title: "Precios", text: "Servicios y extras explicados con cifras claras.", href: "/precios", tone: "coral" },
];

export default function Home() {
  return (
    <PageShell>
      <section className="home-hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="home-copy">
          <p className="eyebrow"><span /> CodeCraft es un estudio digital</p>
          <h1>Publicamos tus ideas en <em>internet.</em></h1>
          <p className="hero-lead">
            Creamos páginas web, catálogos y tiendas online. También trabajamos
            la presencia digital para que tu proyecto se entienda, se vea y avance.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/servicios">Ver servicios <Arrow /></a>
            <a className="button button-line" href="/precios">Consultar precios</a>
          </div>
        </div>
        <div className="future-console" aria-label="De una idea a una presencia digital publicada">
          <div className="console-head"><span>CODECRAFT / STUDIO</span><span>ONLINE ●</span></div>
          <div className="console-center">
            <div className="signal-ring"><i /><i /><i /></div>
            <p>IDEA</p><b>→</b><p>DISEÑO</p><b>→</b><p>ONLINE</p>
          </div>
          <div className="console-footer">
            <span>WEB</span><span>CATÁLOGO</span><span>TIENDA</span><span>PRESENCIA</span>
          </div>
        </div>
      </section>

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
