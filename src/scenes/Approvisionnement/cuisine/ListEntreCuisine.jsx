import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Paper,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  GridToolbarContainer,
  gridExpandedSortedRowIdsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTheme, Grid } from "@mui/material";
// import { API_Url } from "../../data/API";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FolderIcon from "@mui/icons-material/Folder";
// import { motion } from 'framer-motion';
import { API_URL } from "../../../data/Api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { createSvgIcon } from "@mui/material/utils";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import ReactToPrint from 'react-to-print';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const LisEntreCuisine = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() is zero-based
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const [data, setData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [name, setname] = useState();
  const [nameu, setnameu] = useState();
  const [priceu, setpriceu] = useState();
  const [price, setprice] = useState();
  const [boite, setboite] = useState();
  const [id, setid] = useState();
  const [unite, setunite] = useState([]);
  const [description, setdescription] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [descriptionu, setdescriptionu] = useState();
  const [nombrepillule, setnombrepillule] = useState();
  const [nombreplaquette, setnombreplaquette] = useState();
  const [prixplaquette, setprixplaquette] = useState();
  const [prixpillule, setprixpillule] = useState();
  const [isPrinting, setIsPrinting] = useState(false);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState();
  const [items, setitems] = useState([]);
  const [produit_id, setproduit_id] = useState();
  const [produit_idu, setproduit_idu] = useState();
  const [piece, setpiece] = useState();
  const [pieceu, setpieceu] = useState();
  const [rapport, setrapport] = useState();
  const [rapportu, setrapportu] = useState();
  const [prix_vente, setprix_vente] = useState();
  const [prix_venteu, setprix_venteu] = useState();
  const [id_fournisseur, setid_fournisseur] = useState();
  const [listentreproduit, setlistentreproduit] = useState([]);
  const [listproduit, setlistproduit] = useState([]);
  const [openModalv, setopenModalv] = useState(false);
  const [validated_by, setvalidated_by] = useState();
  const [Id_entreMouvement, setid_entreMouvement] = useState();

  var productdata = listentreproduit.map((obj) => ({
    id: obj.id,
    reference: obj.reference,
    fournisseur: obj.fournisseur_info.fournisseur,
    created_by: obj.created_by_info.user,
    created_at: obj.created_at,
    validated_by: obj.validated_by,
  }));

  // les donnees qui doit apparaitre dans le modal

  var produitdata = listproduit.map((obj) => ({
    id: obj.id,
    reference: obj.reference,
    produit: obj.produit_info.produit,
    mouvement_entre: obj.mouvement_entre_info.mouvement_entre,
    quantite: obj.quantite,
    prix_unitaire: obj.prix_unitaire,
    prix_total: obj.prix_total,
  }));

  //function that gonnna fetch data of fournisseur
  const fetchFournisseur = () => {
    axios.get(API_URL + "fournisseur/").then((res) => setData(res.data));
  };

  //valide l'approvisionnement
  const updatevalidated_by = () => {
    axios
      .patch(API_URL + `mouvement/entre/${id}/`, {
        validated_by: 1,
      })
      .then((response) => {
        handleCloseforView();
        fetchentreproduit();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  // creation mouvement entre

  const creationMouvement = () => {
    console.log(id_fournisseur);
    axios
      .post(API_URL + "mouvement/entre/", {
        reference: generatedCode,
        description: description,
        type_entre: 2,
        fournisseur: id_fournisseur,
        created_by: 1,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "operation  réussi",
          showConfirmButton: false,
          timer: 3000,
        });
        setopenModal(false);
        fetchentreproduit();
      });
  };

  // listes des mouvement entre

  const fetchentreproduit = () => {
    axios.get(API_URL + "mouvement/entre/type/2/").then((response) => {
      setlistentreproduit(response.data);
    });
  };

  // delete entreProduit
  const deleteentreproduit = (id) => {
    console.log(`mouvement/entre/${id}/`, "sdssssssssssssssssssssssssss");
    axios.delete(API_URL + `entre/${id}/`).then((response) => {
      fetchProduit(Id_entreMouvement);
    });
  };

  function generateRandomCode(length) {
    const characters = "0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  // Example usage:
  const code = generateRandomCode(4);
  const [generatedCode, setGeneratedCode] = useState(
    `AP${currentYear}${currentMonth}${code}CS`
  );
  const fetchProduct = () => {
    axios.get(API_URL + "produit/").then((response) => {
      setitems(response.data);
    });
  };
  const dataGridRef = useRef();
  const handleClose = () => {
    setopenModal(false);
  };
  const handleCloseforupdate = () => {
    setopenModalu(false);
  };

  const createUnite = () => {
    axios
      .post(API_URL + "unite/", {
        produit: produit_id,
        desigantion: name,
        code: description,
        value_piece: piece,
        value_rapport: rapport,
        value_prix_vente: prix_vente,
      })
      .then((response) => {
        handleClose();
        fetchunite();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const updateUnite = () => {
    axios
      .patch(API_URL + `unite/${id}/`, {
        produit: produit_idu,
        desigantion: nameu,
        code: descriptionu,
        value_piece: pieceu,
        value_rapport: rapportu,
        value_prix_vente: prix_venteu,
      })
      .then((response) => {
        handleCloseforupdate();
        fetchunite();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const fetchunite = () => {
    axios.get(API_URL + "unite/").then((response) => {
      setunite(response.data);
    });
  };
  const fetchProduit = (id) => {
    setid_entreMouvement(id);
    axios.get(API_URL + `entre/mouvement/${id}/`).then((response) => {
      setlistproduit(response.data);
    });
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }
  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  const tableData = produitdata.map((row) => ({
    Produit: row.produit,
    Quantite: row.quantite,
    PrixUnitaire: row.prix_unitaire,
    PrixTotal: row.prix_total,
    // Include other columns as needed
  }));

  // export in pdf

  const handleExportToPDF = () => {
    // Get current date
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Create new PDF document
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text(`Approvisionnement ${formattedDate}`, 14, 15);

    // Define columns for the table
    const columns = ["Produit", "Quantite", "Prix Unitaire", "Prix Total"];

    // Convert tableData to array format expected by autoTable
    const rows = tableData.map((item) => [
      item.Produit,
      item.Quantite,
      item.PrixUnitaire,
      item.PrixTotal,
    ]);

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
        fillColor: [66, 139, 202],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Generate blob URL instead of data URI
    const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Open in new window with specific target
    window.open(blobUrl, "_blank", "width=1000,height=1000");

    // Clean up the blob URL after a delay to ensure it's loaded
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  };

  const handleExportToExcel = () => {
    // Obtenir la date actuelle
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    exportToExcel(tableData, ` Approvisionnement${formattedDate}`);

    // const workbook = XLSX.utils.book_new();
    // const worksheet = XLSX.utils.json_to_sheet(produitdata);

    // // Ajouter les données à partir de la ligne 3
    // XLSX.utils.sheet_add_json(worksheet, produitdata, {
    //   skipHeader: true,
    //   origin: "A3",
    // });

    // // Modifier les titres des colonnes
    // const title = [
    //   "Produit",
    //   "Quantite",
    //   "Mouvement Entre",
    //   "Prix Unitaire",
    //   "Prix Total",
    // ];
    // XLSX.utils.sheet_add_aoa(worksheet, [["Etat Stock Bar"]], { origin: "A1" }); // Ajouter le titre à partir de la ligne 1
    // XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A2" }); // Ajouter le titre à partir de la ligne 2

    // // Fusionner les cellules de la première ligne
    // worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }];
    // worksheet["A1"].s = { alignment: { horizontal: "center" } };

    // XLSX.utils.book_append_sheet(workbook, worksheet, "STOCK INITIAL BAR");

    // const excelBuffer = XLSX.write(workbook, {
    //   bookType: "xlsx",
    //   type: "array",
    // });

    // // Construire le nom du fichier avec la date
    // const fileName = `EtatStockBar_${formattedDate}.xlsx`;

    // const excelBlob = new Blob([excelBuffer], {
    //   type: "application/octet-stream",
    // });
    // const excelUrl = URL.createObjectURL(excelBlob);

    // const downloadLink = document.createElement("a");
    // downloadLink.href = excelUrl;
    // downloadLink.download = fileName;
    // downloadLink.click();

    // // Nettoyer l'URL de l'objet
    // URL.revokeObjectURL(excelUrl);
  };

  useEffect(() => {
    fetchFournisseur();
    fetchentreproduit();
  }, []);
  // const fetchData = () => {
  //   axios.get(API_Url+"medication/list/").then((response) => {
  //     setData(response.data);
  //   })
  // }
  // useEffect(()=>{
  //   fetchData();
  // },[])
  const getRowsFromCurrentPage = ({ apiRef }) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

  const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

  const getFilteredRows = ({ apiRef }) =>
    gridExpandedSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    "SaveAlt"
  );
  function CustomToolbar() {
    const apiRef = useGridApiContext();
    // const date = new date.now();

    const handleExport = (options, exportName) => {
      const exportOptions = {
        ...options,
        fileName: `Approvissionnement`, // Customize the file name here
      };

      apiRef.current.exportDataAsCsv(exportOptions);
    };

    const buttonBaseProps = {
      color: "primary",
      size: "small",
      startIcon: <ExportIcon />,
    };

    return (
      <GridToolbarContainer>
        <Button
          {...buttonBaseProps}
          onClick={() =>
            handleExport({ getRowsToExport: getRowsFromCurrentPage })
          }
        >
          Current page rows
        </Button>
        <Button
          {...buttonBaseProps}
          onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
        >
          Filtered rows
        </Button>
        <Button
          {...buttonBaseProps}
          onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
        >
          Unfiltered rows
        </Button>
      </GridToolbarContainer>
    );
  }

  const id_user = sessionStorage.getItem("user_id");
  // const creatDrug = () => {
  //   axios.post(API_Url+"medication/list/", {
  //   name: name,
  //   boite: boite,
  //   dateexpiration:selectedDate,
  //   genre:genre,
  //   quantite: quantite,
  //   description: description,
  //   price: price,
  //   category:Category,
  //   // stock: 2147483647,0
  //   packaging_type: type,
  //   created_by: id_user
  //   }).then((response) => {
  //     setopenModal(false)
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'medicament  Ajoute',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     })
  //     fetchData()
  //   }).catch((error) => {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'eros',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     })
  //   })
  // }
  // const updatecreatDrug = () => {
  //   axios.patch(API_Url+`medication/detail/${id}/`, {
  //   name: nameu,
  //   quantite: quantiteu,
  //   description: descriptionu,
  //   price: priceu,
  //   category:Categoryu,
  //   // stock: 2147483647,0
  //   packaging_type: typeu,
  //   created_by: 4
  //   }).then((response) => {
  //     setopenModalu(false)
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'operation reussi',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     })
  //     fetchData()
  //   }).catch((error) => {
  //     setopenModalu(false)
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'eros',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     })
  //   })
  // }
  const handleCloseforView = () => {
    setopenModalv(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "reference",
      headerName: "Référence",
      flex: 1,
      //   cellClassName: "name-column--cell",
    },
    {
      field: "fournisseur",
      headerName: "Fournisseur",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    // {
    //     field: "barcode",
    //     headerName: "Barcode",
    //     flex: 1,
    //     cellClassName: "name-column--cell",
    //   },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) =>
        moment(params.row.created_at).format("YYYY-MM-DD"),
    },
    {
      field: "validated_by",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) =>
        params.row.validated_by === null ? "suspendu" : "valide",
    },
    {
      field: "created_by",
      headerName: "Créé par",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    // {
    //   field: "created_by",
    //   headerName: "Cree par",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },

    // {
    //   field: "unite_mesure",
    //   headerName: "Unite",
    //   flex: 1,
    // },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },

    // // {
    // //   field: "email",
    // //   headerName: "Email",
    // //   flex: 1,
    // // },
    // {
    //   field: "quantite",
    //   headerName: "Quantite",
    //   flex: 1,
    // },
    // {
    //   field: "created_by",
    //   headerName: "cree par",
    //   flex: 1,
    // },
    // {
    //   field: "created_at",
    //   headerName: "Date",
    //   flex: 1,
    // },
    // {
    //   field: "dateexpiration",
    //   headerName: "data d'expiration",
    //   flex: 1,
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.validated_by === null && (
            <IconButton
              aria-label="edit"
              onClick={() => {
                console.log(params.row);
                navigate("/entre/cuisine/commande", {
                  state: {
                    id_entre: params.row.id,
                    reference: params.row.reference,
                  },
                });
              }}
            >
              <FolderIcon />
            </IconButton>
          )}
          {params.row.validated_by === null && (
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    axios
                      .delete(API_URL + `mouvement/entre/${params.row.id}/`)
                      .then((response) => {
                        fetchentreproduit();
                        fetchunite();
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your item has been deleted.",
                          icon: "success",
                        });

                        // fetchentreproduit();
                      });
                  }
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="delete"
            onClick={() => {
              setopenModalv(true);
              fetchProduit(params.row.id);
              setid(params.row.id);
              setvalidated_by(params.row.validated_by);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },

    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];
  console.log(selectedDate);
  // const handlePageChange = (params) => {
  //   setPage(params.page);
  // };

  const handlePayButtonClick = () => {
    const firstPageRows = dataGridRef.current.getVisibleRows();
    setRows(firstPageRows);
    console.log(firstPageRows);
    window.print();
  };

  const totalPT = produitdata
    .reduce((acc, row) => acc + Number(row.prix_total), 0)
    .toFixed(2);

  return (
    <Box m="20px">
      <Header
        title="listes des Entres"
        // subtitle="Listes des produits"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        <Box>
          {/* <ReactToPrint
        trigger={() => (
          <Button variant="contained" color="primary" sx={{ marginRight: 'auto' }}>
            Print
          </Button>
        )}
        content={() => dataGridRef.current}
      /> */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "auto" }}
            onClick={() => setopenModal(true)}
          >
            Ajouter un entre
          </Button>
          {/* <Button variant="contained" color="primary"  sx={{ marginRight:'auto' }} onClick={handlePayButtonClick}>print</Button> */}
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={productdata}
          columns={columns}
          slots={{ toolbar: CustomToolbar }}
          // slotProps={{
          //   toolbar: {
          //     showQuickFilter: true,
          //   },
          // }}
        />
      </Box>
      <>
        <style media="print">
          {`
          @page {
            size: auto; /* auto is the initial value */
            margin:   0mm; /* this affects the margin in the printer settings */
          }
          body {
            margin:   1cm; /* this affects the margin on the content before sending to printer */
          }
        `}
        </style>
        <table
          id="printableArea"
          className="hiddenOnScreen"
          style={{ display: "none" }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.field}>{column.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.field}>{row[column.field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
      /**Add medication */
      {/* <motion.div
   initial={{ scale: 0 }}
   animate={{ rotate: 180, scale: 1 }}
   transition={{
     type: "spring",
     stiffness: 260,
     damping: 20
   }}
> */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" mb={1}>
              Nouveau Commande
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="code"
                  label="Code"
                  value={generatedCode}
                  fullWidth
                  size="small"
                  color="secondary"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ margin: -1 }}
                    color="secondary"
                  >
                    Selectionnez fournisseur
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    size="small"
                    color="secondary"
                    onChange={(e) => {
                      setid_fournisseur(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {data.map((item) => (
                      <MenuItem value={item.id}>
                        {item.first_name} {item.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Description"
                  label="Description"
                  onChange={(e) => setdescription(e.target.value)}
                  fullWidth
                  size="small"
                  color="secondary"
                />
              </Grid>
            </Grid>

            {/* {Category === "comprime" && <TextField
      name="nombre de pillule"
      label="nombre de pillule"
      onChange={(e)=>setnombrepillule(e.target.value)}
    />} */}
            {/* {Category === "Blister" && <TextField
      name="nombre de comprime par plaquette"
      label="nombre de comprime par  plaquette"
      onChange={(e)=>setnombreplaquette(e.target.value)}
    />} */}
            {/* {Category === "comprime" &&<TextField
      name="prix par plaquette"
      label="prix par plaquette"
      onChange={(e)=>setprixplaquette(e.target.value)}
    />}
    {Category === "comprime" && <TextField
      name="prix par comprime"
      label="prix par comprime"
      onChange={(e)=>setprixpillule(e.target.value)}
    />} */}

            <Box mt={2} paddingLeft={70}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  creationMouvement();
                  // creatDrug();
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                close
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
      {/* </motion.div> */}
      /**update medication */
      <Modal open={openModalu} onClose={handleCloseforupdate}>
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
            <Typography variant="h5" mb={2}>
              update unite de mesure
            </Typography>
            <Grid container spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    sx={{ marginTop: 3 }}
                    options={items}
                    getOptionLabel={(items) => items.nom}
                    inputValue={search}
                    onChange={(event, newValue) => {
                      setproduit_idu(newValue.id);
                      console.log(newValue.id, "id from search");
                    }}
                    onInputChange={(event, newInputValue) => {
                      setSearch(newInputValue);
                      console.log(newInputValue, "select from autocomplete");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search products"
                        variant="outlined"
                        size="small"
                        sx={{ marginTop: -3 }}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="designation"
                    label="Designation"
                    value={nameu}
                    onChange={(e) => setnameu(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="code"
                    label="Code"
                    value={descriptionu}
                    onChange={(e) => setdescriptionu(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="Quantite"
                    label="Valeur Piece"
                    value={pieceu}
                    onChange={(e) => setpieceu(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="prix"
                    label="Valuer rapport"
                    value={rapportu}
                    onChange={(e) => setrapportu(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="prix"
                    label="Valeur prix vente"
                    value={prix_venteu}
                    onChange={(e) => setprix_venteu(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
              {/* <Grid item xs={6}>
    <TextField
      name="Quantite"
      label="Quantite"
      value={quantiteu}
      onChange={(e) => setquantiteu(e.target.value)}
      fullWidth
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      name="prix"
      label="prix"
      value={priceu}
      onChange={(e) => setpriceu(e.target.value)}
      fullWidth
    />
  </Grid> */}
            </Grid>

            {/* {Category === "comprime" && <TextField
      name="nombre de pillule"
      label="nombre de pillule"
      onChange={(e)=>setnombrepillule(e.target.value)}
    />} */}
            {/* {Category === "Blister" && <TextField
      name="nombre de comprime par plaquette"
      label="nombre de comprime par  plaquette"
      onChange={(e)=>setnombreplaquette(e.target.value)}
    />} */}
            {/* {Category === "comprime" &&<TextField
      name="prix par plaquette"
      label="prix par plaquette"
      onChange={(e)=>setprixplaquette(e.target.value)}
    />}
    {Category === "comprime" && <TextField
      name="prix par comprime"
      label="prix par comprime"
      onChange={(e)=>setprixpillule(e.target.value)}
    />} */}

            <Box mt={2}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  updateUnite();
                  // updatecreatDrug();
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseforupdate}
              >
                close
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
      {/* modal pour voir les produit avec  reference................................... */}
      <Modal open={openModalv} onClose={handleCloseforView}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h3" mb={1}>
              Produit approvisionné
            </Typography>
            <TableContainer style={{ borderRadius: "4px" }}>
              <Table
                style={{ borderCollapse: "collapse" }}
                aria-label="simple table"
                // component={Paper}
              >
                <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                  <TableRow>
                    {/* <TableCell>ID</TableCell> */}
                    <TableCell>Produit</TableCell>

                    <TableCell>Quantite</TableCell>
                    <TableCell>Prix Unitaire</TableCell>
                    <TableCell>Prix Total</TableCell>
                    {validated_by === null && <TableCell>Actons</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produitdata.map((row) => (
                    <TableRow key={row.id}>
                      {/* <TableCell component="th" scope="row" sx={{ border: 2 }}>
                        {row.id}
                      </TableCell> */}
                      <TableCell>{row.produit}</TableCell>
                      {/* <TableCell>{row.mouvement_entre}</TableCell> */}
                      <TableCell>{row.quantite}</TableCell>
                      <TableCell>{row.prix_unitaire}</TableCell>
                      <TableCell>{row.prix_total}</TableCell>
                      {validated_by === null && (
                        <TableCell>
                          <IconButton
                            onClick={() => deleteentreproduit(row.id)}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: colors.primary[700] }}>
                    <TableCell
                      colSpan={3}
                      align="left"
                      sx={{ fontSize: 30, fontWeight: "bold" }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontSize: 30, fontWeight: "bold" }}
                    >
                      {totalPT}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TableCell sx={{ border: 0 }}>
                      {validated_by == null && produitdata.length !== 0 ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={updatevalidated_by}
                        >
                          valide
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell sx={{ border: 0 }}></TableCell>
                    <TableCell sx={{ border: 0 }}></TableCell>
                  </TableRow>
                </TableFooter> */}
              </Table>
            </TableContainer>
          </Stack>
          <Box sx={{ marginTop: 2 }}>
            {validated_by == null ? (
              <Button
                variant="contained"
                color="info"
                onClick={updatevalidated_by}
              >
                valide
              </Button>
            ) : (
              ""
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleExportToPDF}
              sx={{ marginLeft: 2 }}
            >
              excel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LisEntreCuisine;
