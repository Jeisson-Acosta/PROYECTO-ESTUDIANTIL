import { LinkIcon } from "../common/GeneralIcons.jsx"

/**
 * WebLinksInput — Maneja una lista dinámica de campos de enlace web.
 *
 * Props:
 *   links    : string[]  — array de links almacenado en el padre
 *   onChange : (links: string[]) => void — callback al actualizar
 */
export function WebLinksInput({ links, onChange }) {

    const handleChange = (index, value) => {
        const updated = [...links]
        updated[index] = value
        onChange(updated)
    }

    const handleAddLink = () => {
        onChange([...links, ''])
    }

    return (
        <div className="container-anchors-web">
            <div className="container-anchor-created">
                <h5>ENLACE WEB</h5>

                {links.map((link, index) => (
                    <div key={index} className="container-anchor-inside">
                        <div className="icon-anchor">
                            <LinkIcon />
                        </div>
                        <div className="container-input-anchor">
                            <input
                                type="text"
                                placeholder="Enlace web"
                                value={link}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="btn-create-anchor"
                    onClick={handleAddLink}
                >
                    Nuevo enlace
                </button>
            </div>
        </div>
    )
}
