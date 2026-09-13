import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactBand, PageHero, PageShell } from "../components";
import { Selector } from "../selector";

export const metadata: Metadata = {
  title: "Encuentra la web que necesita tu negocio | CodeCraft",
  description: "Tres preguntas cortas para saber qué servicio de CodeCraft encaja con tu proyecto y preparar una solicitud de presupuesto orientativa.",
};

export default function PrepararProyecto() {
  return (
    <PageShell>
      <PageHero
        number="06"
        label="Preparar proyecto"
        description="Tres preguntas cortas. Al final verás una recomendación con precios orientativos y podrás enviárnosla. No hace falta registrarse ni dejar ningún dato."
      >
        Encuentra la web que<br /><em>necesita tu negocio.</em>
      </PageHero>
      <Suspense fallback={<div className="selector" aria-hidden="true" />}>
        <Selector />
      </Suspense>
      <ContactBand />
    </PageShell>
  );
}
