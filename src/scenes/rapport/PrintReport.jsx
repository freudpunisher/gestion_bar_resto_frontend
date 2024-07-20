import React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  Grid,
  TextField,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  TablePagination,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

function PrintReport({ filteredData }) {
  const doc = new jsPDF();

  // Configure autoTable options (optional)
  const options = {
    styles: {
      fontSize: 8,
    },
    columnStyles: {
      0: {
        // Style for first column (Produit)
        columnWidth: 50,
      },
    },
  };

  const headers = [
    [
      "Produit",
      "Quantité achetée",
      "Prix unitaire achat",
      "Prix total achat",
      "Quantité vendue",
      "Prix unitaire vendu",
      "Prix Total vendu",
      "Benefice",
    ],
  ];
  const body = [];
  filteredData.forEach((item) => {
    const row = [
      item.reference,
      item.date,
      item.cloture,
      // ... Add remaining product and sales data from item object
    ];
    body.push(row);
    item.produits.forEach((produit) => {
      const productRow = [
        produit.produit,
        produit.quantite_ach,
        produit.prix_unitaire_ach,
        produit.prix_total_ach,
      ];
      if (produit.sorties.length > 1) {
        // Add empty cells for rowSpan if multiple sales entries
        productRow.push(...Array(4).fill(""));
      }
      body.push(productRow);
      produit.sorties.forEach((sortie) => {
        body.push([
          sortie.quantite_vnt,
          sortie.prix_unitaire_vnt,
          sortie.prix_total_vnt,
          sortie.benefice,
        ]);
      });
    });
  });

  const handlePrint = () => {
    doc.autoTable(headers, body, options);
    doc.save("report.pdf");
  };

  const Data = filteredData.filter((item) =>
    item.produits.some((produit) => produit.sorties.length !== 0)
  );
  function handlePrintTable() {
    // Extract data from filteredData (assuming it's accessible)
    const printTableHTML = `
    <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 20px;
    }
    th, td {
      text-align: left;
      padding: 8px;
      border: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    hr {
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }
    table:last-of-type {
      margin-top: 40px;
    }

    @media print {
      .container {
         display: table;
         height: 100vh;
         width: 100%;
       }
      .content {
         display: table-cell;
         vertical-align: middle;
         text-align: center;
         width: 80%; /* Adjust width as needed */
         height: 80%; /* Adjust height as needed */
       }
     }
  </style>

      <div style="width: 100%; margin: 0 auto;">
        ${Data.map(
          (item) => `
            <table style="width: 100%; margin-bottom: 20px;">
              <thead>
                <tr>
                  <th colspan="8">${item.reference} <br> ${item.date} <br> ${
            item.cloture
          }</th>
                </tr>
                <tr >
                  <th>Produit</th>
                  <th>Quantité achetée</th>
                  <th>Prix unitaire achat</th>
                  <th>Prix total achat</th>
                  <th>Quantité vendu</th>
                  <th>Prix unitaire vendu</th>
                  <th>Prix total vendu</th>
                  <th>Bénéfice</th>
                </tr>
              </thead>
              <tbody>
                ${item.produits
                  .map(
                    (produit) => `
                    ${produit.sorties
                      .map(
                        (sortie, index) => `
                        <tr>
                          ${
                            index === 0
                              ? `<td rowspan="${produit.sorties.length}" style="border:1px solid black">${produit.produit}</td>
                               <td rowspan="${produit.sorties.length}" style="border:1px solid black">${produit.quantite_ach}</td>
                               <td rowspan="${produit.sorties.length}" style="border:1px solid black">${produit.prix_unitaire_ach}</td>
                               <td rowspan="${produit.sorties.length}" style="border:1px solid black">${produit.prix_total_ach}</td>`
                              : ""
                          }
                          <td style="border:1px solid black">${
                            sortie.quantite_vnt
                          }</td>
                          <td style="border:1px solid black">${
                            sortie.prix_unitaire_vnt
                          }</td>
                          <td style="border:1px solid black">${
                            sortie.prix_total_vnt
                          }</td>
                          <td style="border:1px solid black">${
                            sortie.benefice
                          }</td>
                        </tr>
                      `
                      )
                      .join("")}
                  `
                  )
                  .join("")}
              </tbody>
            </table>
          `
        ).join("")}
        <hr>
        <table style="width: 100%;">
          <tr><th>Bujumbura Rohero AV italie No 125</th></tr>
        </table>
      </div>
    `;

    const printWindow = window.open("", "", "width=1000,height=1000");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
        </head>
        <body>
          ${printTableHTML}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Trigger print and close the window
    // printWindow.print();
    // printWindow.close();
  }
  console.log(Data, "fffffffffffffffffffffffffffffffffff");
  const filteredProducts = Data.map((item) => ({
    ...item,
    produits: item.produits.filter(
      (produit) => produit.sorties.length > 0 && produit.sorties.length !== 0
    ),
  }));
  console.log(Data, "dfffffffffffffggsffff");

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ bgcolor: "#1f2a40", marginTop: "12px" }}
      >
        <Table>
          {filteredProducts.map((item) => (
            <React.Fragment key={item.reference}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={8}>
                    {item.reference}
                    <br />
                    {item.date}
                    <br />
                    {item.cloture}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Produit</TableCell>
                  <TableCell>Etat Stock</TableCell>
                  <TableCell>Quantité achetée</TableCell>
                  <TableCell>Prix unitaire achat</TableCell>
                  <TableCell>Prix total achat</TableCell>
                  <TableCell>Quantite Vendu</TableCell>
                  <TableCell>Prix unitaire vendu</TableCell>
                  <TableCell>Prix Total vendu</TableCell>
                  <TableCell>Benefice</TableCell>
                </TableRow>
                {item.produits.map((produit, index) => (
                  <React.Fragment key={produit.produit}>
                    <TableRow>
                      {produit.sorties.length >= 1 ? (
                        <TableCell
                          rowSpan={produit.sorties.length === 1 ? 2 : 3}
                        >
                          {produit.produit}
                        </TableCell>
                      ) : (
                        <TableCell>{produit.produit}</TableCell>
                      )}

                      {produit.sorties.length >= 1 ? (
                        <TableCell
                          rowSpan={produit.sorties.length === 1 ? 2 : 3}
                        >
                          {produit.quantite_ach -
                            produit.sorties.reduce(
                              (total, sortie) => total + sortie.quantite_vnt,
                              0
                            )}
                        </TableCell>
                      ) : (
                        <TableCell>
                          {produit.quantite_ach -
                            produit.sorties.reduce(
                              (total, sortie) => total + sortie.quantite_vnt,
                              0
                            )}
                        </TableCell>
                      )}

                      {produit.sorties.length >= 1 ? (
                        <TableCell
                          rowSpan={produit.sorties.length === 1 ? 2 : 3}
                        >
                          {produit.quantite_ach}
                        </TableCell>
                      ) : (
                        <TableCell>{produit.quantite_ach}</TableCell>
                      )}
                      {produit.sorties.length >= 1 ? (
                        <TableCell
                          rowSpan={produit.sorties.length === 1 ? 2 : 3}
                        >
                          {produit.prix_unitaire_ach}
                        </TableCell>
                      ) : (
                        <TableCell>{produit.prix_unitaire_ach}</TableCell>
                      )}
                      {produit.sorties.length >= 1 ? (
                        <TableCell
                          rowSpan={produit.sorties.length === 1 ? 2 : 3}
                        >
                          {produit.prix_total_ach}
                        </TableCell>
                      ) : (
                        <TableCell>{produit.prix_total_ach}</TableCell>
                      )}
                    </TableRow>
                    {produit.sorties.map((sortie, index) => (
                      <TableRow key={index}>
                        <TableCell>{sortie.quantite_vnt}</TableCell>
                        <TableCell>{sortie.prix_unitaire_vnt}</TableCell>
                        <TableCell>{sortie.prix_total_vnt}</TableCell>
                        <TableCell>{sortie.benefice}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </React.Fragment>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}

export default PrintReport;
