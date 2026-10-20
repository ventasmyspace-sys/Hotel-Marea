import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import Layout from '@/components/Layout';
import { GALLERY, IMAGES } from '@/data/site';

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);
  const [playing, setPlaying] = useState(false);

  return (
    <Layout>
      <section className="pt-28 pb-10 text-center">
        <p className="uppercase tracking-[0.3em] text-accent text-sm">Galería</p>
        <h1 className="font-display text-5xl sm:text-6xl mt-3">Fotos & Vídeo</h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto px-5">Un vistazo a los rincones que te esperan en Hotel Marea.</p>
      </section>

      {/* Video feature */}
      <section className="mx-auto max-w-[72rem] px-5 sm:px-8 mb-14">
        <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl bg-black">
          {playing ? (
            <video src="https://cdn.coverr.co/videos/coverr-waves-on-the-beach-1584/1080p.mp4" controls autoPlay className="h-full w-full object-cover"
              poster={IMAGES.pool} />
          ) : (
            <button onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full">
              <img src={IMAGES.pool} alt="Vídeo del hotel" className="h-full w-full object-cover" />
              <span className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 fill-current ml-1" />
                </span>
              </span>
              <span className="absolute bottom-5 left-6 text-white font-display text-2xl">Un paseo por Marea</span>
            </button>
          )}
        </div>
      </section>

      {/* Masonry photos */}
      <section className="mx-auto max-w-[90rem] px-5 sm:px-8 pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}
              onClick={() => setLightbox(g)}
              className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid">
              <img src={g.src} alt={g.label} className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${g.tall ? 'h-[420px]' : 'h-64'}`} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {g.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
            <button className="absolute top-5 right-5 text-white/80 hover:text-white" onClick={() => setLightbox(null)}><X className="h-8 w-8" /></button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={lightbox.src} alt={lightbox.label}
              className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
