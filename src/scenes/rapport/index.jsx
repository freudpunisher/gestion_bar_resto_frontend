import React, { useState, useEffect, useRef } from "react";
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

import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";

import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_URL } from "../../data/Api";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import PrintReport from "./PrintReport";
import { getByTestId } from "@testing-library/react";
import logo from "../../assets/Dodoma_Park_Logo.png";

const rowsPerPageOptions = [5, 10, 25];

function Rapport() {
  const [data, setData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const dataGridRef = useRef();
  // variable de recherche
  const [date, setdate] = useState();
  const [dateau, setdateau] = useState();
  const [produit, setproduit] = useState();

  // variabale pour la vration invataire
  const [produit_data_id, setproduit_data_id] = useState();
  const [produit_data_name, setproduit_data_name] = useState();
  const [produit_data_qte, setproduit_data_qte] = useState();
  const [produit_post_qte, setproduit_post_qte] = useState();
  const [dataset, setdataset] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // close popup
  const handleClose = () => {
    setopenModal(false);
  };

  // liste etat stock
  const fetchdata = () => {
    axios.get(API_URL + "rapport/comptable/").then((response) => {
      setData(response.data);
    });
  };

  // focntion recherche
  const fetchdatabyparams = () => {
    const data = {
      du: date,
      au: dateau,
      produit: produit,
    };

    const options = {
      params: data,
      headers: { "Content-Type": "application/json" },
    };

    axios.get(API_URL + "rapport/comptable/", options).then((response) => {
      setData(response.data);
    });
  };

  console.log(date, "date for filter");

  // cqlcul perte
  const perte = produit_data_qte - produit_post_qte;
  const id_user = sessionStorage.getItem("user_id");

  // creation invantaire
  const createInvantaire = () => {
    axios
      .post(API_URL + "inventaire/", {
        produit: produit_data_id,
        type_produit: 1,
        quantite: perte,
        created_by: 1,
      })
      .then((response) => {
        handleClose();
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // column table liste famille
  const columns = [
    { id: "id", field: "id", headerName: "ID", flex: 0.5 },
    {
      id: "code",
      field: "code",
      headerName: "Code Produit",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "nom",
      field: "nom",
      headerName: "Nom Produit",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "stock_qte",
      field: "stock_qte",
      headerName: "Etat Stock",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "entres_nbr",
      field: "entres_nbr",
      headerName: "Nombre entre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "entres_qte",
      field: "entres_qte",
      headerName: "Quantite entre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "sorties_nbr",
      field: "sorties_nbr",
      headerName: "Nombre sortie",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "sorties_qte",
      field: "sorties_qte",
      headerName: "Quantite sortie",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "inventaires_qte",
      field: "inventaires_qte",
      headerName: "Perte",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      id: "actions",
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            title="Effectue une inventaire"
            sx={{
              color: colors.grey[100],
              fontSize: "14px",
            }}
            onClick={() => {
              if (params.row.stock_qte !== 0) {
                setopenModal(true);
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Veuillez ajouter les produits dans le stock",
                  showConfirmButton: false,
                  timer: 3000,
                });
              }
              setproduit_data_id(params.row.id);
              setproduit_data_name(params.row.code + " " + params.row.nom);
              setproduit_data_qte(params.row.stock_qte);
            }}
          >
            <AssignmentReturnedIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("mrt-pdf-example.pdf");
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  // Fonction pour formater la date au format "YYYY-MM-DD"
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  // print excel file--------------------------------------
  const handleExportToExcel = () => {
    // Obtenir la date actuelle
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Ajouter les données à partir de la ligne 3
    XLSX.utils.sheet_add_json(worksheet, data, {
      skipHeader: true,
      origin: "A3",
    });

    // Modifier les titres des colonnes
    const title = [
      "ID",
      "Code",
      "Nom",
      "Famille",
      "Nombre Entre",
      "Quantite Entre",
      "Nombre Sortie",
      "Quantite Sortie",
      "Inventaire",
      "Quantie Perdi",
      "Quantite En stock",
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [["Etat Stock Bar"]], { origin: "A1" }); // Ajouter le titre à partir de la ligne 1
    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A2" }); // Ajouter le titre à partir de la ligne 2

    // Fusionner les cellules de la première ligne
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }];
    worksheet["A1"].s = { alignment: { horizontal: "center" } };

    XLSX.utils.book_append_sheet(workbook, worksheet, "STOCK INITIAL BAR");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Construire le nom du fichier avec la date
    const fileName = `EtatStockBar_${formattedDate}.xlsx`;

    const excelBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const excelUrl = URL.createObjectURL(excelBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = excelUrl;
    downloadLink.download = fileName;
    downloadLink.click();

    // Nettoyer l'URL de l'objet
    URL.revokeObjectURL(excelUrl);
  };

  // print PDF file----------------------------------------
  const handleExportToPDF = async () => {
    const input = document.getElementById("data_liste");

    // Convertir le contenu HTML en une image
    const image = await html2canvas(input);

    // Créer un PDF avec `jspdf`
    const doc = new jsPDF();

    // Ajouter l'image au PDF
    const width = doc.internal.pageSize.getWidth();
    const height = (image.height * width) / image.width;
    doc.addImage(image.toDataURL("image/png"), "PNG", 0, 0, width, height);

    // Sauvegarder ou afficher le PDF
    doc.save("grille_de_donnees.pdf");
  };

  const MyPDF = ({ data }) => (
    <Document>
      <Page>
        <View>
          <Text>My DataGrid PDF</Text>
          <DataGrid rows={data} columns={columns} />
        </View>
      </Page>
    </Document>
  );

  // const handleExportToPDF = () => {
  //   const fileName = 'datagrid.pdf';

  //   const pdfContent = (
  //     <MyPDF data={data} columns={columns} />
  //   );

  //   return (
  //     <PDFDownloadLink document={pdfContent} fileName={fileName}>
  //       {({ blob, url, loading, error }) =>
  //         loading ? 'Generating PDF...' : 'Download PDF'
  //       }
  //     </PDFDownloadLink>
  //   );
  // };

  // const handleExportToPDF = () => {
  //   const fileName = 'datagrid.pdf';

  //   const pdfContent = (
  //     <MyPDF data={data} columns={columns} />
  //   );

  //   const blob = pdf(pdfContent).toBlob();

  //   saveAs(blob, fileName);
  // };

  //data for test

  const dataTest = [
    {
      reference: "AP202440286BR",
      date: "2024-04-24 03:48:32.883656+00:00",
      cloture: "False",
      produits: [],
    },
    {
      reference: "AP202442324BR",
      date: "2024-04-23 13:43:24.363855+00:00",
      cloture: "False",
      produits: [],
    },
    {
      reference: "ACH24040004",
      date: "2024-04-11 14:42:05.448918+00:00",
      cloture: "False",
      produits: [],
    },
    {
      reference: "ACH24040003",
      date: "2024-04-11 14:41:55.145391+00:00",
      cloture: "False",
      produits: [
        {
          produit: "PR24040004 BOCK",
          quantite_ach: 50.0,
          prix_unitaire_ach: 3000.0,
          prix_total_ach: 150000.0,
          sorties: [
            {
              quantite_vnt: 10.0,
              prix_unitaire_vnt: 3300.0,
              prix_total_vnt: 33000.0,
              benefice: 3000.0,
            },
          ],
        },
        {
          produit: "PR24040003 BAJOU",
          quantite_ach: 50.0,
          prix_unitaire_ach: 3000.0,
          prix_total_ach: 150000.0,
          sorties: [
            {
              quantite_vnt: 30.0,
              prix_unitaire_vnt: 3300.0,
              prix_total_vnt: 99000.0,
              benefice: 9000.0,
            },
          ],
        },
        {
          produit: "PR24040002 BECHOU",
          quantite_ach: 50.0,
          prix_unitaire_ach: 3000.0,
          prix_total_ach: 150000.0,
          sorties: [
            {
              quantite_vnt: 3.0,
              prix_unitaire_vnt: 2500.0,
              prix_total_vnt: 7500.0,
              benefice: -1500.0,
            },
            {
              quantite_vnt: 20.0,
              prix_unitaire_vnt: 3300.0,
              prix_total_vnt: 66000.0,
              benefice: 6000.0,
            },
          ],
        },
        {
          produit: "PR24040001 AMSTEL",
          quantite_ach: 50.0,
          prix_unitaire_ach: 3000.0,
          prix_total_ach: 150000.0,
          sorties: [
            {
              quantite_vnt: 10.0,
              prix_unitaire_vnt: 3300.0,
              prix_total_vnt: 33000.0,
              benefice: 3000.0,
            },
            {
              quantite_vnt: 7.0,
              prix_unitaire_vnt: 3500.0,
              prix_total_vnt: 24500.0,
              benefice: 3500.0,
            },
          ],
        },
      ],
    },
    {
      reference: "ACH24040002",
      date: "2024-04-10 11:31:57.497880+00:00",
      cloture: "False",
      produits: [
        {
          produit: "PR24040004 BOCK",
          quantite_ach: 100.0,
          prix_unitaire_ach: 25000.0,
          prix_total_ach: 2500000.0,
          sorties: [],
        },
      ],
    },
    {
      reference: "ACH24040001",
      date: "2024-04-10 11:03:59.499278+00:00",
      cloture: "False",
      produits: [
        {
          produit: "PR24040003 BAJOU",
          quantite_ach: 2.0,
          prix_unitaire_ach: 1.0,
          prix_total_ach: 2.0,
          sorties: [],
        },
        {
          produit: "PR24040004 BOCK",
          quantite_ach: 2.0,
          prix_unitaire_ach: 1.0,
          prix_total_ach: 2.0,
          sorties: [],
        },
        {
          produit: "PR24040001 AMSTEL",
          quantite_ach: 4.0,
          prix_unitaire_ach: 1.0,
          prix_total_ach: 4.0,
          sorties: [],
        },
      ],
    },
  ];

  // let sort some data

  const filteredData = data.filter((item) => item.produits.length !== 0);
  const sortedData = dataTest.forEach((item) => console.log(item, "dfvgrecc"));

  const hasMultipleSorties = (filteredData) =>
    filteredData.some((item) => item.sorties.length > 1); // Function definition
  // console.log(
  //   dataTest.some((item) => item.sorties.length > 1),
  //   "fffffffffffffffffffff"
  // );

  //// test
  console.log(sortedData);

  // handle print

  const handlePrintTable = () => {
    // Generate a print-friendly HTML table structure based on filteredData
    const printTableHTML = `
      <div style="width: 100%; margin: 0 auto;">
        <table style="width: 100%;">
          ${
            logo
              ? `<tr><th><img src=${logo} alt="Logo" style="width: 100px; height: 100px;"></th></tr>`
              : ""
          }
        </table><br>
        <table style="width: 100%; font-size:14;">
          <tr><th>DODOMA PARK BUGARAMA</th></tr>
        </table><hr><br>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td>Contact</td><td>: (+257) 69124625/68424589</td></tr>
          <tr><td>Serveur</td><td>: test</td></tr>
          <tr><td>Date</td><td>: ${new Date().toLocaleDateString()}</td></tr>  <tr><td>FACT No</td><td>: test</td></tr>   
        </table><br>
        <table border=1 style="width: 100%; border-collapse: collapse; margin-bottom:10px;">
          <thead>                         
            <tr>
              <td>Produit</td>
              <td>Qte Achetée</td> <td>P.U Achat</td>
              <td>P.T Achat</td>
              <td>Qte Vendue</td>
              <td>P.U Vente</td>
              <td>P.T Vente</td>
              <td>Bénéfice</td>
            </tr>
          </thead>
          <tbody>
            ${filteredData.map(
              (item) =>
                `<tr>
                <td colspan="4">${
                  item.reference
                }</td>  <td colspan="4"></td>  </tr>
              <tr>
                <td>${item.produits[0].produit}</td>  <td>${
                  item.produits[0].quantite_ach
                }</td>
                <td>${item.produits[0].prix_unitaire_ach} Fbu</td>
                <td>${item.produits[0].prix_total_ach} Fbu</td>
                <td>${item.produits[0].sorties.reduce(
                  (sum, sortie) => sum + sortie.quantite_vnt,
                  0
                )}</td>  <td>${item.produits[0].sorties.reduce(
                  (sum, sortie) => sum + sortie.prix_unitaire_vnt,
                  0
                )} Fbu</td>  <td>${item.produits[0].sorties.reduce(
                  (sum, sortie) => sum + sortie.prix_total_vnt,
                  0
                )} Fbu</td>  </tr>`
            )}
            <tr>
              <td colspan="3">Total</td>
              <td>test Fbu</td>
              <td></td>  <td></td>
              <td></td>
            </tr>             
          </tbody>
        </table>
      </div> <br>
      <table style="width: 100%;">
        <tr><th>Bujumbura Rohero AV italie No 125</th></tr>
      </table><hr><br><br>
    `;

    const printWindow = window.open("", "", "width=1000,height=1000");
    printWindow.document.write(printTableHTML);
    printWindow.document.close();

    printWindow.print();
    printWindow.close();
  };

  function generateTableRows(data) {
    let output = "";
    data.forEach((item) => {
      if (item.produits.length > 0) {
        item.produits.forEach((product) => {
          const { produit, quantite_ach, prix_unitaire_ach, prix_total_ach } =
            product;
          const sorties = product.sorties.map((sale) => ({
            quantite_vnt: sale.quantite_vnt,
            prix_unitaire_vnt: sale.prix_unitaire_vnt,
            prix_total_vnt: sale.prix_total_vnt,
            benefice: sale.benefice,
          }));
          sorties.forEach((sale, index) => {
            output += `
              <TableBody>
                <TableCell rowspan="${index === 0 ? 2 : 1}">${
              item.reference
            }</TableCell>
                <TableCell>${produit}</TableCell>
                <TableCell>${quantite_ach}</TableCell>
                <TableCell>${prix_unitaire_ach}</TableCell>
                <TableCell>${prix_total_ach}</TableCell>
                <TableCell>${sale.quantite_vnt}</TableCell>
                <TableCell>${sale.prix_unitaire_vnt}</TableCell>
                <TableCell>${sale.prix_total_vnt}</TableCell>
                <TableCell>${sale.benefice}</TableCell>
              </TableBody>`;
          });
        });
      }
    });

    return output;
  }

  return (
    <Box m="20px">
      <Header title="Rapport Stock" subtitle="Rapport stock Bar" />
      <Box p={2}>
        <Grid container spacing={2}>
          {/* input date recherche */}
          <Grid item sm={2}>
            <InputLabel htmlFor="au-input">Du</InputLabel>
            <input
              type="date"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "16px",
                width: "100%",
                color: "white",
                backgroundColor: "inherit",
              }}
              onChange={(e) => {
                setdate(e.target.value);
                console.log(e.target.value, "change");
              }}
            />
          </Grid>
          <Grid item sm={2}>
            <InputLabel htmlFor="au-input">Au</InputLabel>
            <input
              type="date"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "16px",
                width: "100%",
                color: "white",
                backgroundColor: "inherit",
              }}
              onChange={(e) => {
                setdateau(e.target.value);
                console.log(e.target.value, "change");
              }}
            />
          </Grid>
          {/* input non ou code  produit */}
          <Grid item sm={2}>
            <InputLabel htmlFor="au-input">Produit</InputLabel>
            <input
              type="text"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "16px",
                width: "100%",
                color: "white",
                backgroundColor: "inherit",
              }}
              placeholder="code ou nom produit"
              onChange={(e) => {
                setproduit(e.target.value);
                console.log(e.target.value, "change");
              }}
            />
          </Grid>
          {/* bouton recherch */}
          <Grid item sm={3}>
            <Button
              title="Rechercher"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.primary[100],
                fontSize: "14px",
                marginTop: 3,
                marginRight: 1,
              }}
              onClick={fetchdatabyparams}
            >
              <SearchIcon />
            </Button>

            <Button
              title="Imprimer la liste"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                marginTop: 3,
                marginRight: 1,
              }}
              onClick={handleExportToExcel}
            >
              <DownloadOutlinedIcon />
            </Button>
            {/* <Button
              title="Imprimer la liste"
              sx={{
                backgroundColor: colors.blueAccent[400],
                color: colors.grey[100],
                fontSize: "14px",
                marginTop: 3
              }}
              onClick={handleExportToPDF}
            >
              <DownloadOutlinedIcon/>
            </Button> */}
          </Grid>
          {/*etat stock liste */}
          <Grid item xs={12}>
            <Box
              m="10px 0 0 0"
              id="data_liste"
              //  height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <Typography variant="h3" sx={{ padding: "4px" }}>
                Liste rapport stock
              </Typography>
              {/* <MaterialReactTable table={table} /> */}
              {/* <DataGrid
                checkboxSelection
                ref={dataGridRef}
                rows={data}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              /> */}
              {/* <table>
                <tr>
                  <th>Approvisionnement</th>
                  <th>Produits</th>
                  <th>Quantité achetée</th>
                  <th>Prix achat</th>
                  <th>Prix total achat</th>
                  <th>Quantité vendue</th>
                  <th>Prix vente</th>
                  <th>Prix total vendu</th>
                  <th>Bénéfice</th>
                </tr>
                {dataTest.map((item) => {
                  if (item.produits.length > 0) {
                    return item.produits.map((product, index) => (
                      <tr key={`${item.reference}_${index}`}>
                        <td rowSpan={index === 0 ? 2 : 1}>
                          {index === 0 ? item.reference : null}
                        </td>
                        <td>{product.produit}</td>
                        <td>{product.quantite_ach}</td>
                        <td>{product.prix_unitaire_ach}</td>
                        <td>{product.prix_total_ach}</td>
                        {product.sorties.for each ((sale, sIndex) => (
                          <React.Fragment
                            key={`${item.reference}_${index}_${sIndex}`}
                          >
                            <td>{sale.quantite_vnt}</td>
                            <td>{sale.prix_unitaire_vnt}</td>
                            <td>{sale.prix_total_vnt}</td>
                            <td>{sale.benefice}</td>
                          </React.Fragment>
                        ))}
                      </tr>
                    ));
                  }
                  return null; // if no produits, return null
                })}
              </table> */}

              <PrintReport filteredData={filteredData} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* from nouveau invantaire bar --------------------------------------- */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" mb={1}>
              Ajouter l'invataire du quantite au stock
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  name="Produit"
                  label="Produit"
                  fullWidth
                  size="small"
                  value={produit_data_name}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="Quantite"
                  label="Quantite"
                  fullWidth
                  size="small"
                  type="number"
                  onChange={(e) => setproduit_post_qte(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box mt={2} paddingLeft={2}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  handleClose();
                  Swal.fire({
                    title:
                      "Etez-vous sur de vouloir effectue cette inventaire ?",
                    text: "Après validation vous ne pouvez pas retourne en arrière",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Oui",
                    cancelButtonText: "Annuler",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      createInvantaire();
                      fetchdata();
                    }
                  });
                }}
              >
                Enregistrer
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Fermer
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default Rapport;
