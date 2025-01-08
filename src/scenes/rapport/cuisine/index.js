import React, { useState, useEffect } from "react";
import SalesTable from "./salesTables";
import axios from "axios";

const RapportCuisine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/sortie/cuisine/"
        );

        // Group the data by mouvement_sortie
        const groupedData = response.data.reduce((acc, item) => {
          const mouvementSortie = item.mouvement_sortie_info.mouvement_sortie;

          if (!acc[mouvementSortie]) {
            acc[mouvementSortie] = {
              reference: mouvementSortie,
              date: item.created_at,
              recettes: [],
            };
          }

          acc[mouvementSortie].recettes.push({
            recette: item.recette_info.produit,
            quantite_vnt: parseFloat(item.quantite),
            prix_unitaire_vnt: parseFloat(item.prix_unitaire),
            prix_total_vnt: parseFloat(item.prix_total),
          });

          return acc;
        }, {});

        // Convert the grouped object to array
        const formattedData = Object.values(groupedData);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Rapport Cuisine</h1>
      <SalesTable data={data} />
    </div>
  );
};

export default RapportCuisine;
