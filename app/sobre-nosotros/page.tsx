import type { Metadata } from "next";
import { ContactBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = { title: "Sobre nosotros | CodeCraft", description: "Conoce el estudio digital CodeCraft, nuestra forma de pensar y nuestros valores." };

export default function SobreNosotros() {
  return (
    <PageShell>
      <PageHero number="03" label="Sobre nosotros" description="CodeCraft nace para ayudar a personas, emprendedores y pequeños negocios a publicar sus ideas sin que la tecnología se convierta en una barrera.">
        Un estudio para<br />ideas con <em>futuro.</em>
      </PageHero>
      <section className="about-statement">
        <p className="section-label">Qué somos</p>
        <h2>CodeCraft es un estudio digital.</h2>
        <p>Creamos espacios en internet donde una idea puede explicarse, mostrarse o venderse. Nuestro trabajo principal es el diseño web, acompañado por catálogos, tiendas online y presencia digital cuando el proyecto lo necesita.</p>
      </section>
      <section className="principles-grid">
        <article><span>01</span><h3>Claro</h3><p>Te explicamos qué vamos a hacer, cuánto cuesta y para qué sirve.</p></article>
        <article><span>02</span><h3>Cercano</h3><p>Hablas directamente con quien está construyendo tu proyecto.</p></article>
        <article><span>03</span><h3>Útil</h3><p>Cada página y función debe tener un motivo, no solamente decorar.</p></article>
        <article><span>04</span><h3>Abierto</h3><p>Construimos una base que pueda cambiar y crecer con tu idea.</p></article>
      </section>
      <section className="origin-panel">
        <div><p>BASE / OURENSE</p><h2>Trabajamos desde Galicia.<br />Publicamos para <em>cualquier lugar.</em></h2></div>
        <p>Podemos colaborar de forma cercana con negocios locales y trabajar a distancia con proyectos de cualquier punto de España.</p>
      </section>
      <ContactBand />
    </PageShell>
  );
}
