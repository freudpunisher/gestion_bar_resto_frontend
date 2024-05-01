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
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
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
import { API_URL } from "../../data/Api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import logo from "../../assets/logo-bar-resto-light.png";

// import ReactToPrint from 'react-to-print';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const ListFactureCuisine = () => {
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
  const [numero_Facture, setnumero_Facture] = useState();
  const [serveur, setserveur] = useState();
  const [date, setdate] = useState();

  var productdata = listentreproduit.map((obj) => ({
    id: obj.id,
    reference: obj.reference,
    client: obj.client_info.client,
    created_by: obj.created_by_info.user,
    created_at: obj.created_at,
    montant: obj.montant_total_info.montant,
    status_paye: obj.status_paye,
  }));

  // les donnees qui doit apparaitre dans le modal

  var produitdata = listproduit.map((obj) => ({
    id: obj.id,
    reference: obj.reference,
    produit: obj.recette_info.produit,
    // mouvement_entre: obj.mouvement_entre_info.mouvement_entre,
    quantite: obj.quantite,
    prix_unitaire: obj.prix_unitaire,
    prix_total: obj.prix_total,
  }));

  //function that gonnna fetch data of fournisseur
  const fetchFournisseur = () => {
    axios.get(API_URL + "fournisseur/").then((res) => setData(res.data));
  };

  // creation mouvement entre

  const creationMouvement = () => {
    console.log(id_fournisseur);
    axios.post(API_URL + "mouvement/entre/", {
      reference: generatedCode,
      description: description,
      fournisseur: id_fournisseur,
      created_by: 1,
    });
  };

  // listes des mouvement sortie

  const fetchentreproduit = () => {
    axios.get(API_URL + "mouvement/sortie/type/2/").then((response) => {
      setlistentreproduit(response.data);
    });
  };

  // delete entreProduit
  const deleteentreproduit = (id) => {
    console.log(`mouvement/sortie/${id}/`, "sdssssssssssssssssssssssssss");
    axios.delete(API_URL + `sortie/cuisine/${id}/`).then((response) => {
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
    `AP${currentYear}${currentMonth}${code}BR`
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
    axios.get(API_URL + `sortie/mouvements/cuisine/${id}/`).then((response) => {
      setlistproduit(response.data);
    });
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

  function handlePrintTable() {
    // Generate a print-friendly HTML table structure

    const printTableHTML = `
      <div style="width: 100%; margin: 0 auto;">
        <table style="width: 100%;">
          <tr><th><img src=${logo} alt="Logo" style="width: 100px; height: 100px;"></th></tr>
        </table><br>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td>Contact</td><td>: (+257) 69124625/68424589</td></tr>
          <tr><td>Serveur</td><td>: ${serveur}</td></tr>
          <tr><td>Date</td><td>: ${moment(date).format("YYYY-MM-DD")}}</td></tr>
          <tr><td>FACT No</td><td>: ${generatedCode}</td></tr>   
        </table><br>
        <table border=1 style="width: 100%; border-collapse: collapse; margin-bottom:10px;">
          <thead>                         
            <tr><td>Produit</td><td>Qte</td><td>P.U</td><td>P.T</td></tr>
          </thead>
          <tbody>
            ${produitdata.map(
              (item) => `
              <tr>
                <td>${item.produit}</td>
                <td>${item.quantite}</td>
                <td>${item.prix_unitaire} Fbu</td>
                <td>${item.quantite * item.prix_unitaire} Fbu</td>
              </tr>
            `
            )}
            <tr>
              <td colspan="3">Total</td>
              <td>${totalPT} Fbu</td>
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

    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  }

  // update
  const updatevalidated_by = () => {
    axios
      .patch(API_URL + `mouvement/sortie/${id}/`, {
        validated_by: 1,
        status_paye: true,
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
      field: "client",
      headerName: "Serveur",
      // type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",

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
      //   renderCell: (params) => (
      //     // moment(params.row.created_at).format('YYYY-MM-DD')
      //  ),
    },
    {
      field: "montant",
      headerName: "Montant",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => params.row.montant + " BIF",
    },
    {
      field: "status_paye",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) =>
        params.row.status_paye === false ? (
          <Typography
            sx={{
              bgcolor: "red",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            align="center"
          >
            pas paye
          </Typography>
        ) : (
          <Typography
            sx={{
              bgcolor: colors.greenAccent[500],
              color: "white",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            align="center"
          >
            paye
          </Typography>
        ),
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
          {/* <IconButton
            aria-label="edit"
            onClick={() => {
              console.log(params.row);
              navigate("/entre/bar/commande", { state: params.row.id });
            }}
          >
            <FolderIcon />
          </IconButton> */}
          {params.row.status_paye === false && (
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
                })
                  .then((result) => {
                    if (result.isConfirmed) {
                      axios
                        .delete(API_URL + `mouvement/sortie/${params.row.id}/`)
                        .then((response) => fetchentreproduit());
                    }
                  })
                  .then((response) => {
                    fetchentreproduit();
                    fetchunite();
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your item has been deleted.",
                      icon: "success",
                    });
                    if (response.status === 200) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success",
                      });
                    } else {
                      Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the item.",
                        icon: "error",
                      });
                    }
                    fetchentreproduit();
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
              console.log(params.row.status_paye);
              setnumero_Facture(params.row.reference);
              setdate(params.row.created_at);
              setserveur(params.row.client);
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
        title="listes des factures"
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
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate("/entre/commande/cuisine")}
        >
          Commande
        </Button>
        <Box>
          {/* <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary" sx={{ marginRight: 'auto' }}>
              Print
            </Button>
          )}
          content={() => dataGridRef.current}
        /> */}

          {/* <Button variant="contained" color="primary"  sx={{ marginRight:'auto' }} onClick={handlePayButtonClick}>print</Button> */}
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={productdata}
          columns={columns}
          components={{ Toolbar: GridToolbarQuickFilter }}
        />
      </Box>
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
                  <InputLabel id="demo-simple-select-label">
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
              {numero_Facture}
            </Typography>
            <Typography variant="h4" mb={1}>
              {serveur}
            </Typography>
            <Typography variant="h4" mb={1}>
              {moment(date).format("YYYY-MM-DD")}
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
                    {/* <TableCell>Mouvement Entre</TableCell> */}
                    <TableCell>Quantite</TableCell>
                    <TableCell>Prix Unitaire</TableCell>
                    <TableCell>Prix Total</TableCell>
                    <TableCell>Actons</TableCell>
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
                      <TableCell>
                        <IconButton onClick={() => deleteentreproduit(row.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
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
                <TableFooter>
                  <TableRow sx={{ border: 0 }}>
                    <TableCell sx={{ border: 0 }}>
                      {validated_by == null ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={updatevalidated_by}
                        >
                          paye
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell sx={{ border: 0 }}></TableCell>
                    <TableCell sx={{ border: 0 }}>
                      {" "}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handlePrintTable}
                      >
                        print
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default ListFactureCuisine;
