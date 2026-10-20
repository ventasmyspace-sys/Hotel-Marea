import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import AvailabilityChecker from '@/components/AvailabilityChecker';
import { HOTEL, IMAGES, ROOMS } from '@/data/site';

const strip = ['Vista al mar', 'Spa & bienestar', 'Gastronomía local', 'Piscina', 'Reserva directa', 
  'Atencion personalizada', 'Terraza panorámica', 'Boutique hotel', 'Escapada romántica', 'Costa del Sol', 
  'Desconexión total', 'Experiencias únicas'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-end">
        <img src={IMAGES.hero} alt="Vista del hotel al atardecer" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />
        <div className="relative mx-auto max-w-[90rem] w-full px-5 sm:px-8 pb-16 pt-32 text-white">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="uppercase tracking-[0.3em] text-accent text-sm">
            Costa del Sol · España
          </motion.p>
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] mt-4 max-w-4xl">
            Donde el mar <span className="italic">se encuentra</span> con la calma
          </motion.h1>
          <motion.p initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.15 }} className="mt-5 max-w-xl text-lg text-white/85">
            {HOTEL.tagline}. Un hotel boutique de 24 habitaciones pensado para desconectar.
          </motion.p>
        </div>
      </section>

      {/* Moving strip */}
      <div className="bg-accent text-accent-foreground overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...strip, ...strip].map((t, i) => (
            <span key={i} className="mx-8 font-display text-xl tracking-wide">{t} <span className="mx-8">✦</span></span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <section id="reservar" className="mx-auto max-w-[72rem] px-5 sm:px-8 -mt-4 relative z-10 pt-16 pb-8 scroll-mt-24">
        <div className="mb-8 text-center">
          <p className="uppercase tracking-widest text-accent text-sm">Reserva tu escapada</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-2">Comprueba fechas al instante</h2>
        </div>
        <AvailabilityChecker />
      </section>

      {/* Intro split */}
      <section className="mx-auto max-w-[90rem] px-5 sm:px-8 py-20 grid gap-10 lg:grid-cols-2 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <p className="uppercase tracking-widest text-accent text-sm">Bienvenido</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 leading-tight">
            Un <span className="hand-underline">refugio íntimo</span> sobre acantilados dorados
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            En {HOTEL.name} cada rincón está diseñado para que el tiempo se detenga: terrazas de lino, aromas de olivar y el sonido constante del Mediterráneo.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" /> {HOTEL.address}
          </div>
          <Link to="/nosotros" className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition">
            Conócenos <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <img src={IMAGES.restaurant} alt="Terraza del restaurante" className="rounded-3xl object-cover w-full h-[440px] shadow-xl" />
          <div className="absolute -bottom-6 -left-6 hidden sm:flex flex-col rounded-2xl bg-card shadow-lg border border-border px-6 py-4 animate-floaty">
            <span className="flex text-accent">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>
            <span className="text-sm mt-1 text-muted-foreground">4.9 · +1.200 reseñas</span>
          </div>
        </motion.div>
      </section>

      {/* Rooms */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="uppercase tracking-widest text-accent text-sm">Nuestras estancias</p>
              <h2 className="font-display text-4xl sm:text-5xl mt-2">Habitaciones & Suites</h2>
            </div>
            <a href="#reservar" className="text-sm text-primary hover:text-accent transition">Ver disponibilidad →</a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {ROOMS.map((r, i) => (
              <motion.article key={r.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="group rounded-3xl bg-card overflow-hidden border border-border shadow-sm hover:shadow-xl transition-shadow">
                <div className="overflow-hidden">
                  <img src={r.img} alt={r.name} className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl">{r.name}</h3>
                    <span className="text-accent font-medium">€{r.price}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Advertising / promo insertion area */}
      <section className="mx-auto max-w-[90rem] px-5 sm:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 relative overflow-hidden rounded-3xl">
            <img src={IMAGES.spa} alt="Oferta spa" className="h-full w-full object-cover min-h-[260px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-primary/20 flex flex-col justify-center p-8 text-primary-foreground">
              <span className="text-xs uppercase tracking-widest text-accent">Espacio publicitario</span>
              <h3 className="font-display text-3xl sm:text-4xl mt-2 max-w-md">Escapada Spa & Cena · 2 noches desde €290</h3>
              <a href="#reservar" className="mt-5 self-start rounded-full bg-accent px-6 py-3 text-accent-foreground font-medium hover:brightness-95 transition">Aprovechar oferta</a>
            </div>
          </div>
          <div className="rounded-3xl border-2 border-dashed border-border bg-secondary/40 flex flex-col items-center justify-center text-center p-8 min-h-[260px]">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Publicidad</span>
            <p className="font-display text-2xl mt-2">Tu marca aquí</p>
            <p className="text-sm text-muted-foreground mt-2">Espacio disponible para anunciantes y colaboradores locales.</p>
            <a href="/contacto" className="mt-4 text-sm text-accent hover:underline">Solicitar información</a>
          </div>
        </div>
      </section>

      {/* External links */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-[72rem] px-5 sm:px-8 text-center">
          <p className="uppercase tracking-widest text-accent text-sm">Reserva y opiniones</p>
          <h2 className="font-display text-4xl mt-2">Estamos en tus plataformas favoritas</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={HOTEL.bookingUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 font-medium hover:brightness-95 transition">
              Reservar en Booking.com <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={HOTEL.tripadvisorUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-7 py-3.5 font-medium hover:bg-white/20 transition">
              Ver en TripAdvisor <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
