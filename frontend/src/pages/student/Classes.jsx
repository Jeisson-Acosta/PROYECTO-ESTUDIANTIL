import "../../styles/student/Classes.css";
import { useRequestDB } from "../../hooks/utils/useRequestDB.js";

import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea, useAnimate } from "@mui/x-charts/hooks";
import { useRef, useState, useEffect } from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";

import { ButtonCommon } from "../../components/common/ButtonCommon.jsx";


import { styled } from "@mui/material/styles";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";

import {
  TargetArrowIcon,
  RocketIcon,
  CirclePlus,
} from "../../components/common/GeneralIcons.jsx";

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
      const clamped = Math.min(Math.max(width, 100), 200);
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

// Gráfica de barras por materia que muestra solo etiquetas en el eje X, sin eje Y ni cuadrícula.
function LabelsAboveBars() {
  return (
    <ChartContainer
      xAxis={[
        {
          scaleType: "band",
          data: ["Matemáticas", "Ciencias", "Programación", "Física"],
          disableLine: true,
          disableTicks: true,
          colorMap: {
            type: "ordinal",
            colors: ["#6b7280", "#fbbf24", "#22c55e", "#7bffdeff"],
          },
        },
      ]}
      series={[{ type: "bar", id: "base", data: [4.5, 3.2, 4.8, 2.2] }]}
      height={220} // <-- Altura reducida aquí (era 280)
      yAxis={[
        {
          min: 0,
          max: 5,
          tickInterval: [1, 2, 3, 4, 5],
          valueFormatter: (value) => (value === 0 ? "" : value.toString()),
        },
      ]}
      margin={{ left: 0, right: 10, top: 30, bottom: 10 }} 
    >
      <BarPlot slots={{ barLabel: BarLabel }} borderRadius={10} />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
  );
}

const Text = styled("text")(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: "none",
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
  textAnchor: "middle",
  dominantBaseline: "central",
  pointerEvents: "none",
}));

function BarLabel(props) {
  const {
    seriesId: _seriesId,
    dataIndex: _dataIndex,
    color,
    isFaded: _isFaded,
    isHighlighted: _isHighlighted,
    classes: _classes,
    xOrigin: _xOrigin,
    yOrigin,
    x,
    y,
    width,
    height: _height,
    layout: _layout,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: x + width / 2, y: y - 8 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element, p) => {
        element.setAttribute("x", p.x.toString());
        element.setAttribute("y", p.y.toString());
      },
      skip: skipAnimation,
    },
  );

  return (
    <Text {...otherProps} fill={color} textAnchor="middle" {...animatedProps} />
  );
}

function TitleChart({ title, icon }) {
  return (
    <div className="header-title-select">
      <h3>{title}</h3>
      <div className="icon-target-arrow">{icon}</div>
    </div>
  );
}

// Página principal de clases. Muestra el promedio del estudiante en una gráfica de anillo responsive.
export function Classes({ nota = 4.2 }) {
  const { data, label } = getChartData(nota);
  const { ref, size } = useContainerSize();
  const innerRadius = size.width * 0.36;

  const [classesStudent, setClassesStudent] = useState()
  const { requestDB } = useRequestDB()

  useEffect(() => {
    const responseDB = requestDB()
  }, [])

  return (
    <section className="principal-container-classes">
      <section className="container-charts">
        <div className="average-classes chart-container">
          <header style={{ marginBottom: "16px" }}>
            <div className="header-title-select">
              <TitleChart
                title="Promedio de clases"
                icon={<TargetArrowIcon />}
              />
              <select name="" id="">
                <option value="all">Todas</option>
              </select>
            </div>
          </header>
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
        </div>

        <div className="chart-container">
          <header>
            <TitleChart title="Mejores clases" icon={<RocketIcon />} />
            <p>Tu desempeño académico destacado</p>
          </header>
          <LabelsAboveBars />
        </div>
      </section>
      <section className="container-classes" style={{ marginTop: "26px" }}>
        <div className="actions-classess">
            <ButtonCommon icon={<CirclePlus />} text="Nueva clase" />
        </div>
        <ul className="list-classes">

        </ul>
      </section>
    </section>
  );
}
