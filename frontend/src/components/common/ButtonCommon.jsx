import '../../styles/common/ButtonCommon.css'
export function ButtonCommon({ icon, text, onClick }) {
    return (
        <button className="button-common" onClick={onClick}>
            {icon}
            {text}
        </button>
    )
}