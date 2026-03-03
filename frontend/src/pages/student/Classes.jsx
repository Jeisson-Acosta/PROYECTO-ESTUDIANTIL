import "../../styles/student/Classes.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { useRef, useState, useEffect } from "react";

// Genera los datos del gráfico y la etiqueta central a partir de una nota de 1 al 5 por el momento.
function getChartData(nota) {
  return {
    data: [
      { value: nota, label: "Nota" },
      { value: 5 - nota, label: "", color: "#e5e7eb" },
    ],
    label: (
      <>
        <strong style={{ fontSize: "28px", fontFamily: "fontTitlesBold" }}>
          {nota}
        </strong>
        <br />
        <span style={{ fontSize: "14px" }}>Promedio total</span>
      </>
    ),
  };
}

// Hook personalizado que observa el tamaño del contenedor y devuelve sus dimensiones en tiempo real.
function useContainerSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 200, height: 200 });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      const clamped = Math.min(Math.max(width, 120), 200);
      setSize({ width: clamped, height: clamped });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

// Componente SVG que renderiza contenido HTML centrado dentro del hueco del gráfico de anillo.
function PieCentralLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  const size = Math.min(width, height) * 0.6;

  return (
    <foreignObject
      x={left + width / 2 - size / 2}
      y={top + height / 2 - size / 2}
      width={size}
      height={size}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 0.8,
        }}
      >
        {children}
      </div>
    </foreignObject>
  );
}

// Página principal de clases. Muestra el promedio del estudiante en una gráfica de anillo responsive.
export function Classes({ nota = 4.2 }) {
  const { data, label } = getChartData(nota);
  const { ref, size } = useContainerSize();
  const innerRadius = size.width * 0.36;

  return (
    <section className="principal-container-classes">
      <section className="container-charts">
        <div className="average-classes chart-container">
          <header>
            <div className="header-title-select">
              <h3>Promedio de clases</h3>
              <select name="" id="">
                <option value="all">Todas</option>
              </select>
            </div>
            <div ref={ref} className="chart-wrapper">
              <PieChart
                series={[{ data, innerRadius }]}
                colors={["#fbbf24"]}
                width={size.width}
                height={size.height}
                hideLegend
              >
                <PieCentralLabel>{label}</PieCentralLabel>
              </PieChart>
            </div>
          </header>
        </div>

        <div className="chart-container">

        </div>
      </section>
    </section>
  );
}
