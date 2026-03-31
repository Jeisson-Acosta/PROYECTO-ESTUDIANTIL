// Convierte el nombre del centro educativo EJ: "Manuelita Saenz" → "manuelita_saenz"
export const normalizeNameResource = (name) =>
    name.trim().toLowerCase().replace(/\s+/g, '_')