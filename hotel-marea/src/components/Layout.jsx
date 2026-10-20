import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { HOTEL } from '@/data/site';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Sobre Nosotros' },
  { to: '/galeria', label: 'Galería' },
  { to: '/contacto', label: 'Contacto' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || !overHero || open;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? 'bg-background/95 backdrop-blur border-b border-border' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 flex items-center justify-between h-[72px]">
        <Link to="/" className={`font-display text-2xl tracking-wide ${solid ? 'text-primary' : 'text-white'}`}>
          {HOTEL.name}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : solid ? 'text-foreground/80' : 'text-white/90'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href="#reservar"
            onClick={(e) => {
              if (pathname === '/') { e.preventDefault(); document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' }); }
            }}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:brightness-95 active:scale-[0.98] transition"
          >
            Reservar
          </a>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menú">
          {open ? <X className={solid ? 'text-foreground' : 'text-white'} /> : <Menu className={solid ? 'text-foreground' : 'text-white'} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-foreground/85">
              {l.label}
            </NavLink>
          ))}
          <Link to="/#reservar" onClick={() => setOpen(false)} className="rounded-full bg-accent px-5 py-3 text-center text-accent-foreground font-medium">
            Reservar
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl">{HOTEL.name}</h3>
          <p className="mt-3 max-w-sm text-primary-foreground/70">{HOTEL.tagline}. Reserva directa con la mejor tarifa garantizada.</p>
          <div className="mt-5 flex gap-3">
            <a href={HOTEL.bookingUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm transition">Booking.com</a>
            <a href={HOTEL.tripadvisorUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm transition">TripAdvisor</a>
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-accent">Contacto</p>
          <ul className="mt-4 space-y-2 text-primary-foreground/75 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {HOTEL.phone}</li>
            <li>{HOTEL.email}</li>
            <li>{HOTEL.address}</li>
          </ul>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-accent">Explorar</p>
          <ul className="mt-4 space-y-2 text-primary-foreground/75 text-sm">
            {links.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-white transition">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} {HOTEL.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
