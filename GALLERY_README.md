# Galería de Cursos - TECNIFORMACIÓN S.A.S

## Descripción

La galería moderna permite mostrar visualmente los cursos y actividades de TECNIFORMACIÓN S.A.S con una interfaz elegante y funcional.

## Características

### 🖼️ Galería Moderna
- **Grid Responsivo**: Se adapta automáticamente a diferentes tamaños de pantalla
- **Efectos Hover**: Animaciones suaves al pasar el mouse sobre las imágenes
- **Lightbox**: Visualización en pantalla completa con navegación
- **Filtros por Categoría**: Filtrado por áreas de formación
- **Lazy Loading**: Carga optimizada de imágenes

### 🎯 Navegación por Scroll
- **Navegación Suave**: Recorre todas las secciones de la página en orden
- **Indicador Visual**: Muestra la sección actual y progreso
- **Controles Intuitivos**: Botones para navegar entre secciones
- **Teclado**: Navegación con flechas y Escape

## Cómo Agregar Imágenes

### 1. Preparar las Imágenes
- **Formato**: JPG, PNG, WebP
- **Tamaño Recomendado**: 800x800px (cuadrado) o 1200x800px (rectangular)
- **Peso**: Máximo 500KB por imagen para optimizar la carga
- **Calidad**: Alta calidad pero optimizadas para web

### 2. Colocar las Imágenes
```bash
# Crear el directorio si no existe
mkdir -p assets/gallery

# Copiar las imágenes al directorio
cp tu-imagen.jpg assets/gallery/course-1.jpg
cp otra-imagen.jpg assets/gallery/course-2.jpg
# ... etc
```

### 3. Actualizar los Datos
Editar el archivo `constants.ts` y agregar/modificar las imágenes en `GALLERY_IMAGES`:

```typescript
export const GALLERY_IMAGES = [
  {
    id: '1',
    src: '/assets/gallery/course-1.jpg',
    alt: 'Curso de Electricidad Residencial',
    title: 'Electricidad Residencial',
    description: 'Instalación y mantenimiento seguro de sistemas eléctricos domiciliarios'
  },
  // ... más imágenes
];
```

### 4. Estructura de Datos
Cada imagen debe tener:
- **id**: Identificador único
- **src**: Ruta de la imagen
- **alt**: Texto alternativo para accesibilidad
- **title**: Título que aparece en el hover (opcional)
- **description**: Descripción que aparece en el hover (opcional)

## Categorías Disponibles

Las imágenes se pueden filtrar por:
- **Todos los cursos**: Muestra todas las imágenes
- **Área Eléctrica**: Cursos relacionados con electricidad
- **Área Mecánica**: Cursos de mecánica y automotriz
- **Área de Formación**: Cursos para instructores
- **Automatización**: Cursos de sistemas automatizados

## Funcionalidades del Lightbox

### Navegación
- **Click**: Abrir imagen en lightbox
- **Flechas**: Navegar entre imágenes
- **Escape**: Cerrar lightbox
- **Botones**: Navegación con botones en pantalla

### Información
- Título de la imagen
- Descripción detallada
- Contador de posición (ej: "3 de 8")

## Personalización

### Colores
Los colores se pueden personalizar en `index.css`:
```css
/* Color principal de la galería */
.gallery-item:hover {
    border-color: #f97316; /* Naranja */
}

/* Color de los botones de navegación */
.scroll-nav button {
    background-color: #1e293b; /* Slate */
}
```

### Animaciones
Las animaciones se pueden ajustar modificando las transiciones:
```css
.gallery-item {
    transition: all 0.3s ease; /* Velocidad de animación */
}
```

## Optimización

### Rendimiento
- Las imágenes se cargan con `loading="lazy"`
- Se usa `object-fit: cover` para mantener proporciones
- Transiciones optimizadas con `transform` en lugar de propiedades que causan reflow

### Accesibilidad
- Textos alternativos en todas las imágenes
- Navegación por teclado
- Contraste adecuado en textos
- Indicadores visuales claros

## Troubleshooting

### Imagen no se muestra
1. Verificar que la ruta en `src` sea correcta
2. Confirmar que el archivo existe en `assets/gallery/`
3. Revisar la consola del navegador para errores

### Navegación por scroll no funciona
1. Verificar que las secciones tengan IDs únicos
2. Confirmar que el componente `SmoothScroll` esté importado en `App.tsx`
3. Revisar que no haya conflictos de z-index

### Lightbox no se abre
1. Verificar que los iconos estén importados correctamente
2. Confirmar que no haya errores de JavaScript en la consola
3. Revisar que las imágenes tengan rutas válidas

## Próximas Mejoras

- [ ] Zoom en las imágenes del lightbox
- [ ] Galería con vista previa en miniatura
- [ ] Filtros adicionales por instructor
- [ ] Integración con API para carga dinámica
- [ ] Modo oscuro para la galería
- [ ] Compartir imágenes en redes sociales 