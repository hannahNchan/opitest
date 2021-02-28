import React from "react";

import Button from "../../components/Button";
import FilterList from "../../components/FilterList";
import api from "../../api";
import Map from "../Map";

import { constructQuery, getPercentages } from "./utils";
import "./styles.css";
import useSettings from "./hooks";

const App = () => {
  const {
    markers,
    handleSetMarkers,
    types,
    handleSetTypes,
    handleSetPercentage,
    percentage,
    whereQuery,
    getQuery,
    activateRequest,
    handleSetWhereQuery,
    handleSetActivateRequest,
  } = useSettings();

  //const getQuery = `SELECT latitude, longitude, color, tipo FROM ${process.env.REACT_APP_CARTO_TABLE_NAME} ${whereQuery}`;

  const handleRequest = async () => {
    console.log("getQWuery", getQuery);
    const { rows } = await api(getQuery);

    const all = rows.map((item) => {
      return {
        [item.tipo]: item.color,
      };
    });
    const getTipo = rows.map((item) => item.tipo);
    const tipos = new Set(getTipo);

    const typeArray = [];
    tipos.forEach((type) => {
      const numbers = rows.filter((item) => item.tipo === type).length;
      const colors = all.filter((item) => item[type])[0][type];
      typeArray.push({ type, numbers, colors });
    });

    if (whereQuery === "") {
      const percent = getPercentages(typeArray);
      handleSetPercentage(percent);
      handleSetTypes(typeArray);
    }
    handleSetMarkers(rows);
  };

  if (activateRequest) {
    handleRequest();
    handleSetActivateRequest(false);
  }

  const onHandleClick = () => {
    handleRequest();
    handleSetActivateRequest(false);
  };

  const handleGetData = (type) => {
    if (type.length === 0) {
      handleSetMarkers([]);
    } else {
      const query = constructQuery(type);
      handleSetWhereQuery(query);
    }
  };

  return (
    <div id="app">
      <Map markers={markers} zoom={5} lat={19.453603} lng={-99.14041}></Map>
      <FilterList
        types={types}
        percentage={percentage}
        onHandleChange={handleGetData}
      />
      <Button disabled={types.length !== 0} onClick={() => onHandleClick()}>
        OBTENER PUNTOS
      </Button>
    </div>
  );
};

export default App;
