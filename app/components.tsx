import type { ReactNode } from "react";

export const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const links = [
  ["Servicios", "/servicios"],
  ["Cómo trabajamos", "/como-trabajamos"],
  ["Sobre nosotros", "/sobre-nosotros"],
  ["Precios", "/precios"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="CodeCraft, inicio">
        <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
        <span>CodeCraft<span className="brand-dot">.</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="header-contact" href="https://www.instagram.com/codecraft.es/" target="_blank" rel="noreferrer">
        Contacto <Arrow />
      </a>
      <details className="mobile-menu">
        <summary aria-label="Abrir navegación"><span /><span /></summary>
        <nav>
          {links.map(([label, href]) => <a href={href} key={href}>{label}<Arrow /></a>)}
          <a href="https://www.instagram.com/codecraft.es/" target="_blank" rel="noreferrer">Contacto<Arrow /></a>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="brand" href="/">
          <span className="brand-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>CodeCraft<span className="brand-dot">.</span></span>
        </a>
        <p>Un estudio digital para publicar ideas en internet.</p>
        <nav aria-label="Navegación del pie">
          {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 CodeCraft</span>
        <span>Ourense · Galicia</span>
        <a href="https://www.instagram.com/codecraft.es/" target="_blank" rel="noreferrer">Instagram ↗</a>
      </div>
    </footer>
  );
}

export function PageHero({ number, label, children, description }: { number: string; label: string; children: ReactNode; description: string }) {
  return (
    <section className="page-hero">
      <div className="page-orbit" aria-hidden="true"><i /><i /><i /></div>
      <p className="page-kicker"><span>{number}</span>{label}</p>
      <h1>{children}</h1>
      <p className="page-description">{description}</p>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <p>¿Tienes una idea?</p>
        <h2>Vamos a publicarla.</h2>
      </div>
      <a className="button button-accent" href="https://www.instagram.com/codecraft.es/" target="_blank" rel="noreferrer">
        Cuéntanos tu proyecto <Arrow />
      </a>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main><SiteHeader />{children}<SiteFooter /></main>;
}
