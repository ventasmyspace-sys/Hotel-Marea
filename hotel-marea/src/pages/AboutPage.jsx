import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Waves, UtensilsCrossed, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import { HOTEL, IMAGES } from '@/data/site';

const values = [
  { icon: Waves, title: 'Frente al mar', text: 'Ubicado sobre acantilados con acceso directo a cala privada.' },
  { icon: Leaf, title: 'Sostenible', text: 'Energía renovable, huerto propio y productos de km 0.' },
  { icon: UtensilsCrossed, title: 'Gastronomía', text: 'Cocina mediterránea de autor con ingredientes de temporada.' },
  { icon: Sparkles, title: 'Bienestar', text: 'Spa, yoga al amanecer y tratamientos con aceite de oliva.' },
];

export default function AboutPage() {
  return (
    <Layout>
      <section className="relative h-[52vh] min-h-[360px] flex items-center justify-center text-center text-white">
        <img src={IMAGES.village} alt="El pueblo" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative px-5">
          <p className="uppercase tracking-[0.3em] text-accent text-sm">Nuestra historia</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3">Sobre Nosotros</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[72rem] px-5 sm:px-8 py-20 grid gap-12 lg:grid-cols-2 items-center">
        <motion.img initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          src={IMAGES.lobby} alt="Lounge del hotel" className="rounded-3xl object-cover w-full h-[420px] shadow-xl" />
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-4xl leading-tight">Tres generaciones cuidando cada detalle</h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            {HOTEL.name} nació en 1978 como una casa familiar frente al Mediterráneo. Hoy es un hotel boutique de 24 habitaciones que conserva el alma de aquella casa: hospitalidad genuina, luz cálida y el aroma del mar.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Nuestro equipo local conoce cada cala, cada mirador y cada mercado de la zona para que tu estancia sea auténtica y memorable.
          </p>
        </motion.div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
          <h2 className="font-display text-4xl text-center">Lo que nos define</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-3xl bg-card border border-border p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl mt-4">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[72rem] px-5 sm:px-8 py-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[['1978', 'Año de fundación'], ['24', 'Habitaciones'], ['4.9', 'Valoración media'], ['30m', 'Del mar']].map(([n, l]) => (
          <div key={l}>
            <p className="font-display text-5xl text-accent">{n}</p>
            <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wide">{l}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
