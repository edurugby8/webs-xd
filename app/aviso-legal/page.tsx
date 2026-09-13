import type { Metadata } from "next";
import { CONTACT, ContactBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = {
  title: "Aviso legal | CodeCraft",
  description: "Información legal de CodeCraft: titular, condiciones de uso, propiedad intelectual, cookies y tratamiento de datos personales.",
};

/**
 * Datos identificativos del titular.
 *
 * `nombre`, `nif` y `domicilio` se muestran solo si tienen contenido: los
 * campos vacíos no se pintan. Se completan cuando haya alta como autónomo,
 * que es el momento en que la LSSI exige publicarlos.
 */
const TITULAR = {
  nombre: "Eduardo Babarro Romay",
  nombreComercial: "CodeCraft",
  nif: "",
  domicilio: "",
  localidad: "Ourense, Galicia (España)",
};

const ACTUALIZADO = "Septiembre de 2026";

export default function AvisoLegal() {
  const filas: [string, string][] = [
    ...(TITULAR.nombre ? ([["Titular", TITULAR.nombre]] as [string, string][]) : []),
    ["Nombre comercial", TITULAR.nombreComercial],
    ...(TITULAR.nif ? ([["NIF", TITULAR.nif]] as [string, string][]) : []),
    ...(TITULAR.domicilio ? ([["Domicilio", TITULAR.domicilio]] as [string, string][]) : []),
    ["Ubicación", TITULAR.localidad],
    ["Correo electrónico", CONTACT.email],
  ];

  return (
    <PageShell>
      <PageHero
        number="05"
        label="Aviso legal"
        description="Quién está detrás de esta web, qué puedes esperar de ella y qué hacemos —y qué no hacemos— con tus datos."
      >
        Todo claro,<br />también <em>aquí.</em>
      </PageHero>

      <section className="legal-doc">
        <article>
          <h2>1. Titular de la web</h2>
          <dl className="legal-data">
            {filas.map(([clave, valor]) => (
              <div key={clave}>
                <dt>{clave}</dt>
                <dd>
                  {clave === "Correo electrónico" ? <a href={`mailto:${valor}`}>{valor}</a> : valor}
                </dd>
              </div>
            ))}
          </dl>
        </article>

        <article>
          <h2>2. Objeto</h2>
          <p>
            Esta web presenta los servicios de diseño y desarrollo web de CodeCraft. El acceso y la navegación son
            libres y gratuitos, y no requieren registro ni la creación de ninguna cuenta.
          </p>
          <p>
            Los precios que aparecen en la sección de Precios son orientativos y no constituyen una oferta vinculante.
            El alcance y el precio final de cada proyecto se acuerdan y se confirman por escrito antes de empezar.
          </p>
        </article>

        <article>
          <h2>3. Cookies</h2>
          <p>
            <strong>Esta web no utiliza cookies.</strong> No se instala ningún archivo en tu dispositivo, ni propio ni
            de terceros, y no se emplea almacenamiento local del navegador.
          </p>
          <p>
            Tampoco se utilizan herramientas de analítica, píxeles de seguimiento ni contenidos incrustados de otros
            servicios. Las tipografías se sirven desde este mismo dominio, de modo que la navegación no genera
            peticiones a servidores externos. Por eso no verás ningún aviso de consentimiento: no hay nada que
            consentir.
          </p>
        </article>

        <article>
          <h2>4. Datos personales</h2>
          <p>
            Esta web no incluye formularios y no recoge datos personales de quien la visita. Si nos escribes por correo
            electrónico o por Instagram, trataremos únicamente los datos que nos facilites para atender tu consulta y
            gestionar la relación comercial que pueda derivarse de ella.
          </p>
          <p>
            Esos datos no se ceden a terceros salvo obligación legal, y se conservan solo mientras sigan siendo
            necesarios para esa finalidad. Puedes solicitar el acceso, la rectificación o la supresión de tus datos, así
            como oponerte a su tratamiento, escribiendo a{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. También puedes presentar una reclamación ante la
            Agencia Española de Protección de Datos.
          </p>
        </article>

        <article>
          <h2>5. Propiedad intelectual</h2>
          <p>
            Los textos, el diseño, el código y los elementos gráficos de esta web pertenecen a su titular, salvo que se
            indique otra cosa. Puedes consultarlos y compartirlos citando la fuente, pero no reproducirlos ni
            reutilizarlos con fines comerciales sin autorización previa.
          </p>
          <p>
            Los proyectos mostrados como ejemplo se publican con la conformidad de sus responsables. Las marcas y
            nombres comerciales que aparecen en ellos pertenecen a sus respectivos propietarios.
          </p>
        </article>

        <article>
          <h2>6. Responsabilidad y enlaces externos</h2>
          <p>
            Cuidamos de que la información publicada sea correcta y esté actualizada, pero no podemos garantizar que
            esté libre de errores ni que la web esté disponible de forma ininterrumpida.
          </p>
          <p>
            Esta web contiene enlaces a sitios de terceros, como Instagram o las webs de proyectos realizados. No
            controlamos su contenido ni sus políticas de privacidad, así que al seguir esos enlaces pasas a regirte por
            las condiciones de cada uno.
          </p>
        </article>

        <article>
          <h2>7. Legislación aplicable</h2>
          <p>
            Estas condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso de esta
            web serán competentes los juzgados y tribunales que correspondan conforme a la normativa vigente.
          </p>
          <p className="legal-updated">Última actualización: {ACTUALIZADO}</p>
        </article>
      </section>

      <ContactBand />
    </PageShell>
  );
}
