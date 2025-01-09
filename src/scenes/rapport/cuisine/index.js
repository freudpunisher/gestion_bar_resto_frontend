import React, { useState, useEffect } from "react";
import SalesTable from "./salesTables";
import axios from "axios";

const RapportCuisine = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = async () => {
    try {
      const params = selectedDate
        ? { date: selectedDate.format("YYYY-MM-DD") }
        : {};
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/sortie/cuisine/",
        { params }
      );

      // Assuming the response is already in the required format
      const formattedData = response.data.map((item) => ({
        recette: item.recette_name,
        quantite_vnt: parseFloat(item.total_quantite),
        prix_unitaire_vnt: parseFloat(item.prix_unitaire),
        prix_total_vnt: parseFloat(item.total_prix_total),
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]); // Fetch data whenever the selected date changes

  return (
    <div>
      <h1>Rapport Cuisine</h1>
      <SalesTable
        data={data}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default RapportCuisine;
