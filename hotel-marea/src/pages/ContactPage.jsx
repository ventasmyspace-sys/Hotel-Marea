import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { HOTEL } from '@/data/site';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta de ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nDe: ${form.name} (${form.email})`);
    window.location.href = `mailto:${HOTEL.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Layout>
      <section className="pt-28 pb-10 text-center">
        <p className="uppercase tracking-[0.3em] text-accent text-sm">Estamos para ayudarte</p>
        <h1 className="font-display text-5xl sm:text-6xl mt-3">Contacto</h1>
      </section>

      <section className="mx-auto max-w-[72rem] px-5 sm:px-8 pb-16 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: Phone, label: 'Teléfono', value: HOTEL.phone, href: `tel:${HOTEL.phone.replace(/\s/g, '')}` },
            { icon: Mail, label: 'Email', value: HOTEL.email, href: `mailto:${HOTEL.email}` },
            { icon: MapPin, label: 'Dirección', value: HOTEL.address },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent"><c.icon className="h-5 w-5" /></span>
              <div>
                <p className="text-sm text-muted-foreground">{c.label}</p>
                {c.href ? <a href={c.href} className="font-medium hover:text-accent transition">{c.value}</a> : <p className="font-medium">{c.value}</p>}
              </div>
            </div>
          ))}
          <div className="rounded-2xl overflow-hidden border border-border h-64">
            <iframe title="Mapa" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-4.55%2C36.5%2C-4.4%2C36.56&layer=mapnik&marker=36.53%2C-4.47" />
          </div>
          <div className="flex gap-3">
            <a href={HOTEL.bookingUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm hover:brightness-110 transition">Booking <ArrowUpRight className="h-4 w-4" /></a>
            <a href={HOTEL.tripadvisorUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-3 text-sm hover:bg-secondary transition">TripAdvisor <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-card border border-border p-7 shadow-sm">
          <h2 className="font-display text-3xl">Escríbenos</h2>
          {sent ? (
            <div className="mt-8 flex flex-col items-center text-center gap-3 py-8">
              <CheckCircle2 className="h-14 w-14 text-accent" />
              <p className="font-display text-2xl">¡Gracias!</p>
              <p className="text-muted-foreground text-sm">Hemos abierto tu correo para enviar el mensaje. Te responderemos muy pronto.</p>
              <button onClick={() => setSent(false)} className="mt-2 text-sm text-accent hover:underline">Enviar otro mensaje</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted-foreground">Nombre</span>
                <input required value={form.name} onChange={upd('name')} className="rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted-foreground">Email</span>
                <input required type="email" value={form.email} onChange={upd('email')} className="rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted-foreground">Mensaje</span>
                <textarea required rows={5} value={form.message} onChange={upd('message')} className="rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </label>
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent text-accent-foreground px-4 py-3 font-medium hover:brightness-95 active:scale-[0.99] transition">
                Enviar mensaje <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </Layout>
  );
}
