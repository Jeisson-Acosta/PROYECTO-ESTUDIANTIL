import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRequestDB } from "../utils/useRequestDB.js";
import toast from "react-hot-toast";
import { useCurrentClass } from "./useCurrentClass.js";

export function useClassDetailsDocent() {
  const [infoClass, setInfoClass] = useState({
    infoClass: null,
    listTasks: null,
    progress: null,
  });
  const [filter, setFilter] = useState("all");
  const [filterListTasks, setFilterListTasks] = useState([]);
  const { requestDB } = useRequestDB();
  const { asgcod } = useParams();
  const { setCurrentClass } = useCurrentClass();
  const location = useLocation();

  useEffect(() => {
    const getInfoClass = async () => {
      const response = await requestDB(`docent/classes/details/${asgcod}`);
      console.log(response);
      if (!response.ok) return toast.error(response.message);
      setInfoClass({
        infoClass: JSON.parse(response.data[0].info_asignatura),
        listTasks: JSON.parse(response.data[0].lista_trabajos),
        progress: response.data[0].progreso_asignatura,
      });
      setCurrentClass(JSON.parse(response.data[0].info_asignatura)[0]);
    };
    getInfoClass();
  }, [asgcod, location.key]);

  const handleClickButtonFilter = (filter) => {
    setFilter(filter);
    if (filter === "all") {
      setFilterListTasks([]);
    } else {
      setFilterListTasks(
        infoClass.listTasks.filter((task) => task.asttip === filter),
      );
    }
  };

  return {
    infoClass,
    filter,
    filterListTasks,
    handleClickButtonFilter,
  };
}
