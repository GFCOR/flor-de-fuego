import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  UtensilsCrossed,
  Car,
  Bike,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
} from "lucide-react";

import heroVideo from "@/assets/hero.mp4";
import logo from "@/assets/logo.png";
import logoMark from "@/assets/logo-mark.png";
import historiaPonciana from "@/assets/historia-ponciana.jpg";
import historiaFlor from "@/assets/historia-flor.jpg";
import menuImg from "@/assets/menu.jpg";

const galleryImages = import.meta.glob("./assets/gallery/**/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;
import { prefersReducedMotion, useParallax } from "@/hooks/use-motion";
import { Reveal } from "@/components/site/Reveal";
import { menu, rituals } from "@/data/menu";
import { supabase } from "@/lib/supabase";

const PHONE_DISPLAY = "912 762 505";
const PHONE_TEL = "+51912762505";
const ADDRESS = "Av. del Río 674, Pueblo Libre 15084, Lima";
const MAPS_DIR =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Flor de Fuego Cafe de Especialidad, Av. del Río 674, Pueblo Libre 15084, Lima");
const MAPS_PLACE = "https://maps.app.goo.gl/dtq4f1Evm3VTWEXw7";
const INSTAGRAM_URL = "https://www.instagram.com/cafeffuego/";
const INSTAGRAM_HANDLE = "@cafeffuego";
const FACEBOOK_URL = "https://web.facebook.com/profile.php?id=61563777173136";
const MENU_PDF = "/carta-flor-de-fuego.pdf";
// Actualizar junto con aggregateRating en index.html.
const RATING = "4.9";
const REVIEW_COUNT = 90;

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#historia", label: "Nosotros" },
  { href: "#carta", label: "Carta" },
  { href: "#metodos", label: "Cafés" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#detalles", label: "Detalles" },
  { href: "#visitanos", label: "Ubicación" },
];

// Reseñas reales, verificadas en Google Maps el 31/08/2026 y ampliadas el 22/09/2026
// (maps.app.goo.gl/dtq4f1Evm3VTWEXw7).
const REVIEWS = [
  {
    text: "Pedimos un Iced Cholo Café y un Cholo Pisquero, ambas bebidas tienen un buen equilibrio de sus ingredientes. El café que ofrecen es buenísimo y la hospitalidad de Miguel es buenísima, te invita a seguir disfrutando de los productos que…",
    author: "anaclaudia",
    source: "Reseña de Google",
  },
  {
    text: "El señor Miguel es un excelente anfitrión. Definitivamente volveré. El lugar es hermoso. Un buen libro y café: la combinación perfecta.",
    author: "Ailin Díaz",
    source: "Reseña de Google",
  },
  {
    text: "La atención que brinda el Sr. Miguel es inigualable, tiene mucha paciencia y excelente trato. Sus postres son riquísimos, pero destaca su queque de chocolate y plátano.",
    author: "Nicol Pastor",
    source: "Reseña de Google",
  },
  {
    text: "Buscando una cafetería en Pueblo Libre nos encontramos Flor de Fuego: una experiencia espectacular y deliciosa desde su café hasta su queque. Todo orgánico y con una atención exquisita.",
    author: "Winney Guarena",
    source: "Reseña de Google",
  },
  {
    text: "Una verdadera revelación ha sido conocer esta pequeña cafetería de especialidad en mi barrio. Miguel y su familia son unos apasionados por el café y el cacao peruano, y lo difunden con mucho amor a sus clientes.",
    author: "Víctor Sipión Suárez",
    source: "Reseña de Google",
  },
  {
    text: "Una buena experiencia para estar tranquila en calma disfrutando un buen café y la historia que nos cuenta el señor que nos atendió, nos iba narrando sobre el café que tomábamos.",
    author: "Ariatna Martinez",
    source: "Reseña de Google",
  },
  {
    text: "Llegamos por el pasaporte del café y nos gustó. La historia de los dueños muy bonita y los cafés ricos. El mocaccino delicioso. Buen sabor a café y cacao.",
    author: "Alejandro CamGius",
    source: "Reseña de Google",
  },
  {
    text: "Una maravilla conocer al propietario, una persona muy amable y atenta, nos dio una explicación de sus productos y de solo estar de paso... me quedé a comer un sándwich y beber matcha.",
    author: "Pamela Sanchez",
    source: "Reseña de Google",
  },
  {
    text: "Consumí un café de especialidad y un tostón, ambos estuvieron deliciosos. Me hizo recomendaciones y tuvo el detalle de explicarme los métodos disponibles. Ambiente pequeño pero bastante acogedor y familiar.",
    author: "Sari Denegri Flores",
    source: "Reseña de Google",
  },
  {
    text: "Muy buen servicio, el Cold Brew, media luna y empanada de pollo son buenazos.",
    author: "JOSE",
    source: "Reseña de Google",
  },
  {
    text: "Excelente servicio por parte del señor, nos supo explicar con detalle el tipo de café y el procedimiento en el preparado. La atención 10/10. Ambiente relajante y acogedor. Comida top.",
    author: "Keila Rios",
    source: "Reseña de Google",
  },
  {
    text: "Me encantó la cafetería! El ambiente es acogedor y relajante, perfecto para un día de estudio o para disfrutar de un café con amigos. El café es delicioso, definitivamente uno de los mejores que he probado en la zona.",
    author: "Jhonny Gutierrez",
    source: "Reseña de Google",
  },
  {
    text: "El café es muy muy bueno y la atención es insuperable. La presentación de sus productos, además, es muy prolija y atenta a los detalles. Vengo con mi familia con frecuencia. (Permiten el ingreso de mascotas)",
    author: "Carlos Carbajal",
    source: "Reseña de Google",
  },
  {
    text: "Muy buen ambiente, tranquilo, acogedor, la música muy agradable para disfrutar una buena conversación. El Señor Miguel tiene un trato muy amable, delicioso café y sus postres muy ricos. Probé el keke de plátano, delicioso.",
    author: "Rosalin Vidal",
    source: "Reseña de Google",
  },
  {
    text: "Excelente atención, café y postres deliciosos, además el ambiente es super tranquilo y acogedor. Definitivamente volveré seguido para seguir probando todas las variedades de bebidas de café.",
    author: "Elva Andrade Masias",
    source: "Reseña de Google",
  },
  {
    text: "El trato fue muy amable, me atendieron súper bien, te dan todo el tiempo que necesites para ver la carta. El keke y las empanadas muy frescas, bebidas ricas. Tienen wifi y muy buena música.",
    author: "Bayron Yacila Velasquez",
    source: "Reseña de Google",
  },
  {
    text: "Muy rico el café y los sándwiches que ofrecen. El señor que nos atendió fue muy amable. La torta de chocolate es de lo mejor, se siente el verdadero cacao. Definitivamente volvería.",
    author: "lionela Llallahui",
    source: "Reseña de Google",
  },
  {
    text: "Excelente lugar, muy recomendable. Si quieres disfrutar de un buen café no puedes dejar de visitarlo. Qué bueno encontrar lugares como este en Lima.",
    author: "Enrique AR",
    source: "Reseña de Google",
  },
  {
    text: "Café de especialidad en un lugar muy acogedor y con atención esmerada. Los alimentos están deliciosos y el café está disponible solo con métodos. ¡Súper recomendado!",
    author: "Claudia Davila",
    source: "Reseña de Google",
  },
  {
    text: "Un cálido y ameno lugar con excelente café y un muy bonito ambiente. Totalmente recomendable: si están en Pueblo Libre, es un lugar que deben visitar.",
    author: "Gonzalo Alarcón Almeyda",
    source: "Reseña de Google",
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Principal"
      className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#inicio" className="flex items-center">
          <img
            src={logo}
            alt="Flor de Fuego, café de especialidad"
            className="h-14 w-auto object-contain sm:h-16"
          />
        </a>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-cream/75 transition-colors hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={MAPS_DIR}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex"
        >
          <MapPin className="h-4 w-4" /> Cómo llegar
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cream md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
        </button>
      </div>

      {open && (
        <div id="menu-movil" className="border-t border-border/60 bg-background md:hidden">
          <ul className="flex flex-col px-6 py-4 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-cream/80 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={MAPS_DIR}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground"
              >
                <MapPin className="h-4 w-4" /> Cómo llegar
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const videoRef = useParallax<HTMLDivElement>(0.06);
  const glowRef = useParallax<HTMLDivElement>(0.17);
  const copyRef = useParallax<HTMLDivElement>(-0.04);

  return (
    <header id="inicio" className="relative min-h-[92svh] overflow-hidden">
      <div ref={videoRef} className="parallax-layer absolute inset-0 -top-[10%] h-[120%]">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.018_42/0.72)_0%,oklch(0.16_0.018_42/0.45)_38%,var(--background)_100%)]" />
      <div
        ref={glowRef}
        className="parallax-layer pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.58_0.192_33/0.4),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-28">
        <div ref={copyRef} className="parallax-layer max-w-3xl">
          <img
            src={logoMark}
            alt="Flor de Fuego, café de especialidad"
            className="mb-6 h-16 w-auto object-contain drop-shadow-[0_6px_24px_oklch(0.16_0.018_42/0.85)] sm:h-20"
          />
          <p className="mb-4 text-xs uppercase tracking-[0.42em] text-accent">
            Pueblo Libre · Lima
          </p>
          <h1 className="fire-text font-display text-[clamp(2.75rem,9vw,6rem)] leading-[0.92]">
            Flor de Fuego
          </h1>
          <h2 className="mt-2 font-display text-xl text-cream/85 sm:text-2xl">
            Café de especialidad en Pueblo Libre
          </h2>
          <p className="mt-5 max-w-xl text-lg text-cream/80 sm:text-xl">
            Café peruano, métodos artesanales y una pausa hecha para disfrutarse sin apuro. La
            vida mejora ligeramente después del primer sorbo.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#carta"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-ember)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Ver nuestra carta
            </a>
            <a
              href={MAPS_DIR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <MapPin className="h-4 w-4" /> Cómo llegar
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-cream/75">
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 hover:text-accent">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <a
              href={MAPS_PLACE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <Star className="h-4 w-4 fill-accent text-accent" /> {RATING} · {REVIEW_COUNT} opiniones en Google
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function About() {
  const imgRef = useParallax<HTMLImageElement>(0.08);

  return (
    <section id="historia" className="relative mx-auto max-w-6xl scroll-mt-16 px-6 py-24 sm:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_0.85fr]">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-primary">La historia</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Un lugar para hacer una pausa</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-6 space-y-5 text-cream/75">
              <p>
                Soy Miguel, ingeniero, y mi esposa Jessica es psicóloga. Aunque amamos nuestras
                profesiones, hace algunos años el café empezó a ocupar cada vez más espacio en
                nuestras vidas. Gota a gota nació la idea de crear un lugar donde compartir el café
                peruano de una forma cercana, sencilla y cálida.
              </p>
              <p>
                Preparamos nuestros cafés con métodos manuales y cafeteras artesanales porque
                creemos que el buen café también puede disfrutarse sin apuro y replicarse en casa.
              </p>
              <p>
                El nombre nació frente a nuestra propia puerta. Allí crece una ponciana que
                sembramos junto a nuestras hijas cuando eran pequeñas. Cada verano nos regala
                sombra, aves y una intensa floración rojiza. En algunos lugares de Centroamérica la
                llaman «Flor de Fuego». El nombre se quedó con nosotros… y hoy también es el símbolo
                de nuestra cafetería.
              </p>
              <p className="font-display text-xl text-accent">
                Gracias por hacer una pausa con nosotros.
              </p>
              <p className="text-sm uppercase tracking-[0.28em] text-cream/50">
                Flor de Fuego
                <br />
                Pueblo Libre, Lima
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4">
          <div className="relative overflow-hidden rounded-sm">
            <img
              ref={imgRef}
              src={historiaPonciana}
              alt="La ponciana en flor frente a la puerta de Flor de Fuego, en Pueblo Libre"
              width={1200}
              height={898}
              loading="lazy"
              className="parallax-layer h-56 w-full scale-110 object-cover sm:h-72"
            />
          </div>
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={historiaFlor}
              alt="Una flor de la ponciana, la Flor de Fuego que le da nombre a la cafetería"
              width={822}
              height={1096}
              loading="lazy"
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Bike, label: "Entrega a domicilio" },
    { icon: Car, label: "Pedidos desde el automóvil" },
    { icon: ShoppingBag, label: "Para llevar" },
    { icon: UtensilsCrossed, label: "Consumo en el lugar" },
  ];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, label }, i) => (
          <Reveal key={label} delay={i * 100}>
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm text-cream/80">{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const METODOS_GRUPOS = [
  { label: "Intensos y con cuerpo", match: (name: string) => name.includes("Prensa francesa") },
  { label: "Suaves y aromáticos", match: (name: string) => name.includes("V60") },
  { label: "A medio camino", match: (name: string) => name.includes("Aeropress") },
];

function MetodosDeCafe() {
  const metodos = menu.find((s) => s.title === "Métodos")?.items ?? [];

  return (
    <section id="metodos" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24 sm:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.42em] text-primary">Cómo lo preparamos</p>
        <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">Métodos de café</h2>
        <p className="mt-5 max-w-2xl text-cream/70">
          Cada método saca algo distinto del grano. Elige según lo que busques hoy.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {METODOS_GRUPOS.map((grupo, i) => {
          const items = metodos.filter((item) => grupo.match(item.name));
          if (items.length === 0) return null;
          return (
            <Reveal key={grupo.label} delay={i * 100}>
              <div className="h-full rounded-sm border border-border bg-card/40 p-7">
                <h3 className="text-lg text-accent">{grupo.label}</h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-cream/85">{item.name}</span>
                        {item.note && <p className="mt-1 text-sm text-cream/55">{item.note}</p>}
                      </div>
                      <span className="font-display text-accent whitespace-nowrap">S/ {item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

const DESTACADOS = menu.flatMap((section) =>
  section.items.filter((item) => item.star).map((item) => ({ ...item, categoria: section.title })),
);

function Destacados() {
  return (
    <div className="mt-16">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.42em] text-primary">Los más pedidos</p>
        <h3 className="mt-3 text-2xl sm:text-3xl">Carta destacada</h3>
      </Reveal>
      <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {DESTACADOS.map((item, i) => (
          <Reveal key={item.name} delay={i * 80}>
            <div className="flex items-baseline gap-3 border-b border-border pb-3">
              <div className="min-w-0">
                <p className="font-medium">
                  {item.name}
                  <span className="ml-2 inline-flex items-center gap-1 align-middle text-[0.65rem] uppercase tracking-widest text-accent">
                    <Star className="h-3 w-3 fill-accent" /> el más pedido
                  </span>
                </p>
                {item.note && <p className="mt-1 text-sm text-cream/55">{item.note}</p>}
              </div>
              <span className="mx-2 h-px flex-1 translate-y-[-3px] bg-border" />
              <span className="font-display text-base text-accent whitespace-nowrap">S/ {item.price}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Rituals() {
  const bgRef = useParallax<HTMLImageElement>(0.11);
  return (
    <section className="relative overflow-hidden">
      <img
        ref={bgRef}
        src={menuImg}
        alt="Mesa con cold brew, empanadas, keke de plátano, moka italiana y aeropress"
        width={1600}
        height={1008}
        loading="lazy"
        className="parallax-layer absolute inset-0 h-[125%] w-full -translate-y-[8%] object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background),oklch(0.16_0.018_42/0.75),var(--background))]" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-primary">El barista recomienda</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Pequeños rituales de la casa</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
          {rituals.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <article className="h-full bg-card/90 p-7 backdrop-blur-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl">{r.name}</h3>
                  <span className="font-display text-lg text-accent whitespace-nowrap">S/ {r.price}</span>
                </div>
                <p className="mt-3 text-sm text-cream/70">{r.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Menu() {
  return (
    <section id="carta" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24 sm:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.42em] text-primary">Nuestra carta</p>
        <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
          Café, cositas dulces y platos para aplacar el hambre
        </h2>
        <p className="mt-5 max-w-2xl text-cream/70">
          Usamos insumos saludables: café de especialidad, leche natural deslactosada, leche de
          coco, huevos de corral de gallinas libres, aceite de oliva, panela, harina de avena y
          frutas. Los cafés negros y con leche se preparan con moka italiana o aeropress.
        </p>
      </Reveal>

      <Destacados />

      <details className="group mt-16">
        <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-primary px-5 py-2 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
          <span className="group-open:hidden">Ver carta completa</span>
          <span className="hidden group-open:inline">Ocultar carta completa</span>
        </summary>

        <div className="mt-14 grid gap-x-14 gap-y-14 md:grid-cols-2">
          {menu.map((section, i) => (
            <Reveal key={section.title} delay={(i % 2) * 90}>
              <div>
                <div className="flex items-baseline gap-3 border-b border-border pb-3">
                  <h3 className="text-2xl">{section.title}</h3>
                  {section.subtitle && (
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {section.subtitle}
                    </span>
                  )}
                </div>
                <ul className="mt-5 space-y-4">
                  {section.items.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-3">
                      <div className="min-w-0">
                        <p className="font-medium">
                          {item.name}
                          {item.star && (
                            <span className="ml-2 inline-flex items-center gap-1 align-middle text-[0.65rem] uppercase tracking-widest text-accent">
                              <Star className="h-3 w-3 fill-accent" /> el más pedido
                            </span>
                          )}
                        </p>
                        {item.note && (
                          <p className="mt-1 text-sm text-cream/55">{item.note}</p>
                        )}
                      </div>
                      <span className="mx-2 h-px flex-1 translate-y-[-3px] bg-border" />
                      <span className="font-display text-base text-accent whitespace-nowrap">S/ {item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4 rounded-sm border border-border bg-card/50 p-6 text-sm text-cream/75">
          <p>
            Con café premium + S/ 3.00 · con café super premium + S/ 4.00. Pide a nuestros baristas
            el encarte de los cafés del mes.
          </p>
          <a
            href={MENU_PDF}
            download="Carta-Flor-de-Fuego.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Descargar carta (PDF)
          </a>
        </div>
      </details>
    </section>
  );
}

const DETALLES_DESTACADOS = [
  {
    title: "Aspectos destacados",
    items: [
      "Asientos en la terraza",
      "Buen café",
      "Deliciosos postres",
      "Música en vivo",
      "Muy buena selección de té",
      "Presentaciones en vivo",
    ],
  },
  {
    title: "Popular por",
    items: ["Desayuno", "Cena en solitario", "Un buen lugar para trabajar con una laptop"],
  },
];

const DETALLES_LISTA = [
  { title: "Qué ofrece", items: ["Aperitivos", "Bocadillos", "Café", "Platos orgánicos"] },
  {
    title: "Opciones del local",
    items: ["Desayunos", "Postres", "Espacio con asientos", "Servicio a la mesa"],
  },
  { title: "Servicios", items: ["Sanitario", "Sanitarios unisex", "Wi-Fi gratis"] },
  { title: "Ambiente", items: ["A la moda", "Agradable", "Relajado"] },
  { title: "Público usual", items: ["Grupos"] },
  { title: "Planificación", items: ["Se aceptan reservas"] },
  {
    title: "Pagos",
    items: ["Pagos móviles mediante NFC", "Tarjetas de crédito", "Tarjetas de débito"],
  },
  { title: "Mascotas", items: ["Se admiten perros en el interior"] },
];

function Detalles() {
  return (
    <section id="detalles" className="relative scroll-mt-16 overflow-hidden border-t border-border bg-card/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.58_0.192_33/0.35),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.79_0.13_74/0.25),transparent_65%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-primary">Detalles del local</p>
          <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">Razones de sobra para elegirnos</h2>
          <p className="mt-5 max-w-2xl text-cream/70">
            Lo que la gente destaca, lo que ofrecemos y todo lo que necesitas saber antes de venir.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-y border-border py-10 sm:grid-cols-2 sm:gap-16">
          {DETALLES_DESTACADOS.map(({ title, items }, i) => (
            <Reveal key={title} delay={i * 90}>
              <h3 className="font-display text-2xl text-cream sm:text-3xl">{title}</h3>
              <p className="mt-4 leading-relaxed text-cream/70">
                {items.map((item, idx) => (
                  <span key={item}>
                    {item}
                    {idx < items.length - 1 && <span className="text-primary"> · </span>}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={90}>
          <dl className="mt-4 grid sm:grid-cols-2 sm:gap-x-14">
            {DETALLES_LISTA.map(({ title, items }) => (
              <div
                key={title}
                className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <dt className="shrink-0 text-xs uppercase tracking-widest text-accent sm:w-40">
                  {title}
                </dt>
                <dd className="text-sm text-cream/70">{items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

const GALERIA = Object.keys(galleryImages)
  .sort()
  .map((path) => ({
    src: galleryImages[path],
    alt: "Foto de clientes y del local en Flor de Fuego Cafe de Especialidad",
  }));

function useGaleriaRemota() {
  const [fotos, setFotos] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("galeria")
      .select("url, alt")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setFotos(data.map((row) => ({ src: row.url, alt: row.alt })));
      });
  }, []);

  return fotos;
}

function GaleriaCarousel() {
  const remotas = useGaleriaRemota();
  const fotos = [...remotas, ...GALERIA];
  const tile = "h-64 w-64 shrink-0 rounded-sm object-cover sm:h-80 sm:w-80";

  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // El loop debe seguir corriendo también al arrastrar con el dedo en
  // mobile; solo se pausa con mouse (hover/drag de puntero real).
  const pause = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    clearTimeout(resumeTimer.current);
    setPaused(true);
  };
  const resumeSoon = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2500);
  };

  // El track está duplicado (fotos originales + copia) para el loop de la
  // animación CSS; al arrastrar manualmente hay que envolver el scroll en
  // ese mismo punto medio o el usuario llega al final real y ve fondo vacío.
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft <= 0) {
      el.scrollLeft += halfWidth;
    } else if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
    }
  };

  return (
    <div
      className="marquee-viewport marquee-scrollable"
      onPointerDown={pause}
      onPointerUp={resumeSoon}
      onPointerLeave={resumeSoon}
      onScroll={handleScroll}
    >
      <div
        className="marquee-track"
        style={{ animationDuration: "140s", animationPlayState: paused ? "paused" : "running" }}
      >
        {fotos.map(({ src, alt }, i) => (
          <img
            key={src}
            src={src}
            alt={alt}
            className={tile}
            width={320}
            height={320}
            loading={i < 4 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <div className="marquee-track-dup contents">
          {fotos.map(({ src, alt }) => (
            <img
              key={`dup-${src}`}
              src={src}
              alt=""
              aria-hidden="true"
              className={tile}
              width={320}
              height={320}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Galeria() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-primary">Galería</p>
          <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">Así se vive Flor de Fuego</h2>
        </Reveal>
        <div className="mt-12">
          <GaleriaCarousel />
        </div>
      </div>
    </section>
  );
}

const REVIEW_INTERVAL_MS = 8000;
const AVATAR_HUES = [28, 48, 62, 18, 75, 38, 55, 12];

function ReviewAvatar({ index, className = "" }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-display font-medium text-background ${className}`}
      style={{ backgroundColor: `oklch(0.79 0.12 ${AVATAR_HUES[index % AVATAR_HUES.length]})` }}
    >
      {REVIEWS[index].author.trim().charAt(0).toUpperCase()}
    </span>
  );
}

function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay] = useState(() => !prefersReducedMotion());
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);
  const lastWheel = useRef(0);
  const running = autoplay && !paused;
  const total = REVIEWS.length;

  const go = (next: number) => setIndex((next + total) % total);

  // El temporizador se reinicia en cada cambio (manual o automático) y al reanudar.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), REVIEW_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, running, total]);

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Opiniones de clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex items-center gap-5">
        <p className="font-display text-6xl leading-none text-foreground">{RATING}</p>
        <div>
          <div className="flex gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, star) => (
              <Star key={star} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">{REVIEW_COUNT} opiniones en Google</p>
        </div>
      </div>

      {/* Coverflow: la tarjeta activa al centro, las vecinas se alejan y se desenfocan */}
      <div
        tabIndex={0}
        aria-label="Desliza para ver más opiniones"
        className="review-stage relative mt-8 h-[22rem] cursor-grab select-none overflow-hidden rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(index - 1);
          if (e.key === "ArrowRight") go(index + 1);
        }}
        onWheel={(e) => {
          // Trackpad / rueda horizontal: un gesto = una tarjeta.
          if (Math.abs(e.deltaX) < 20 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
          const now = Date.now();
          if (now - lastWheel.current < 450) return;
          lastWheel.current = now;
          go(index + (e.deltaX > 0 ? 1 : -1));
        }}
        onPointerDown={(e) => {
          dragStartX.current = e.clientX;
          didDrag.current = false;
        }}
        onPointerUp={(e) => {
          if (dragStartX.current === null) return;
          const dx = e.clientX - dragStartX.current;
          dragStartX.current = null;
          if (Math.abs(dx) > 40) {
            didDrag.current = true;
            go(index + (dx < 0 ? 1 : -1));
          }
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {REVIEWS.map((review, i) => {
          let d = i - index;
          if (d > total / 2) d -= total;
          if (d < -total / 2) d += total;
          const dist = Math.abs(d);
          const active = d === 0;
          return (
            <figure
              key={review.author}
              aria-hidden={!active}
              onClick={() => !active && !didDrag.current && go(i)}
              className={`review-card absolute left-1/2 top-1/2 w-[min(22rem,80vw)] rounded-md border bg-card p-7 ${
                active
                  ? "border-accent shadow-[0_0_0_1px_var(--accent),0_8px_28px_-10px_color-mix(in_oklch,var(--primary)_65%,transparent)]"
                  : "cursor-pointer border-border"
              }`}
              style={{
                opacity: dist === 0 ? 1 : dist === 1 ? 0.6 : dist === 2 ? 0.25 : 0,
                visibility: dist <= 2 ? "visible" : "hidden",
                filter: active ? "none" : `blur(${dist * 1.2}px)`,
                zIndex: 10 - dist,
                transform: `translate(-50%, -50%) translateX(calc(${d} * min(28cqw, 260px))) translateZ(${-dist * 120}px) rotateY(${-d * 14}deg) scale(${active ? 1 : 0.88})`,
              }}
            >
              <div className="flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-cream/90">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
                <ReviewAvatar index={i} className="h-8 w-8 text-sm" />
                <span className="min-w-0 truncate">{review.author}</span>
              </figcaption>
            </figure>
          );
        })}
        <p className="sr-only" aria-live={paused ? "polite" : "off"}>
          Opinión de {REVIEWS[index].author}: {REVIEWS[index].text}
        </p>
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <section id="opiniones" className="scroll-mt-16 border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-primary">Lo que dicen</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Opiniones en Google</h2>
        </Reveal>

        <div className="mt-12">
          <ReviewsCarousel />
        </div>

        <a
          href={MAPS_PLACE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Ver las {REVIEW_COUNT} opiniones en Google
        </a>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visitanos" className="scroll-mt-16 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 sm:py-32">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.42em] text-primary">Visítanos</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Av. del Río 674</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 space-y-6">
              <a
                href={MAPS_DIR}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 transition-colors hover:text-accent"
              >
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>
                  {ADDRESS}
                  <span className="block text-sm text-muted-foreground">
                    Plus code WWGV+6J · Cómo llegar en Google Maps
                  </span>
                </span>
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-start gap-4 transition-colors hover:text-accent"
              >
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>
                  {PHONE_DISPLAY}
                  <span className="block text-sm text-muted-foreground">Toca para llamar</span>
                </span>
              </a>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p>Lunes a sábado: 8:30 a. m.–1:30 p. m. y 4:30–9:00 p. m.</p>
                  <p>Domingo: 5:00–9:00 p. m.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Puede variar por feriados —{" "}
                    <a
                      href={MAPS_PLACE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary underline-offset-4 hover:text-accent"
                    >
                      ver horario actualizado en Google Maps
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 transition-colors hover:text-accent"
                >
                  <Instagram className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    {INSTAGRAM_HANDLE}
                    <span className="block text-sm text-muted-foreground">Síguenos en Instagram</span>
                  </span>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 transition-colors hover:text-accent"
                >
                  <Facebook className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    Flor de Fuego
                    <span className="block text-sm text-muted-foreground">Síguenos en Facebook</span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="h-full overflow-hidden rounded-sm border border-border">
            <iframe
              title="Ubicación de Flor de Fuego en el mapa"
              src="https://www.google.com/maps?q=Av.%20del%20R%C3%ADo%20674,%20Pueblo%20Libre%2015084,%20Lima&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full grayscale-[0.35] contrast-[1.05] md:h-full md:min-h-[24rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// En mobile los CTAs del hero quedan atrás al hacer scroll; esta barra
// mantiene a mano las dos acciones que convierten (llamar / cómo llegar).
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border/60 bg-background/90 px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a
        href={`tel:${PHONE_TEL}`}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 py-3 text-sm font-semibold text-cream"
      >
        <Phone className="h-4 w-4" /> Llamar
      </a>
      <a
        href={MAPS_DIR}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
      >
        <MapPin className="h-4 w-4" /> Cómo llegar
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pb-20 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <img
            src={logo}
            alt="Flor de Fuego, café de especialidad"
            className="h-20 w-auto object-contain"
          />
          <p className="mt-4 text-sm text-muted-foreground">Pueblo Libre, Lima</p>
          <div className="mt-4 flex gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Flor de Fuego"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Flor de Fuego"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="space-y-2 text-sm sm:text-right">
          <a href={`tel:${PHONE_TEL}`} className="block hover:text-accent">
            {PHONE_DISPLAY}
          </a>
          <a
            href={MAPS_DIR}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-accent"
          >
            {ADDRESS}
          </a>
          <p className="text-muted-foreground">Tómalo con calma.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Services />
        <About />
        <MetodosDeCafe />
        <Menu />
        <Rituals />
        <Galeria />
        <Reviews />
        <Detalles />
        <Visit />
        <div className="border-t border-border bg-card/40 py-12">
          <div
            className="relative mx-auto max-w-[1200px] overflow-hidden rounded-sm"
            style={{ aspectRatio: "1200 / 636" }}
          >
            <img
              src="/og.jpg"
              alt="Flor de Fuego, café de especialidad en Pueblo Libre, Lima"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}

