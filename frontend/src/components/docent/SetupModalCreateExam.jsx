import { useState } from "react"

const defaultExam = { title: "", description: "", attempts: 1, totalPoints: 100 };

export function SetupModalCreateExam({ onStart }) {
  const [form, setForm] = useState(defaultExam);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "El título es obligatorio";
    if (!form.description.trim()) e.description = "La descripción es obligatoria";
    if (form.totalPoints < 1) e.totalPoints = "Mínimo 1 punto";
    if (form.attempts < 1) e.attempts = "Mínimo 1 intento";
    return e;
  };

  const handleStart = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onStart(form);
  };

  return (
    <div className="eb-overlay" role="dialog" aria-modal="true">
      <div className="eb-modal">
        <div className="eb-modal__header">
          <span className="eb-modal__badge">EXAMEN</span>
          <h2 className="eb-modal__title">Nuevo Examen</h2>
          <p className="eb-modal__sub">Configura los detalles antes de agregar preguntas</p>
        </div>

        <div className="eb-modal__body">
          <div className="eb-field">
            <label className="eb-label">Título del examen</label>
            <input
              className={`eb-input ${errors.title ? "eb-input--error" : ""}`}
              placeholder="Ej. Parcial II: Álgebra Lineal"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
            {errors.title && <span className="eb-error">{errors.title}</span>}
          </div>

          <div className="eb-field">
            <label className="eb-label">Descripción</label>
            <textarea
              className={`eb-input eb-textarea ${errors.description ? "eb-input--error" : ""}`}
              placeholder="Ej. Evaluación de espacios vectoriales, transformaciones lineales y valores propios."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
            />
            {errors.description && <span className="eb-error">{errors.description}</span>}
          </div>

          <div className="eb-field-row">
            <div className="eb-field">
              <label className="eb-label">Intentos permitidos</label>
              <input
                className={`eb-input ${errors.attempts ? "eb-input--error" : ""}`}
                type="number" min={1}
                value={form.attempts}
                onChange={(e) => set("attempts", Number(e.target.value))}
              />
              {errors.attempts && <span className="eb-error">{errors.attempts}</span>}
            </div>
            <div className="eb-field">
              <label className="eb-label">Puntos totales</label>
              <input
                className={`eb-input ${errors.totalPoints ? "eb-input--error" : ""}`}
                type="number" min={1}
                value={form.totalPoints}
                onChange={(e) => set("totalPoints", Number(e.target.value))}
              />
              {errors.totalPoints && <span className="eb-error">{errors.totalPoints}</span>}
            </div>
          </div>
        </div>

        <div className="eb-modal__footer">
          <button className="eb-btn eb-btn--primary" onClick={handleStart}>
            Continuar y agregar preguntas →
          </button>
        </div>
      </div>
    </div>
  );
}
