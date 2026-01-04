# Guía para Obtener Imágenes de Cloudinary

Esta guía explica las diferentes formas de obtener y usar imágenes de Cloudinary en tu aplicación.

## Configuración Requerida

Asegúrate de tener estas variables de entorno configuradas en tu archivo `.env.local`:

```env
# Variables públicas (visibles en el cliente)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
NEXT_PUBLIC_TEMPORAL_UPLOAD_PHOTOS_PASS=tu_contraseña

# Variables privadas (solo en el servidor)
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## Métodos para Obtener Imágenes

### 1. Desde el Callback de Subida (Ya Implementado)

Cuando subes una imagen usando `CldUploadWidget`, el callback `onSuccess` te proporciona la información de la imagen:

```typescript
onSuccess={(result) => {
  const info = result.info as any;
  if (info) {
    console.log("URL completa:", info.secure_url);
    console.log("Public ID:", info.public_id);
    // Puedes guardar esta información en una base de datos
  }
}}
```

**Ventajas:**
- Obtienes la información inmediatamente después de subir
- No necesitas hacer una llamada adicional a la API

**Desventajas:**
- Solo obtienes las imágenes que acabas de subir
- No puedes recuperar imágenes subidas anteriormente

### 2. Usando la API Route (Recomendado para Listar Todas las Imágenes)

He creado una API route en `/app/api/cloudinary-images/route.ts` que te permite obtener todas las imágenes de Cloudinary.

#### Uso Básico:

```typescript
import { getCloudinaryImages } from "@/lib/cloudinary";

// Obtener todas las imágenes
const data = await getCloudinaryImages();

// Obtener imágenes de una carpeta específica
const data = await getCloudinaryImages("wedding/uploads", 50);

console.log(data.images); // Array de imágenes
console.log(data.total); // Número total
```

#### Ejemplo en un Componente:

```typescript
"use client";

import { useEffect, useState } from "react";
import { getCloudinaryImages } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";

export default function MyGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadImages() {
      const data = await getCloudinaryImages("wedding/uploads");
      setImages(data.images);
    }
    loadImages();
  }, []);

  return (
    <div>
      {images.map((image) => (
        <CldImage
          key={image.publicId}
          src={image.publicId}
          width={300}
          height={300}
          alt="Foto"
        />
      ))}
    </div>
  );
}
```

### 3. Usando CldImage Directamente

Si conoces el `public_id` de una imagen, puedes usarla directamente:

```typescript
import { CldImage } from "next-cloudinary";

<CldImage
  src="wedding/uploads/plnf2i6dgz3cbvkqnqcx"
  width={600}
  height={600}
  alt="Foto de la boda"
/>
```

### 4. Usando URLs Directas

También puedes usar las URLs directamente con el componente `Image` de Next.js:

```typescript
import Image from "next/image";

<Image
  src="https://res.cloudinary.com/tu_cloud_name/image/upload/v1234567890/wedding/uploads/imagen.jpg"
  width={600}
  height={600}
  alt="Foto"
/>
```

## Estructura de Datos

Cuando obtienes imágenes usando `getCloudinaryImages()`, recibes objetos con esta estructura:

```typescript
{
  publicId: "wedding/uploads/plnf2i6dgz3cbvkqnqcx",
  secureUrl: "https://res.cloudinary.com/...",
  url: "http://res.cloudinary.com/...",
  width: 1920,
  height: 1080,
  format: "jpg",
  bytes: 245678,
  createdAt: "2024-01-15T10:30:00Z"
}
```

## Funciones Útiles

### `getCloudinaryUrl()` - Generar URLs Optimizadas

```typescript
import { getCloudinaryUrl } from "@/lib/cloudinary";

// URL básica
const url = getCloudinaryUrl("wedding/uploads/imagen");

// URL con transformaciones
const optimizedUrl = getCloudinaryUrl("wedding/uploads/imagen", {
  width: 800,
  height: 600,
  crop: "fill",
  quality: 80,
  format: "webp"
});
```

## Ejemplo Completo: Galería de Fotos Subidas

Revisa el archivo `components/cloudinary-gallery-example.tsx` para ver un ejemplo completo de cómo crear una galería con todas las imágenes subidas.

## Notas Importantes

1. **Seguridad**: Las credenciales `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET` deben estar solo en variables de entorno del servidor, nunca en el cliente.

2. **Límites**: La API de Cloudinary tiene límites de rate. Por defecto, la función obtiene máximo 50 imágenes. Puedes ajustar este número.

3. **Carpetas**: Si organizas tus imágenes en carpetas en Cloudinary, puedes filtrar por carpeta usando el parámetro `folder`.

4. **Optimización**: Usa `CldImage` en lugar de `Image` con URLs directas cuando sea posible, ya que ofrece mejor optimización automática.

## Próximos Pasos

- Considera guardar las URLs de las imágenes en una base de datos para acceso más rápido
- Implementa paginación si tienes muchas imágenes
- Agrega filtros y búsqueda según tus necesidades

