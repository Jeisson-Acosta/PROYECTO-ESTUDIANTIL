import '../../styles/common/ButtonCommon.css'
export function ButtonCommon({ icon, text, onClick, colorText = 'ffffff' }) {

    return (
        <button className="button-common" onClick={onClick}>
            <span style={{ color: '#' + colorText }}>{text}</span>
            {icon && icon}
        </button>

    )
}