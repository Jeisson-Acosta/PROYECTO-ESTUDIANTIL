import "../../styles/student/Classes.css";
import { useRequestDB } from "../../hooks/utils/useRequestDB.js";
import { useContext } from "react";
import { UserLoginContext } from "../../context/userLogin.jsx";

import { useAnimate } from "@mui/x-charts/hooks";
import { useState, useEffect } from "react";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";

import { ButtonCommon } from "../../components/common/ButtonCommon.jsx";
import { CardClass } from "../../components/student/CardClass.jsx";
import { UpcomingDelivery } from "../../components/student/UpcomingDelivery.jsx";
import { CircleChart } from "../../components/common/charts/CircleChart.jsx";

import { styled } from "@mui/material/styles";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";

import {
  TargetArrowIcon,
  RocketIcon,
  CirclePlus
} from "../../components/common/GeneralIcons.jsx";
import toast from "react-hot-toast";

// Gráfica de barras por materia que muestra solo etiquetas en el eje X, sin eje Y ni cuadrícula.
function LabelsAboveBars({ data, colors, dataSeries }) {
  return (
    <ChartContainer
      xAxis={[
        {
          scaleType: "band",
          // data: ["Matemáticas", "Ciencias", "Programación", "Física"],
          data: data,
          disableLine: true,
          disableTicks: true,
          colorMap: {
            type: "ordinal",
            // colors: ["#6b7280", "#fbbf24", "#22c55e", "#7bffdeff"],
            colors: colors,
          },
        },
      ]}
      // series={[{ type: "bar", id: "base", data: [4.5, 3.2, 4.8, 2.2] }]}
      series={[{ type: "bar", id: "base", data: dataSeries }]}
      height={220}
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

export function Classes() {

  const { userLogin } = useContext(UserLoginContext)
  const [classesStudent, setClassesStudent] = useState()
  const [upcomingDeliveries, setUpcomingDeliveries] = useState()
  const [average, setAverage] = useState()
  const [bestClasses, setBestClasses] = useState()
  const { requestDB } = useRequestDB()

  useEffect(() => {
    const getClassesStudent = async () => {
      const responseDB = await requestDB(`student/classes/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}`, 'GET')
      if (!responseDB.ok) {
        toast.error(responseDB.message)
        return
      }

      setClassesStudent(responseDB.data[0].classes)
      setUpcomingDeliveries(JSON.parse(responseDB.data[0].upcoming_deliveries))
      setAverage(responseDB.data[0].average_classes)
      setBestClasses(JSON.parse(responseDB.data[0].best_classes))
    }
    getClassesStudent()
  }, [])

  // if (!classesStudent) return null

  const dataBestClasses = bestClasses?.map(bestClass => (bestClass.asgnom))
  const colorsBestClasses = bestClasses?.map(bestClass => ('#' + bestClass.color))
  const dataSeriesBestClasses = bestClasses?.map(bestClass => (parseFloat(bestClass.average_note)))

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
          <div className="chart-wrapper">
            {average && (
              <CircleChart endValue={5} value={average} labelCenter='Promedio Total' color={'fbbf24'} />
            )}
            {!average && (
              <h2 style={{ textAlign: "center", color: "#6b7280", marginTop: "26px" }}>Aún no tienes promedio de clases</h2>
            )}
          </div>
        </div>

        <div className="chart-container">
          <header>
            <TitleChart title="Mejores clases" icon={<RocketIcon />} />
            <p>Tu desempeño académico destacado</p>
          </header>
          {bestClasses?.length > 0 && (
            <LabelsAboveBars data={dataBestClasses} colors={colorsBestClasses} dataSeries={dataSeriesBestClasses}/>
          )}
          {bestClasses?.length === 0 || !bestClasses && (
            <h2 style={{ textAlign: "center", color: "#6b7280", marginTop: "26px" }}>Aún no tienes clases destacadas</h2>
          )}
        </div>
      </section>
      <section className="container-classes" style={{ marginTop: "26px" }}>
        <div className="actions-classess">
          <ButtonCommon icon={<CirclePlus />} text="Nueva clase" />
        </div>
        {classesStudent === null  && (
            <h2 style={{ textAlign: "center", color: "#6b7280", marginTop: "26px" }}>Aún no estás inscrito en ninguna clase. ¡Unete a una ahora mismo!</h2>
        )}
        <ul className="list-classes">
          {classesStudent?.map((classItem) => <CardClass key={classItem.asgid} classItem={classItem} />)}
        </ul>
      </section>
      <section className="upcoming-deliveries">
        <header>
            <h3>Próximas entregas</h3>
        </header>
        <ul className="list-upcoming-deliveries">
            {upcomingDeliveries?.map(delivery => (<UpcomingDelivery key={delivery.ateid} delivery={delivery} />) )}
        </ul>
      </section>
    </section>
  );
}
