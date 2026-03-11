// Obtiene la URL de las imágenes de la carpeta assets de forma dinámica compatible con Vite
export function getIconUrl(iconName) {
    return new URL(`../assets/icons_classes/${iconName}.png`, import.meta.url).href
}