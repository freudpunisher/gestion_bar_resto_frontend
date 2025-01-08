import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SalesTable = ({ data, selectedDate, setSelectedDate }) => {
  const handleExportToPDF = () => {
    const doc = new jsPDF();
    const currentDate = selectedDate
      ? selectedDate.format("YYYY-MM-DD")
      : "All dates";

    // Add title
    doc.setFontSize(16);
    doc.text(`Rapport Cuisine - ${currentDate}`, 14, 15);

    // Define columns for the table
    const columns = [
      "Recette",
      "Quantité totale",
      "Prix unitaire",
      "Prix total",
    ];

    // Convert data to rows format expected by autoTable
    const rows = data.map((recette) => [
      recette.recette || "N/A",
      recette.quantite_vnt || 0,
      (recette.prix_unitaire_vnt || 0).toLocaleString(),
      (recette.prix_total_vnt || 0).toLocaleString(),
    ]);

    // Calculate total price
    const totalPrice = data.reduce(
      (acc, recette) => acc + (recette.prix_total_vnt || 0),
      0
    );

    // Add table to PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 25,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [31, 42, 64],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add total row
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10, // Position it below the table
      head: [
        [
          "Total",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          totalPrice.toLocaleString(),
        ],
      ],
      body: [],
      styles: {
        fontSize: 10,
        cellPadding: 3,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [31, 42, 64],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    // Generate blob URL and open in new window
    const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank", "width=1000,height=1000");

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  };

  return (
    <Box m="10px 0 0 0" sx={{ padding: "30px" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 2,
          alignItems: "center",
          bgcolor: "#1f2a40",
          padding: 2,
          borderRadius: 1,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          onClick={handleExportToPDF}
          sx={{
            bgcolor: "#70d8bd",
            color: "black",
            "&:hover": {
              bgcolor: "#4caf50",
            },
          }}
        >
          Export to PDF
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ bgcolor: "#1f2a40", marginTop: "12px" }}
      >
        <Table sx={{ padding: "12px", borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ borderBottom: "1px solid white", color: "white" }}
              >
                Recette
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid white", color: "white" }}
              >
                Quantité totale
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid white", color: "white" }}
              >
                Prix unitaire
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid white", color: "white" }}
              >
                Prix total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((recette, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    borderRight: "1px solid #e0e0e0",
                    borderBottom: "1px solid #e0e0e0",
                    color: "white",
                  }}
                >
                  {recette.recette || "N/A"}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid #e0e0e0",
                    borderBottom: "1px solid #e0e0e0",
                    color: "white",
                  }}
                >
                  {recette.quantite_vnt || 0}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid #e0e0e0",
                    borderBottom: "1px solid #e0e0e0",
                    color: "white",
                  }}
                >
                  {(recette.prix_unitaire_vnt || 0).toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid #e0e0e0",
                    borderBottom: "1px solid #e0e0e0",
                    color: "white",
                  }}
                >
                  {(recette.prix_total_vnt || 0).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesTable;
