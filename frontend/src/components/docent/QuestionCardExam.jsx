import { useState } from "react"

// Tipos de pregunta disponibles
const QUESTION_TYPES = [
  {
    value: "single",
    label: "Opción única",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7.5" cy="7.5" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "multiple",
    label: "Selección múltiple",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="1.5" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 7.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "open",
    label: "Respuesta abierta",
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 4h11M2 7.5h8M2 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

// ─── TypeSelector ────────────────────────────────────────────────────────────
function TypeSelector({ value, onChange }) {
  return (
    <div className="eb-type-selector">
      {QUESTION_TYPES.map((t) => (
        <button
          key={t.value}
          className={`eb-type-btn ${value === t.value ? "eb-type-btn--active" : ""}`}
          onClick={() => onChange(t.value)}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── OptionRow ───────────────────────────────────────────────────────────────
function OptionRow({ option, questionId, questionType, onUpdate, onRemove, canRemove }) {
  const isMultiple = questionType === "multiple";
  const toggleCorrect = () => onUpdate(questionId, option.id, "isCorrect", !option.isCorrect);

  return (
    <div className={`eb-option ${option.isCorrect ? "eb-option--correct" : ""}`}>
      <button
        className={`eb-option__marker ${isMultiple ? "eb-option__marker--check" : "eb-option__marker--radio"} ${option.isCorrect ? "eb-option__marker--active" : ""}`}
        onClick={toggleCorrect}
        aria-label="Marcar como correcta"
      >
        {option.isCorrect && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <input
        className="eb-option__input"
        placeholder="Escribe una opción..."
        value={option.text}
        onChange={(e) => onUpdate(questionId, option.id, "text", e.target.value)}
      />
      {canRemove && (
        <button className="eb-option__remove" onClick={() => onRemove(questionId, option.id)}>
          ×
        </button>
      )}
    </div>
  );
}

// ─── OpenAnswer ───────────────────────────────────────────────────────────────
function OpenAnswer() {
  return (
    <div className="eb-open-preview">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4.5h12M2 8h9M2 11.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span>El estudiante escribirá su respuesta aquí</span>
    </div>
  );
}

export function QuestionCardExam ({ question, index, onUpdate, onUpdateOption, onAddOption, onRemoveOption, onRemove }) {
  const [collapsed, setCollapsed] = useState(false);
  const typeLabel = QUESTION_TYPES.find((t) => t.value === question.type)?.label ?? "";

  const handleTypeChange = (newType) => {
    onUpdate(question.id, "type", newType);
    // Si cambia a single, dejar solo la primera opción correcta
    if (newType === "single") {
      let found = false;
      question.options.forEach((o) => {
        if (o.isCorrect) {
          if (!found) { found = true; }
          else { onUpdateOption(question.id, o.id, "isCorrect", false); }
        }
      });
    }
  };

  return (
    <div className="eb-card">
      <div className="eb-card__head">
        <div className="eb-card__meta">
          <span className="eb-badge eb-badge--blue">PREGUNTA {index + 1}</span>
          <span className="eb-card__type">{typeLabel}</span>
        </div>
        <div className="eb-card__actions">
          <span className="eb-points-label">PUNTOS</span>
          <input
            className="eb-points-input"
            type="number" min={0}
            value={question.points}
            onChange={(e) => onUpdate(question.id, "points", Number(e.target.value))}
          />
          <button className="eb-icon-btn" onClick={() => setCollapsed((p) => !p)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={collapsed ? "M4 6l4 4 4-4" : "M4 10l4-4 4 4"}
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {onRemove && (
            <button className="eb-icon-btn eb-icon-btn--danger" onClick={() => onRemove(question.id)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M6 4V2h4v2M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {!collapsed && (
        <div className="eb-card__body">
          <TypeSelector value={question.type} onChange={handleTypeChange} />

          <textarea
            className="eb-question-input"
            placeholder="Escribe la pregunta aquí..."
            value={question.text}
            onChange={(e) => onUpdate(question.id, "text", e.target.value)}
            rows={2}
          />

          {question.type === "open" ? (
            <OpenAnswer />
          ) : (
            <>
              <div className="eb-options-list">
                {question.options.map((opt) => (
                  <OptionRow
                    key={opt.id}
                    option={opt}
                    questionId={question.id}
                    questionType={question.type}
                    onUpdate={onUpdateOption}
                    onRemove={onRemoveOption}
                    canRemove={question.options.length > 2}
                  />
                ))}
              </div>
              <button className="eb-add-option-btn" onClick={() => onAddOption(question.id)}>
                <span>+</span> Añadir opción
              </button>
              <p className="eb-hint">
                {question.type === "single"
                  ? "Haz clic en el círculo para marcar la respuesta correcta (solo una)."
                  : "Haz clic en las casillas para marcar las respuestas correctas (puede haber varias)."}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
