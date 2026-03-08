import '../../styles/common/ButtonCommon.css'
export function ButtonCommon({ icon, text, onClick, colorText = 'ffffff' }) {

    return (
        <button className="button-common" onClick={onClick}>
            {icon && icon}
            <span style={{ color: '#' + colorText }}>{text}</span>
        </button>
    )
}