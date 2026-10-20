export const HOTEL = {
  name: 'Hotel Marea',
  tagline: 'Un refugio mediterráneo frente al mar',
  bookingUrl: 'https://www.booking.com',
  tripadvisorUrl: 'https://www.tripadvisor.com',
  phone: '+34 951 234 567',
  email: 'reservas@hotelmarea.com',
  address: 'Paseo del Faro 12, Costa del Sol, España',
};

export const IMAGES = {
  hero: 'https://i.pinimg.com/736x/b6/e8/8f/b6e88f8ad1f8c79de9ba621302d055b5.jpg',
  suite: 'https://images.hostinger.com/580aee09-6451-473a-89dc-ded7b3c7f45b.png',
  pool: 'https://images.hostinger.com/675198ef-5d7f-4b8b-b393-9af6bd7325e3.png',
  restaurant: 'https://images.hostinger.com/f021f88a-c766-43b0-bbb9-cfed1a74a91d.png',
  spa: 'https://images.hostinger.com/24d94144-5c43-403d-85ad-354e5577d932.png',
  breakfast: 'https://images.hostinger.com/6c8be0e8-5ec8-4f06-8e06-ed032a5e7b6e.png',
  village: 'https://images.hostinger.com/fc339aa8-4fdd-4122-b4c8-9ff3054140aa.png',
  lobby: 'https://images.hostinger.com/e05ae700-1954-4ce5-9d18-b5e6b0c63e74.png',
  caroaje: 'https://i.pinimg.com/1200x/ab/bb/f3/abbbf394e39eb562f0e4a05d506f468e.jpg',
};

export const ROOMS = [
  { id: 'jardin', name: 'Habitación Jardín', desc: 'Vistas al jardín de olivos, cama king y terraza privada.', price: 120, img: IMAGES.suite, capacity: 2 },
  { id: 'mar', name: 'Suite Vista Mar', desc: 'Amplia suite con balcón panorámico sobre el Mediterráneo.', price: 210, img: IMAGES.pool, capacity: 3 },
  { id: 'faro', name: 'Ático del Faro', desc: 'Nuestra suite insignia con jacuzzi y azotea privada.', price: 340, img: IMAGES.lobby, capacity: 4 },
];

export const GALLERY = [
  { src: IMAGES.pool, label: 'Piscina infinita', tall: true },
  { src: IMAGES.restaurant, label: 'Terraza gastronómica' },
  { src: IMAGES.suite, label: 'Suites de lino' },
  { src: IMAGES.spa, label: 'Spa & bienestar', tall: true },
  { src: IMAGES.breakfast, label: 'Desayunos de autor' },
  { src: IMAGES.village, label: 'El pueblo' },
  { src: IMAGES.lobby, label: 'Recepción y lounge' },
  { src: IMAGES.hero, label: 'Atardecer frente al mar' },
  { src: IMAGES.caroaje, label: 'Caroaje del hotel', tall: true },
];

// Deterministic pseudo-availability so results are stable per date range.
export function checkAvailability(checkIn, checkOut) {
  if (!checkIn || !checkOut) return null;
  const inD = new Date(checkIn);
  const outD = new Date(checkOut);
  if (outD <= inD) return { error: 'La salida debe ser posterior a la entrada.' };
  const nights = Math.round((outD - inD) / 86400000);
  const seed = inD.getDate() + outD.getDate() + inD.getMonth();
  const available = ROOMS.filter((r, i) => (seed + i * 3) % 4 !== 0);
  return { nights, rooms: available };
}
