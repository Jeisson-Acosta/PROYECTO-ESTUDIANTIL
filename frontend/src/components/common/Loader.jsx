import "../../styles/common/Loader.css";
export function Loader() {
  return (
    <div className="loader-overlay">
      <div className="easter-animation">
        <div className="egg">
          <div className="eyes"></div>
        </div>
        <div className="shadow"></div>
        <div className="clouds">
          <div className="cloud1"></div>
          <div className="cloud2"></div>
          <div className="cloud3"></div>
        </div>
      </div>
    </div>
  );
}
