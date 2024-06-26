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
} from 'material-react-table';

import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_URL } from "../../data/Api";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Swal from 'sweetalert2';
import IconButton from "@mui/material/IconButton";
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { PDFDownloadLink,Document, Page, Text, View, pdf } from '@react-pdf/renderer';

const rowsPerPageOptions = [5, 10, 25];

function StockInitialBar() {
  const [data, setData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const dataGridRef = useRef();
  // variable de recherche
  const [date, setdate] = useState();
  const [produit, setproduit] = useState();

  // variabale pour la vration invataire
  const [produit_data_id, setproduit_data_id] = useState();
  const [produit_data_name, setproduit_data_name] = useState();
  const [produit_data_qte, setproduit_data_qte] = useState();
  const [produit_post_qte, setproduit_post_qte] = useState();

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
    axios.get(API_URL + "etat/stock/1/").then((response) => {
      setData(response.data);
    });
  };
  
  // focntion recherche
  const fetchdatabyparams = () => {
    const data = {
      date: date,
      produit: produit,
    };
    
    const options = {
      params: data,
      headers: { "Content-Type": "application/json" },
    };

    axios.get(API_URL + "etat/stock/1/", options).then((response) => {
      setData(response.data);
      
    });
  };
  
  // cqlcul perte
  const perte = produit_data_qte - produit_post_qte
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
              if(params.row.stock_qte !== 0){
                setopenModal(true);
              }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Veuillez ajouter les produits dans le stock',
                    showConfirmButton: false,
                    timer: 3000,
                  });
              }                                
              setproduit_data_id(params.row.id);
              setproduit_data_name(params.row.code +' '+params.row.nom);
              setproduit_data_qte(params.row.stock_qte);
            }}
          >
            <AssignmentReturnedIcon/>
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

    doc.save('mrt-pdf-example.pdf');
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
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
    const formattedDate = formatDate(currentDate)

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // Ajouter les données à partir de la ligne 3
    XLSX.utils.sheet_add_json(worksheet, data, { skipHeader: true, origin: "A3" });
  
    // Modifier les titres des colonnes
    const title = ["ID", "Code", "Nom", "Famille", "Nombre Entre", "Quantite Entre", "Nombre Sortie", "Quantite Sortie", "Inventaire", "Quantie Perdi", "Quantite En stock"];
    XLSX.utils.sheet_add_aoa(worksheet, [["Etat Stock Bar"]], { origin: "A1" }); // Ajouter le titre à partir de la ligne 1
    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A2" }); // Ajouter le titre à partir de la ligne 2
  
    // Fusionner les cellules de la première ligne
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }
    ];
    worksheet["A1"].s = { alignment: { horizontal: "center" } };
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "STOCK INITIAL BAR");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    // Construire le nom du fichier avec la date
    const fileName = `EtatStockBar_${formattedDate}.xlsx`;

    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
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
    const input = document.getElementById('data_liste');
  
    // Convertir le contenu HTML en une image
    const image = await html2canvas(input);
  
    // Créer un PDF avec `jspdf`
    const doc = new jsPDF();
  
    // Ajouter l'image au PDF
    const width = doc.internal.pageSize.getWidth();
    const height = (image.height * width) / image.width;
    doc.addImage(image.toDataURL('image/png'), 'PNG', 0, 0, width, height);
  
    // Sauvegarder ou afficher le PDF
    doc.save('grille_de_donnees.pdf');
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

    
  return (
    <Box m="20px">
      <Header
        title="Stock Initial" 
        subtitle="Stock Initial Bar"
      />
      <Box p={2}>
        <Grid container spacing={2}>
          {/* input date recherche */}
          <Grid item sm={2}>
            <InputLabel htmlFor="au-input">Date</InputLabel>
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
                marginRight: 1
              }}
              onClick={fetchdatabyparams}
            >
              <SearchIcon/>
            </Button>

            <Button
              title="Imprimer la liste"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                marginTop: 3,                
                marginRight: 1
              }}
              onClick={handleExportToExcel}
            >
              <DownloadOutlinedIcon/>
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
              <Typography variant="h3" sx={{ padding: '4px',}}>
                Liste etat stock Produits
              </Typography>
              {/* <MaterialReactTable table={table} /> */}
              <DataGrid
                checkboxSelection
                ref={dataGridRef}
                rows={data}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
              {/* <TableContainer
                component={Paper}
                sx={{ backgroundColor: "inherit" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell >ID</TableCell>
                      <TableCell align="center">Code Produit</TableCell>
                      <TableCell align="center">Nom Produit</TableCell>
                      <TableCell align="center">Etat Stock</TableCell>
                      <TableCell align="center">Nombre entre</TableCell>
                      <TableCell align="center">Quantite entre</TableCell>
                      <TableCell align="center">Nombre sortie</TableCell>
                      <TableCell align="center">Quantite sortie</TableCell>
                      <TableCell align="center">Perte</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.length !== 0 ? (
                      data.map((row) => (
                        <TableRow 
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell align="center">{row.code}</TableCell>
                          <TableCell align="center">{row.nom}</TableCell>
                          <TableCell align="center">{row.stock_qte}</TableCell>
                          <TableCell align="center">{row.entres_nbr}</TableCell>
                          <TableCell align="center">{row.entres_qte}</TableCell>
                          <TableCell align="center">{row.sorties_nbr}</TableCell>
                          <TableCell align="center">{row.sorties_qte}</TableCell>
                          <TableCell align="center">{row.inventaires_qte}</TableCell>
                          
                          <TableCell align="right">
                            <Button
                              title="Effectue une inventaire"
                              sx={{
                                color: colors.grey[100],
                                fontSize: "14px",
                              }}
                              onClick={() => {
                                if(row.stock_qte !== 0){
                                  setopenModal(true);
                                }else{
                                  Swal.fire({
                                      icon: 'warning',
                                      title: 'Veuillez ajouter les produits dans le stock',
                                      showConfirmButton: false,
                                      timer: 3000,
                                    });
                                }                                
                                setproduit_data_id(row.id);
                                setproduit_data_name(row.code +' '+row.nom);
                                setproduit_data_qte(row.stock_qte);
                              }}
                            >
                              <AssignmentReturnedIcon/>
                            </Button>
                          </TableCell>

                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            Aucun donnée enregistre
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer> */}
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
                    title: "Etez-vous sur de vouloir effectue cette inventaire ?",
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

export default StockInitialBar;
