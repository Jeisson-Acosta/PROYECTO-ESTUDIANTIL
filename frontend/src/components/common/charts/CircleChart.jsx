import { useEffect, useState } from "react";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { PieChart } from "@mui/x-charts/PieChart";

// Componente para generar dinamicamente un <PieChart>.
export function CircleChart({ endValue, value, labelCenter, color, additionalText = '', colorBlank = 'e5e7eb' }) {
    /* 
        endValue: Valor final en el que llega la grafica. EJ: Si se califica de 1 a 5 entonces sería 5.
        value: Valor que se va a poner en medio del grafico y que sirve para restar para saber cuanto falta.
        labelCenter: Titulo corto que va dentro del grafico.
        additionalText: Texto adicional que se muestra al lado del valor central.
        color: Color de relleno del grafico.
        colorBlank: Color que se usa para lo que aún no esta completado del relleno. Por defecto es un grisoso.
    */

    const { data, label } = getChartData(value);
    const { size } = useContainerSize();
    const innerRadius = size.width * 0.36;

    // Genera los datos del gráfico y la etiqueta central a partir de una nota de 1 al 5 por el momento.
    function getChartData(nota) {
        return {
            data: [
                { value: value, label: labelCenter },
                { value: endValue - value, label: "", color: '#' + colorBlank },
            ],
            label: (
                <>
                    <strong style={{ fontSize: "28px", fontFamily: "fontTitlesBold" }}>
                        {nota}
                        {additionalText}
                    </strong>
                    <br />
                    <span style={{ fontSize: "14px" }}>{labelCenter}</span>
                </>
            ),
        };
    }

    // Hook personalizado que observa el tamaño del contenedor y devuelve sus dimensiones en tiempo real.
    function useContainerSize() {
      const [node, setNode] = useState(null);
      const [size, setSize] = useState({ width: 200, height: 200 })
    
      useEffect(() => {
        if (!node) return
        const observer = new ResizeObserver(([entry]) => {
          const { width } = entry.contentRect;
          const clamped = Math.min(Math.max(width, 100), 200)
          setSize({ width: clamped, height: clamped })
        })
        observer.observe(node)
        return () => observer.disconnect()
      }, [node])
    
      return { ref: setNode, size }
    }

    // Componente SVG que renderiza contenido HTML centrado dentro del hueco del gráfico de anillo.
    function PieCentralLabel({ children }) {
      const { width, height, left, top } = useDrawingArea()
      const size = Math.min(width, height) * 0.6
    
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
      )
    }

    return (
        <PieChart
            series={[{ data, innerRadius }]}
            colors={["#" + color]}
            width={size.width}
            height={size.height}
            hideLegend
        >
            <PieCentralLabel>{label}</PieCentralLabel>
        </PieChart>
    )
}