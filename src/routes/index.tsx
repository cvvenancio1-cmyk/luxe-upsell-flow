import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import comboMockup from "@/assets/combo-hook.webp.asset.json";
import comboMockupSm from "@/assets/combo-hook-sm.webp.asset.json";

const PAGE_URL = "https://luxe-upsell-flow.lovable.app/";

export const Route = createFileRoute("/")({
  component: UpsellPage,
  head: () => ({
    links: [
      { rel: "canonical", href: PAGE_URL },
      {
        rel: "preload",
        as: "image",
        href: comboMockupSm.url,
        imageSrcSet: `${comboMockupSm.url} 700w, ${comboMockup.url} 1100w`,
        imageSizes: "(max-width: 640px) 100vw, 672px",
        fetchPriority: "high",
      },
    ],
    meta: [{ property: "og:url", content: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Planificador de Menús Semanales + Guía de Sustituciones Inteligentes",
          description:
            "Planificador semanal, tabla de sustituciones inteligentes y plan de comida alto en proteínas de 7 días con 2 bonos internacionales.",
          image: comboMockup.url,
          brand: { "@type": "Brand", name: "Cocina Saludable" },
          offers: {
            "@type": "Offer",
            price: "9.90",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: PAGE_URL,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Cocina Saludable",
          url: PAGE_URL,
        }),
      },
    ],
  }),
});

