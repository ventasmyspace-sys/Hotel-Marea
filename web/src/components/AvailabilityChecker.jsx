import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, ArrowUpRight, Search, XCircle } from 'lucide-react';
import { checkAvailability, HOTEL } from '@/data/site';

const today = new Date().toISOString().split('T')[0];

export default function AvailabilityChecker() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [result, setResult] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setResult(checkAvailability(checkIn, checkOut));
  };

  const goBooking = (room) => {
    const url = new URL(HOTEL.bookingUrl + '/searchresults.html');
    if (checkIn) url.searchParams.set('checkin', checkIn);
    if (checkOut) url.searchParams.set('checkout', checkOut);
    url.searchParams.set('group_adults', String(guests));
    url.searchParams.set('ss', `${HOTEL.name} ${room?.name || ''}`.trim());
    window.open(url.toString(), '_blank', 'noreferrer');
  };

  return (
    <div className="rounded-3xl bg-card shadow-xl shadow-primary/10 border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground px-6 py-5 flex items-center gap-3">
        <CalendarCheck className="h-5 w-5 text-accent" />
        <h3 className="font-display text-2xl">Consulta disponibilidad</h3>
      </div>
      <form onSubmit={onSubmit} className="p-6 grid gap-4 sm:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Entrada</span>
          <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required
            className="rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Salida</span>
          <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required
            className="rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-muted-foreground">Huéspedes</span>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
            className="rounded-lg border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring">
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'huésped' : 'huéspedes'}</option>)}
          </select>
        </label>
        <button type="submit"
          className="self-end rounded-lg bg-accent text-accent-foreground px-4 py-2.5 font-medium flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition">
          <Search className="h-4 w-4" /> Consultar
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={JSON.stringify(result)}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6"
          >
            {result.error && (
              <p className="flex items-center gap-2 text-destructive text-sm"><XCircle className="h-4 w-4" /> {result.error}</p>
            )}
            {!result.error && result.rooms.length === 0 && (
              <div className="rounded-xl bg-secondary p-5 text-center">
                <p className="font-medium">No hay habitaciones disponibles para esas fechas.</p>
                <p className="text-sm text-muted-foreground mt-1">Prueba con otras fechas o consulta directamente en Booking.</p>
              </div>
            )}
            {!result.error && result.rooms.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  {result.rooms.length} tipo(s) disponibles para {result.nights} noche(s):
                </p>
                <div className="space-y-3">
                  {result.rooms.map((r) => (
                    <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border p-3">
                      <img src={r.img} alt={r.name} className="h-16 w-20 rounded-lg object-cover" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{r.name}</p>
                        <p className="text-sm text-muted-foreground">Desde €{r.price} / noche · hasta {r.capacity} pers.</p>
                      </div>
                      <button onClick={() => goBooking(r)}
                        className="shrink-0 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm flex items-center gap-1 hover:brightness-110 active:scale-[0.98] transition">
                        Reservar <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
