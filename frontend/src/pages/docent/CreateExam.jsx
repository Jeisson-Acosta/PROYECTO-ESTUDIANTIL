import { useState, useRef, useContext } from "react"
import '../../styles/docent/CreateExam.css'
import { UserLoginContext } from "../../context/userLogin.jsx"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { SetupModalCreateExam } from "../../components/docent/SetupModalCreateExam.jsx"
import { QuestionCardExam } from "../../components/docent/QuestionCardExam.jsx"

// ─── Helpers ────────────────────────────────────────────────────────────────
const uid = (prefix = "id") =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const makeQuestion = () => ({
  id: uid("q"),
  type: "single",
  text: "",
  points: 10,
  options: [
    { id: uid("opt"), text: "", isCorrect: false },
    { id: uid("opt"), text: "", isCorrect: false },
  ],
});


export function CreateExam() {
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const { userLogin } = useContext(UserLoginContext)
  const { currentClass } = useCurrentClass()
  const { requestDB } = useRequestDB()
  const bottomRef = useRef(null)
  const navigate = useNavigate()

  const handleStart = (examData) => {
    setExam(examData);
    setQuestions([makeQuestion()]);
  };

  const addQuestion = () => {
    setQuestions((p) => [...p, makeQuestion()]);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const removeQuestion = (qId) =>
    setQuestions((p) => p.filter((q) => q.id !== qId));

  const updateQuestion = (qId, field, value) =>
    setQuestions((p) => p.map((q) => (q.id === qId ? { ...q, [field]: value } : q)));

  const addOption = (qId) =>
    setQuestions((p) =>
      p.map((q) =>
        q.id === qId
          ? { ...q, options: [...q.options, { id: uid("opt"), text: "", isCorrect: false }] }
          : q
      )
    );

  const removeOption = (qId, optId) =>
    setQuestions((p) =>
      p.map((q) =>
        q.id === qId ? { ...q, options: q.options.filter((o) => o.id !== optId) } : q
      )
    );

  const updateOption = (qId, optId, field, value) =>
    setQuestions((p) =>
      p.map((q) => {
        if (q.id !== qId) return q;
        const options = q.options.map((o) => {
          if (field === "isCorrect") {
            if (q.type === "single") return { ...o, isCorrect: o.id === optId ? value : false };
            return o.id === optId ? { ...o, isCorrect: value } : o;
          }
          return o.id === optId ? { ...o, [field]: value } : o;
        });
        return { ...q, options };
      })
    );

  const assignedPoints = questions.reduce((acc, q) => acc + (q.points || 0), 0)
  const pointsOk = exam && assignedPoints === exam.totalPoints

  const handleSave = async () => {
    const dataToSend = {  
        usuid: String(userLogin.userInfo.usuid),
        cedid: String(userLogin.educativeCenterInfo[0].cedid),
        cecid: String(userLogin.currentCycleInfo.cecid),
        json_data: JSON.stringify({...exam, asgcod: currentClass.asgcod, questions})
    }
    const responseDB = await requestDB('docent/create-exam', 'POST', dataToSend)
    if (!responseDB.ok) return toast.error(responseDB.message)
    
    toast.success('¡Examen creado exitosamente! ')
    navigate(-1)
    // console.log("Examen guardado:", JSON.stringify(payload, null, 2));
    // onSave?.(payload);
    // alert("¡Examen guardado! Revisa la consola para ver el JSON completo.");
  };

  return (
    <div className="eb-root">
      {!exam && <SetupModalCreateExam onStart={handleStart} />}

      {exam && (
        <section className="principal-container-create-exam">
          {/* ─ Header ─ */}
          <header className="eb-header">
            <div className="eb-header__inner">
              <div className="eb-header__left">
                <span className="eb-badge eb-badge--gray" style={{width: 'fit-content'}}>EXAMEN</span>
                <h1 className="eb-header__title">{exam.title}</h1>
                <p className="eb-header__desc">{exam.description}</p>
              </div>
              <div className="eb-header__right">
                <span className="eb-chip">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#1170d6" strokeWidth="1.4" />
                    <path d="M7 4v3.2l1.8 1" stroke="#1170d6" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {exam.attempts} {exam.attempts === 1 ? "Intento" : "Intentos"}
                </span>
                <span className={`eb-chip ${pointsOk ? "eb-chip--ok" : "eb-chip--warn"}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.3l-3.7 2 .7-4.1L1 5.3l4.2-.7z"
                      stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  {assignedPoints} / {exam.totalPoints} pts
                </span>
              </div>
            </div>
          </header>

          {/* ─ Main ─ */}
          <main className="eb-main">
            <div className="eb-questions">
              {questions.map((q, i) => (
                <QuestionCardExam
                  key={q.id}
                  question={q}
                  index={i}
                  onUpdate={updateQuestion}
                  onUpdateOption={updateOption}
                  onAddOption={addOption}
                  onRemoveOption={removeOption}
                  onRemove={questions.length > 1 ? removeQuestion : null}
                />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* FAB */}
            <div className="eb-fab-area">
              <button className="eb-fab" onClick={addQuestion}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Agregar Pregunta
              </button>
            </div>

            {/* Guardar — flujo normal, sin sticky */}
            <div className="eb-save-bar">
              <span className="eb-save-bar__info">
                {questions.length} {questions.length === 1 ? "pregunta" : "preguntas"}
                {" · "}{assignedPoints} pts asignados
              </span>
              <button className="eb-btn eb-btn--save" onClick={handleSave}>
                Guardar examen
              </button>
            </div>
          </main>
        </section>
      )}
    </div>
  );
}