function Check() {
  return (
    <svg
      className="mt-1 h-5 w-5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a3b955"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function UpsellPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top alert bar */}
      <div className="w-full border-b border-gold/30 bg-[#1a1a1a]">
        <p className="alert-blink px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gold sm:text-sm">
          ⚠️ ¡No cierres esta página! Tu pedido está casi listo…
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        {/* Confirmation */}
        <p className="text-center text-sm font-light text-platinum sm:text-base">
          ¡Felicidades! Tu acceso al{" "}
          <span className="font-semibold text-gold">Código de la Cocina Fitness</span>{" "}
          ya fue enviado a tu correo.
        </p>

        {/* Headline */}
        <div
          role="text"
          aria-label="¡Espera! No vayas a la cocina todavía"
          className="mt-8 text-center text-3xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="block text-white">🛑 ¡ESPERA!</span>
          <span className="mt-2 block gold-text-gradient">
            NO VAYAS A LA COCINA TODAVÍA…
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base font-light leading-relaxed text-platinum sm:text-lg">
          ¿Sabías que el{" "}
          <span className="font-semibold text-white">80% de las personas</span>{" "}
          que compran libros de cocina saludable fallan por falta de organización
          o por gastar una fortuna en el supermercado?
        </p>

        {/* Hook Visual */}
        <div className="mt-12">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gold/40 bg-[#0d0d0d] p-2 shadow-[0_30px_80px_-30px_rgba(212,175,55,0.4)]">

            <img
              src={comboMockupSm.url}
              srcSet={`${comboMockupSm.url} 700w, ${comboMockup.url} 1100w`}
              sizes="(max-width: 640px) 100vw, 672px"
              alt="Combo digital: Tablet, Celular y Libros del Planificador Semanal"
              width={1100}
              height={1100}
              fetchPriority="high"
              decoding="async"
              className="relative w-full rounded-xl"
            />
          </div>
        </div>

        {/* Main Offer Title */}
        <section className="mt-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Oferta Exclusiva de 1 Clic
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight text-white sm:text-5xl">
            Planificador de Menús Semanales
            <span className="mt-2 block italic gold-text-gradient">
              + Guía de Sustituciones Inteligentes
            </span>
            <span className="mt-2 block italic gold-text-gradient">
              + Plan de Comida Alto en Proteínas 7 Días / 1200 Calorías
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-platinum sm:text-lg">
            Tener 700 recetas es espectacular, pero con tanta variedad, el mayor
            peligro es quedar perdido sin saber qué cocinar cada lunes, o gastar
            demasiado dinero comprando ingredientes costosos. Por eso, solo en
            esta página y por única vez, puedes añadir a tu orden este sistema
            completo y te llevarás{" "}
            <span className="font-semibold text-gold">
              2 súper bonos internacionales completamente gratis
            </span>
            .
          </p>
        </section>

        {/* Main content list */}
        <section className="mt-12 space-y-5">
          <article className="rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <div className="flex gap-4">
              <Check />
              <div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  📅 El Planificador Semanal{" "}
                  <span className="text-gold">(18 páginas)</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Diseñado para organizar tus menús de lunes a domingo, registrar
                  tus hábitos, nivel de estrés, hinchazón y tener el control total
                  sin pensar qué comer mañana.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <div className="flex gap-4">
              <Check />
              <div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  🛒 La Tabla de Sustituciones Inteligentes
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  El secreto para cambiar harinas costosas (como la de almendras)
                  por opciones súper económicas de tu supermercado local,
                  ahorrando hasta un{" "}
                  <span className="font-semibold text-gold">60%</span> sin perder
                  sabor.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <div className="flex gap-4">
              <Check />
              <div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  🍽️ Plan de Comida Alto en Proteínas{" "}
                  <span className="text-gold">(7 Días / 1200 Calorías)</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Un plan alimenticio estructurado de 7 días diseñado para
                  maximizar el consumo de proteínas y favorecer la pérdida de
                  peso saludable. Con solo 1200 calorías diarias, cada comida
                  está cuidadosamente equilibrada para nutrir el cuerpo,
                  preservar la masa muscular y mantener la saciedad a lo largo
                  del día.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Bonuses */}
        <section className="mt-14">
          <div className="text-center">
            <span className="inline-block rounded-full border border-gold/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              Bonos Incluidos Hoy
            </span>
            <h3 className="mt-4 font-display text-3xl italic text-white sm:text-4xl">
              Tus 2 regalos exclusivos
            </h3>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="bonus-card rounded-2xl p-6 sm:p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-gold">
                🎁 Bono 1 · Gratis
              </div>
              <h4 className="mt-3 font-display text-2xl leading-tight text-white">
                365 Recetas del Mundo
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-platinum/80">
                Un mapa gastronómico para que disfrutes de un plato internacional
                saludable cada día del año.
              </p>
            </div>

            <div className="bonus-card rounded-2xl p-6 sm:p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-gold">
                🎁 Bono 2 · Gratis
              </div>
              <h4 className="mt-3 font-display text-2xl leading-tight text-white">
                200 Italia a la Mesa
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-platinum/80">
                Los secretos de la cocina italiana adaptados para comer pasta,
                pizzas y focaccias deliciosas sin romper tu dieta.
              </p>
            </div>
          </div>
        </section>

        {/* Price anchor */}
        <section className="mt-16 text-center">
          <p className="text-base font-light text-platinum sm:text-lg">
            Este combo completo está valorado en más de{" "}
            <span className="font-semibold text-white/60 line-through decoration-red-500/70 decoration-2">
              $67 USD
            </span>
            , pero hoy te llevas todo por solo:
          </p>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-gold">
              🔥 Pago único
            </p>
            <p className="mt-2 font-display text-7xl font-bold sm:text-8xl">
              <span className="gold-text-gradient">$9.90</span>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10">
          <button
            type="button"
            className="cta-glow group relative block w-full overflow-hidden rounded-full bg-gradient-gold px-6 py-6 text-center shadow-[0_20px_60px_-15px_rgba(212,175,55,0.6)] transition-transform duration-200 hover:scale-[1.015] active:scale-[0.99] sm:px-8 sm:py-7"
          >
            <span className="block text-lg font-extrabold uppercase leading-tight tracking-wide text-[#0a0a0a] sm:text-2xl">
              ¡SÍ! QUIERO EL PLANIFICADOR, LA TABLA DE SUSTITUCIONES INTELIGENTES, EL PLAN DE COMIDA ALTO EN PROTEÍNAS (7 DÍAS / 1200 CALORÍAS) Y MIS BONOS
            </span>
            <span className="mt-2 block text-xs font-medium text-[#0a0a0a]/80 sm:text-sm">
              Añadir a mi orden con 1 solo clic por $9.90
            </span>
          </button>

          <div className="mt-12 text-center">
            <a
              href="#decline"
              className="text-xs font-light tracking-wide text-muted-foreground/80 underline decoration-muted-foreground/40 underline-offset-[6px] transition-colors hover:text-platinum"
            >
              No, gracias. Prefiero continuar con mi pedido actual.
            </a>
          </div>
        </section>


        <footer className="mt-16 border-t border-white/5 pt-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Compra 100% Segura · Acceso Inmediato
          </p>
        </footer>
      </div>
    </main>
  );
}
