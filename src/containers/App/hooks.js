import { useEffect, useState } from "react";

export const useSettings = () => {
  const [markers, setMarkers] = useState([]);
  const [types, setTypes] = useState([]);
  const [whereQuery, setWhereQuery] = useState("");
  const [percentage, setPercentage] = useState([]);
  const [activateRequest, setActivateRequest] = useState(false);

  const getQuery = `SELECT latitude, longitude, color, tipo FROM ${process.env.REACT_APP_CARTO_TABLE_NAME} ${whereQuery}`;

  const handleSetWhereQuery = (query) => {
    setWhereQuery(query);
  };

  const handleSetMarkers = (rows) => {
    setMarkers(rows);
  };

  const handleSetTypes = (typeArray) => {
    setTypes(typeArray);
  };

  const handleSetPercentage = (percent) => {
    setPercentage(percent);
  };

  const handleSetActivateRequest = (value) => {
    setActivateRequest(value);
  };

  useEffect(() => {
    if (whereQuery !== "") {
      setActivateRequest(true);
    }
  }, [whereQuery]);

  return {
    markers,
    handleSetMarkers,
    types,
    handleSetTypes,
    handleSetWhereQuery,
    percentage,
    handleSetPercentage,
    getQuery,
    activateRequest,
    whereQuery,
    handleSetActivateRequest,
  };
};

export default useSettings;
