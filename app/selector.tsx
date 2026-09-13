"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Arrow, CONTACT } from "./components";
import {
  MATERIALES,
  OBJETIVOS,
  PAQUETES,
  desglosePaquete,
  eur,
  extrasPara,
  importeBase,
  type MaterialId,
  type ObjetivoId,
} from "./catalogo";

const PASOS = ["Qué quieres conseguir", "Qué tienes preparado", "Qué quieres añadir"];

export function Selector() {
  const [paso, setPaso] = useState(0); // 0,1,2 = pasos · 3 = resultado
  const [objetivo, setObjetivo] = useState<ObjetivoId | null>(null);
  const [materiales, setMateriales] = useState<MaterialId[]>([]);
  const [extrasSel, setExtrasSel] = useState<string[]>([]);
  const [resumen, setResumen] = useState("");
  const [resumenEditado, setResumenEditado] = useState(false);
  const [aviso, setAviso] = useState("");
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const primeraCarga = useRef(true);

  /* --- Cálculo ------------------------------------------------------ */

  const objetivoDef = OBJETIVOS.find((o) => o.id === objetivo) ?? null;
  const paqueteId = objetivoDef?.recomienda ?? null;
  const paquete = PAQUETES.find((p) => p.id === paqueteId) ?? null;
  const alternativa = PAQUETES.find((p) => p.id === objetivoDef?.alternativa) ?? null;
  const personalizado = objetivoDef !== null && paqueteId === null;

  const extrasDisponibles = useMemo(
    () => (objetivo ? extrasPara(objetivo, paqueteId) : []),
    [objetivo, paqueteId],
  );
  const extrasElegidos = useMemo(
    () => extrasDisponibles.filter((extra) => extrasSel.includes(extra.id)),
    [extrasDisponibles, extrasSel],
  );

  // Pagos únicos con precio cerrado, cuotas, y lo que queda por valorar.
  const unicos = extrasElegidos.filter((e) => !e.recurrente && e.importe !== null && !e.desde);
  const recurrentes = extrasElegidos.filter((e) => e.recurrente);
  const sinPrecio = extrasElegidos.filter((e) => e.importe === null || (e.desde && !e.recurrente));
  const faltaMaterial = materiales.includes("nada");

  const base = paqueteId ? desglosePaquete(paqueteId) : [];
  const totalBase = paqueteId ? importeBase(paqueteId) : 0;
  const totalUnico = totalBase + unicos.reduce((suma, e) => suma + (e.importe ?? 0), 0);

  /* --- Resumen en texto plano --------------------------------------- */

  const resumenCalculado = useMemo(() => {
    if (!objetivoDef) return "";
    const lineas: string[] = ["Solicitud de presupuesto — CodeCraft", ""];
    lineas.push(`Objetivo: ${objetivoDef.etiqueta}`);

    const tengo = MATERIALES.filter((m) => m.id !== "nada" && materiales.includes(m.id)).map((m) => m.etiqueta);
    lineas.push(`Material preparado: ${faltaMaterial ? "todavía nada" : tengo.length ? tengo.join(", ") : "sin especificar"}`);
    lineas.push("");

    if (paquete) {
      lineas.push(`Servicio recomendado: ${paquete.nombre}`);
      base.forEach((linea) => lineas.push(`  - ${linea.nombre}: ${eur(linea.importe)}`));
      lineas.push(`  Base: ${eur(totalBase)}`);
    } else {
      lineas.push("Servicio: presupuesto personalizado (fuera de los paquetes publicados)");
    }

    if (extrasElegidos.length) {
      lineas.push("");
      lineas.push(personalizado ? "Le interesa:" : "Extras elegidos:");
      extrasElegidos.forEach((e) => lineas.push(`  - ${e.nombre}: ${e.precioEtiqueta}`));
    }

    if (!personalizado) {
      lineas.push("");
      lineas.push(`Total orientativo (pago único): ${eur(totalUnico)}`);
    }
    if (recurrentes.length) {
      recurrentes.forEach((e) => lineas.push(`Coste recurrente: ${e.nombre} — ${e.precioEtiqueta}`));
    }
    if (sinPrecio.length || faltaMaterial || personalizado) {
      lineas.push("");
      lineas.push("Pendiente de valorar:");
      sinPrecio.forEach((e) => lineas.push(`  - ${e.nombre}`));
      if (faltaMaterial) lineas.push("  - Preparación de materiales (textos, imágenes)");
      if (personalizado) lineas.push("  - El proyecto completo: necesita presupuesto personalizado");
    }

    lineas.push("");
    lineas.push("El dominio se contrata y renueva aparte cada año.");
    lineas.push("El alcance y el precio final se confirman por escrito antes de empezar.");
    return lineas.join("\n");
  }, [objetivoDef, materiales, faltaMaterial, paquete, base, totalBase, extrasElegidos, personalizado, totalUnico, recurrentes, sinPrecio]);

  // El resumen se mantiene sincronizado hasta que la persona lo edita a mano.
  useEffect(() => {
    if (!resumenEditado) setResumen(resumenCalculado);
  }, [resumenCalculado, resumenEditado]);

  // Al cambiar de paso se lleva el foco al título, para no perder el sitio
  // con el teclado o con un lector de pantalla.
  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    tituloRef.current?.focus();
    setAviso("");
  }, [paso]);

  /* --- Interacción --------------------------------------------------- */

  function elegirObjetivo(id: ObjetivoId) {
    setObjetivo(id);
    // Se descartan los extras que dejan de ofrecerse para el nuevo objetivo.
    const siguen = extrasPara(id, OBJETIVOS.find((o) => o.id === id)?.recomienda ?? null).map((e) => e.id);
    setExtrasSel((previos) => previos.filter((x) => siguen.includes(x)));
    setResumenEditado(false);
  }

  function alternarMaterial(id: MaterialId) {
    setMateriales((previos) => {
      if (id === "nada") return previos.includes("nada") ? [] : ["nada"];
      const sinNada = previos.filter((m) => m !== "nada");
      return sinNada.includes(id) ? sinNada.filter((m) => m !== id) : [...sinNada, id];
    });
    setResumenEditado(false);
  }

  function alternarExtra(id: string) {
    setExtrasSel((previos) => (previos.includes(id) ? previos.filter((x) => x !== id) : [...previos, id]));
    setResumenEditado(false);
  }

  // Enlace mailto real: funciona con teclado, permite copiar la dirección y
  // deja que sea el navegador quien abra el programa de correo.
  const asunto = `Solicitud de presupuesto — ${paquete ? paquete.nombre : "Presupuesto personalizado"}`;
  const enlaceCorreo = `mailto:${CONTACT.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(resumen)}`;

  async function copiarResumen() {
    try {
      await navigator.clipboard.writeText(resumen);
      setAviso("Resumen copiado al portapapeles. Pégalo donde quieras: correo, WhatsApp o Instagram.");
    } catch {
      setAviso("No se ha podido copiar automáticamente. Selecciona el texto del resumen y cópialo a mano.");
    }
  }

  const puedeSeguir = paso === 0 ? objetivo !== null : true;

  /* --- Vista --------------------------------------------------------- */

  return (
    <section className="selector" aria-labelledby="selector-titulo">
      <ol className="selector-pasos">
        {PASOS.map((etiqueta, indice) => (
          <li key={etiqueta} aria-current={paso === indice ? "step" : undefined} data-estado={paso > indice ? "hecho" : paso === indice ? "actual" : "pendiente"}>
            <b>{indice + 1}</b>
            <span>{etiqueta}</span>
          </li>
        ))}
      </ol>

      <h2 id="selector-titulo" className="selector-titulo" tabIndex={-1} ref={tituloRef}>
        {paso === 0 && "¿Qué quieres conseguir?"}
        {paso === 1 && "¿Qué tienes preparado?"}
        {paso === 2 && "¿Qué necesitas añadir?"}
        {paso === 3 && "Esto es lo que te recomendamos"}
      </h2>

      {/* Paso 1 */}
      {paso === 0 && (
        <fieldset className="selector-campo">
          <legend className="visually-hidden">¿Qué quieres conseguir?</legend>
          <div className="opciones">
            {OBJETIVOS.map((item) => (
              <div className="opcion" key={item.id}>
                <input
                  type="radio"
                  name="objetivo"
                  id={`objetivo-${item.id}`}
                  checked={objetivo === item.id}
                  onChange={() => elegirObjetivo(item.id)}
                />
                <label htmlFor={`objetivo-${item.id}`}>{item.etiqueta}</label>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      {/* Paso 2 */}
      {paso === 1 && (
        <fieldset className="selector-campo">
          <legend className="visually-hidden">¿Qué tienes preparado? Puedes marcar varias opciones.</legend>
          <p className="selector-ayuda">Puedes marcar varias. Sirve para saber desde dónde partimos.</p>
          <div className="opciones">
            {MATERIALES.map((item) => (
              <div className="opcion" key={item.id}>
                <input
                  type="checkbox"
                  id={`material-${item.id}`}
                  checked={materiales.includes(item.id)}
                  onChange={() => alternarMaterial(item.id)}
                />
                <label htmlFor={`material-${item.id}`}>{item.etiqueta}</label>
              </div>
            ))}
          </div>
          {faltaMaterial && (
            <p className="selector-nota">
              No pasa nada: podemos ayudarte a preparar textos e imágenes como extra. No lleva precio publicado, así que lo valoramos contigo antes de empezar.
            </p>
          )}
        </fieldset>
      )}

      {/* Paso 3 */}
      {paso === 2 && (
        <fieldset className="selector-campo">
          <legend className="visually-hidden">¿Qué necesitas añadir? Puedes marcar varias opciones.</legend>
          <p className="selector-ayuda">
            {personalizado
              ? "Marca lo que te interese. Como tu caso necesita presupuesto personalizado, los precios son de referencia."
              : "Solo lo que encaja con lo que has elegido. Puedes dejarlo vacío."}
          </p>
          <div className="opciones">
            {extrasDisponibles.map((extra) => (
              <div className="opcion opcion-extra" key={extra.id}>
                <input
                  type="checkbox"
                  id={`extra-${extra.id}`}
                  checked={extrasSel.includes(extra.id)}
                  onChange={() => alternarExtra(extra.id)}
                />
                <label htmlFor={`extra-${extra.id}`}>
                  <span>{extra.nombre}</span>
                  <b>{extra.precioEtiqueta}</b>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      {/* Resultado */}
      {paso === 3 && objetivoDef && (
        <div className="resultado">
          <article className="resultado-principal">
            <p className="section-label">Servicio recomendado</p>
            <h3>{paquete ? paquete.nombre : "Presupuesto personalizado"}</h3>
            <p className="resultado-porque">{objetivoDef.porque}</p>

            {paquete && (
              <>
                <p className="resultado-subtitulo">Lo que incluye</p>
                <ul className="resultado-incluye">
                  {desglosePaquete(paquete.id).map((parte) => {
                    const def = PAQUETES.find((p) => p.nombre === parte.nombre);
                    return def?.incluye.map((punto) => <li key={`${def.id}-${punto}`}>{punto}</li>);
                  })}
                </ul>
                {alternativa && (
                  <p className="resultado-nota">
                    Si además quieres el perfil de Instagram preparado, el pack <strong>{alternativa.nombre}</strong> ({alternativa.precioEtiqueta}) también encaja. Lo vemos contigo.
                  </p>
                )}
              </>
            )}
            {!paquete && (
              <p className="resultado-nota">
                No forzamos un importe: lo vemos contigo y te lo confirmamos por escrito antes de empezar.
              </p>
            )}
          </article>

          <article className="resultado-cuentas">
            <p className="section-label">Desglose</p>

            {paquete ? (
              <>
                <dl className="cuentas-lista">
                  {base.map((linea) => (
                    <div key={linea.nombre}>
                      <dt>{linea.nombre}</dt>
                      <dd>{eur(linea.importe)}</dd>
                    </div>
                  ))}
                  {unicos.map((extra) => (
                    <div key={extra.id}>
                      <dt>{extra.nombre}</dt>
                      <dd>{extra.precioEtiqueta}</dd>
                    </div>
                  ))}
                </dl>
                <p className="cuentas-total">
                  <span>Total orientativo</span>
                  <b>{eur(totalUnico)}</b>
                </p>
                <p className="cuentas-pie">Pago único, sin contar lo que quede por valorar.</p>
              </>
            ) : (
              <>
                {extrasElegidos.length > 0 && (
                  <dl className="cuentas-lista">
                    {extrasElegidos.map((extra) => (
                      <div key={extra.id}>
                        <dt>{extra.nombre}</dt>
                        <dd>{extra.precioEtiqueta}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="cuentas-total cuentas-total-abierto">
                  <span>Total</span>
                  <b>A valorar</b>
                </p>
                <p className="cuentas-pie">
                  {extrasElegidos.length > 0
                    ? "Los precios de arriba son de referencia y no suman un total: tu caso se presupuesta aparte."
                    : "Tu caso se presupuesta aparte."}
                </p>
              </>
            )}

            {recurrentes.length > 0 && (
              <div className="cuentas-bloque">
                <p className="cuentas-etiqueta">Costes recurrentes</p>
                <dl className="cuentas-lista">
                  {recurrentes.map((extra) => (
                    <div key={extra.id}>
                      <dt>{extra.nombre}</dt>
                      <dd>{extra.precioEtiqueta}</dd>
                    </div>
                  ))}
                </dl>
                <p className="cuentas-pie">Se paga cada mes y no está incluido en el total de arriba. La cuota exacta se confirma antes de empezar.</p>
              </div>
            )}

            {(sinPrecio.length > 0 || faltaMaterial) && (
              <div className="cuentas-bloque">
                <p className="cuentas-etiqueta">Pendiente de valorar</p>
                <dl className="cuentas-lista">
                  {sinPrecio.map((extra) => (
                    <div key={extra.id}>
                      <dt>{extra.nombre}</dt>
                      <dd>A valorar</dd>
                    </div>
                  ))}
                  {faltaMaterial && (
                    <div>
                      <dt>Preparación de materiales (textos, imágenes)</dt>
                      <dd>A valorar</dd>
                    </div>
                  )}
                </dl>
                <p className="cuentas-pie">Sin precio publicado: lo valoramos contigo.</p>
              </div>
            )}

            <p className="cuentas-aviso">
              El dominio se contrata y renueva aparte cada año. Siempre confirmamos el alcance y el precio final antes de empezar el proyecto.
            </p>
          </article>

          <div className="resultado-cambiar">
            <span>¿Quieres corregir algo?</span>
            {PASOS.map((etiqueta, indice) => (
              <button type="button" key={etiqueta} onClick={() => setPaso(indice)}>
                {etiqueta}
              </button>
            ))}
          </div>

          <article className="resultado-envio">
            <p className="section-label">Tu solicitud</p>
            <label htmlFor="resumen">Puedes editar este resumen antes de enviarlo.</label>
            <textarea
              id="resumen"
              rows={14}
              value={resumen}
              onChange={(evento) => {
                setResumen(evento.target.value);
                setResumenEditado(true);
              }}
            />
            <div className="resultado-acciones">
              <a
                className="button button-primary"
                href={enlaceCorreo}
                onClick={() => setAviso("Se ha abierto tu programa de correo con el resumen. Revísalo y envíalo tú desde ahí. Si no se ha abierto, copia el resumen y escríbenos.")}
              >
                Preparar correo <Arrow />
              </a>
              <button type="button" className="button button-line" onClick={copiarResumen}>
                Copiar resumen
              </button>
            </div>
            <p className="selector-ayuda">
              «Preparar correo» abre tu programa de correo con el mensaje escrito. El envío lo haces tú.
            </p>
            <p aria-live="polite" className="selector-aviso">{aviso}</p>
            <p className="selector-contacto">
              También puedes escribirnos directamente a <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> o por{" "}
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram</a>.
            </p>
          </article>
        </div>
      )}

      {/* Navegación */}
      {paso < 3 && (
        <div className="selector-nav">
          <button type="button" className="button button-line" onClick={() => setPaso((p) => p - 1)} disabled={paso === 0}>
            Volver
          </button>
          <button type="button" className="button button-primary" onClick={() => setPaso((p) => p + 1)} disabled={!puedeSeguir}>
            {paso === 2 ? "Ver recomendación" : "Continuar"} <Arrow />
          </button>
        </div>
      )}
      {paso === 0 && objetivo === null && (
        <p className="selector-ayuda selector-ayuda-nav">Elige una opción para continuar.</p>
      )}
      {paso === 3 && (
        <div className="selector-nav">
          <button type="button" className="button button-line" onClick={() => setPaso(2)}>
            Volver a los extras
          </button>
        </div>
      )}
    </section>
  );
}
