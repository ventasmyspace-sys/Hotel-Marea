# Hotel Marea

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Instalación y desarrollo

Desde la raíz del proyecto:

```sh
npm run setup
npm run dev
```

Abre http://localhost:3000.

## Compilación de prueba

```sh
npm run build
```

Los archivos compilados se generan en `hotel-marea/dist`. Para probar esa compilación localmente:

```sh
npm run start
```

El sitio de prueba queda disponible en http://localhost:3000.

## Despliegue en Vercel

Configura **Root Directory** como `hotel-marea`. Vercel instalará las dependencias y ejecutará el build de Vite desde esa carpeta; la salida está en `dist`.

Para revisar el código con ESLint:

```sh
npm run lint
```
