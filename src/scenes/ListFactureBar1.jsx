import { useEffect, useMemo, useState } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Stack,
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { Api_client } from "../data/Api";
import { API_URL } from "../data/Api";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import logo from "../assets/Dodoma_Park_Logo.png";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import { mkConfig, generateCsv, download } from "export-to-csv";
import Header from "../components/Header";

const ListFactureBar1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [reference, setreference] = useState();
  const [avatar, setAvatar] = useState(null);
  const [nom, setnom] = useState();
  const [prenom, setprenom] = useState();
  const [date, setdate] = useState();
  const [listAssurance, setlistAssurance] = useState([]);
  const [listAvenant, setlistAvenant] = useState([]);
  const [Avenant, setAvenant] = useState([]);
  const [id_assurance, setid_assurance] = useState();
  const [listentreproduit, setlistentreproduit] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalu, setOpenModalu] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [openModalv, setopenModalv] = useState(false);
  const [numero_Facture, setnumero_Facture] = useState();
  const [serveur, setserveur] = useState();
  const [numero_membre, setnumero_membre] = useState();
  const [avataru, setAvataru] = useState(null);
  const [nomu, setnomu] = useState();
  const [prenomu, setprenomu] = useState();
  const [id, setid] = useState();
  const [validated_by, setvalidated_by] = useState();
  const [id_avenant, setid_avenant] = useState();
  const [assurance, setassurance] = useState();
  const [position_member, setposition_member] = useState();
  const [date_naissance, setdate_naissance] = useState();
  const [produit, setproduit] = useState([]);
  const [Id_entreMouvement, setid_entreMouvement] = useState();
  const [listproduit, setlistproduit] = useState([]);

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(listentreproduit);
    download(csvConfig)(csv);
  };

  //handle close modal
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCloseforView = () => {
    setopenModalv(false);
  };

  //handle close modal update
  const handleCloseu = () => {
    setOpenModalu(false);
  };

  // fetch assurance list
  // const fetchAssuranceList = () => {
  //   Api_client.get("assurances/").then((response) =>
  //     setlistAssurance(response.data)
  //   );
  // };

  //fetch list Avenant
  // const fetchAvenantList = () => {
  //   Api_client.get("avenant/").then((response) =>
  //     setlistAvenant(response.data)
  //   );
  // };

  // fetch data facture
  const fetchentreproduit = () => {
    axios.get(API_URL + "mouvement/sortie/type/1/").then((response) => {
      setlistentreproduit(
        response.data.map((obj) => ({
          id: obj.id,
          reference: obj.reference,
          client: obj.client_info.client,
          created_by: obj.created_by_info.user,
          created_at: obj.created_at,
          montant: obj.montant_total_info.montant,
          status_paye: obj.status_paye ? "paye" : "pas paye",
        }))
      );
    });
  };
  useEffect(() => {
    fetchentreproduit();
  }, []);

  var produitdata = listproduit.map((obj) => ({
    id: obj.id,
    reference: obj.reference,
    produit: obj.produit_info.produit,
    // mouvement_entre: obj.mouvement_entre_info.mouvement_entre,
    quantite: obj.quantite,
    prix_unitaire: obj.prix_unitaire,
    prix_total: obj.prix_total,
  }));

  // delete entreProduit
  const deleteentreproduit = (id) => {
    console.log(`mouvement/sortie/${id}/`, "sdssssssssssssssssssssssssss");
    axios.delete(API_URL + `sortie/cuisine/${id}/`).then((response) => {
      fetchProduit(Id_entreMouvement);
    });
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
          <tr><td>FACT No</td><td>: ${numero_Facture}</td></tr>   
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
  const totalPT = produitdata
    .reduce((acc, row) => acc + Number(row.prix_total), 0)
    .toFixed(2);

  // var productdata = listentreproduit.map((obj) => ({
  //   id: obj.id,
  //   reference: obj.reference,
  //   client: obj.client_info.client,
  //   created_by: obj.created_by_info.user,
  //   created_at: obj.created_at,
  //   montant: obj.montant_total_info.montant,
  //   status_paye: obj.status_paye ? "paye" : "pas paye",
  // }));

  // console.log(typeof productdata, "ssssssssssssssssssssssssssssssssss");
  // creation avenant
  // const creationAvenant = () => {
  //   Api_client.post("avenant/", {
  //     numero_membre: reference,
  //     avatar: avatar,
  //     nom: nom,
  //     prenom: prenom,
  //     date_naissance: date,
  //     assurance: id_assurance,
  //     postion_membre: selectValue,
  //     user_create: 1,
  //   }).then((response) => {
  //     setOpenModal(false);
  //     fetchAvenantList();
  //     Swal.fire({
  //       icon: "success",
  //       title: "Création contribuable réussi",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   });
  // };

  // update avenant
  // const updateAvenant = () => {
  //   Api_client.patch(`avenant/${id_avenant}/`, {
  //     numero_membre: numero_membre,
  //     avatar: avataru,
  //     nom: nomu,
  //     prenom: prenomu,
  //     date_naissance: date_naissance,
  //     assurance: assurance,
  //     postion_membre: position_member,
  //     user_create: 1,
  //   }).then((response) => {
  //     handleCloseu();
  //     fetchAvenantList();
  //     Swal.fire({
  //       icon: "success",
  //       title: "Modification avenant réussi",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   });
  // };

  // delete avenant
  // const deleteAvenant = (id) => {
  //   Api_client.delete(`avenant/${id}/`).then((response) => {
  //     fetchAvenantList();
  //     Swal.fire({
  //       icon: "success",
  //       title: "Suppression avenant  réussi",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   });
  // };

  // useEffect(() => {
  //   fetchAssuranceList();
  //   fetchAvenantList();
  // }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "reference",
        header: "Reference",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "client",
        header: "Serveur",
      },
      {
        accessorKey: "created_by",
        header: "Cree par",
      },
      {
        accessorKey: "created_at",
        header: "Date",
        Cell: ({ renderedCellValue, row }) => <span>{renderedCellValue}</span>,
      },
      {
        accessorKey: "montant",
        header: "Montant",
      },
      {
        accessorFn: (row) => row.status_paye,
        header: "Status",
        Cell: ({ row }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                row.original.status_paye === "pas paye"
                  ? theme.palette.error.dark
                  : theme.palette.success.dark,
              borderRadius: "0.25rem",
              color: "#fff",
              maxWidth: "10ch",
              p: "1rem",
            })}
          >
            {row.original.status_paye}
          </Box>
        ),
      },
    ],
    []
  );

  // fetchdata base on id
  const fetchProduit = (id) => {
    setid_entreMouvement(id);
    axios.get(API_URL + `sortie/mouvements/${id}/`).then((response) => {
      setlistproduit(response.data);
    });
  };

  const table = useMaterialReactTable({
    columns,
    data: listentreproduit,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal",
    positionActionsColumn: "last",
    enableRowSelection: true,
    columnFilterDisplayMode: "popover", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow
      //customize paper styles
      sx: {
        borderRadius: "10",
        border: "10px  #e0e0e0",
        width: "95%",
        height: "50%",
        marginTop: -10,
      },
    },
    muiEditRowDialogProps: {
      sx: {
        "&.Mui-EditRow-Title": {
          width: 125,
        },

        width: "100%",
      },
    },
    muiTableHeadCellProps: {
      // maxWidth:'lg',
      maxwidth: "lg",
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: "bold",
        fontSize: "20px",
        backgroundColor: colors.blueAccent[700],
      },
    },
    muiCreateRowModalProps: {
      sx: {
        fontSize: "100%",
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(row.id);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    muiSearchTextFieldProps: {
      sx: {
        backgroundColor: colors.redAccent[700],
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "20px",
      },
    },

    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => {
      setValidationErrors({});
      console.log("canceled");
    },

    onEditingRowCancel: () => setValidationErrors({}),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Edit">
          <IconButton
            aria-label="delete"
            onClick={() => {
              setopenModalv(true);
              fetchProduit(row.original.id);
              console.log(row.original.status_paye);
              setnumero_Facture(row.original.reference);
              setdate(row.original.created_at);
              setserveur(row.original.client);
              setid(row.original.id);
              setvalidated_by(row.original.status_paye);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => deleteentreproduit(row.original.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

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
          variant="contained"
          color="warning"
          onClick={() => {
            navigate("/entre/commande/bar");
          }}
        >
          Commande
        </Button>
        <Button
          variant="contained"
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          variant="contained"
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          variant="contained"
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
    state: {},
  });

  return (
    <>
      <Box
        sx={{
          marginTop: 10,
          marginLeft: 5,
        }}
      >
        <Header title="liste des factures Bar" />
      </Box>
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialReactTable table={table} />

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
              p: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: colors.blueAccent[700],
                height: "fit-content",
                minHeight: 50,
                p: 1,
              }}
            >
              <Typography variant="h3" noWrap sx={{ flexGrow: 1 }}>
                Avenant
              </Typography>
              <CloseIcon onClick={() => setOpenModal(false)} />
            </Box>
            <Box margin={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    autoFocus
                    margin="dense"
                    color="secondary"
                    label="Reference"
                    type="text"
                    size="small"
                    fullWidth
                    onChange={(e) => setreference(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="dense"
                    label="Nom"
                    color="secondary"
                    type="text"
                    fullWidth
                    size="small"
                    onChange={(e) => setnom(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="dense"
                    label="Prenom"
                    color="secondary"
                    size="small"
                    type="text"
                    fullWidth
                    onChange={(e) => setprenom(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    color="secondary"
                    type="date"
                    size="small"
                    fullWidth
                    onChange={(e) => setdate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" color="secondary">
                      Selectionnez assurance
                    </InputLabel>
                    <Select
                      value={id_assurance}
                      displayEmpty
                      color="secondary"
                      inputProps={{ "aria-label": "Without label" }}
                      fullWidth={true}
                      onChange={(e) => {
                        setid_assurance(e.target.value);
                      }}
                      size="small"
                      sx={{ marginTop: 1 }}
                    >
                      {listAssurance &&
                        listAssurance.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nom}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" color="secondary">
                      Selectionnez position
                    </InputLabel>
                    <Select
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                      displayEmpty
                      color="secondary"
                      inputProps={{ "aria-label": "Without label" }}
                      fullWidth={true}
                      size="small"
                      sx={{ marginTop: 1 }}
                    >
                      <MenuItem value="">
                        <em>Principale</em>
                      </MenuItem>
                      <MenuItem value={1}>Principale</MenuItem>
                      <MenuItem value={3}>Enfant</MenuItem>
                      <MenuItem value={2}>Femme</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label htmlFor="avatar">Choose a profile picture:</label>
                  <input
                    accept="image/*"
                    color="secondary"
                    fullWidth
                    type="file"
                    id="avatar"
                    name="avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              margin={2}
              marginTop={5}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginRight: 3 }}
              >
                <Typography> Enregistrer</Typography>
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleClose()}
              >
                <CloseIcon />
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={openModalu} onClose={handleCloseu}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: colors.primary[400],
              boxShadow: 24,
              p: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: colors.blueAccent[700],
                height: "fit-content",
                minHeight: 50,
                p: 1,
              }}
            >
              <Typography variant="h3" noWrap sx={{ flexGrow: 1 }}>
                Avenant
              </Typography>
              <CloseIcon onClick={() => handleCloseu()} />
            </Box>
            <Box margin={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    autoFocus
                    margin="dense"
                    color="secondary"
                    label="Reference"
                    type="text"
                    size="small"
                    fullWidth
                    value={numero_membre}
                    onChange={(e) => setnumero_membre(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="dense"
                    label="Nom"
                    color="secondary"
                    type="text"
                    fullWidth
                    size="small"
                    value={nomu}
                    onChange={(e) => setnomu(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    margin="dense"
                    label="Prenom"
                    color="secondary"
                    size="small"
                    type="text"
                    fullWidth
                    value={prenomu}
                    onChange={(e) => setprenomu(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    color="secondary"
                    type="date"
                    size="small"
                    fullWidth
                    value={date_naissance}
                    onChange={(e) => setdate_naissance(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" color="secondary">
                      Selectionnez assurance
                    </InputLabel>
                    <Select
                      value={assurance}
                      displayEmpty
                      color="secondary"
                      inputProps={{ "aria-label": "Without label" }}
                      fullWidth={true}
                      onChange={(e) => {
                        setassurance(e.target.value);
                      }}
                      size="small"
                      sx={{ marginTop: 1 }}
                    >
                      {listAssurance &&
                        listAssurance.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nom}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" color="secondary">
                      Selectionnez position
                    </InputLabel>
                    <Select
                      value={position_member}
                      onChange={(e) => setposition_member(e.target.value)}
                      displayEmpty
                      color="secondary"
                      inputProps={{ "aria-label": "Without label" }}
                      fullWidth={true}
                      size="small"
                      sx={{ marginTop: 1 }}
                    >
                      <MenuItem value="">
                        <em>Principale</em>
                      </MenuItem>
                      <MenuItem value={1}>Principale</MenuItem>
                      <MenuItem value={3}>Enfant</MenuItem>
                      <MenuItem value={2}>Femme</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box
              margin={2}
              marginTop={5}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginRight: 3 }}
              >
                <Typography> Enregistrer</Typography>
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleCloseu()}
              >
                <CloseIcon />
              </Button>
            </Box>
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
                >
                  <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                    <TableRow>
                      {/* <TableCell>ID</TableCell> */}
                      <TableCell>Produit</TableCell>
                      {/* <TableCell>Mouvement Entre</TableCell> */}
                      <TableCell>Quantite</TableCell>
                      <TableCell>Prix Unitaire</TableCell>
                      <TableCell>Prix Total</TableCell>
                      {validated_by === "pas paye" && (
                        <TableCell>Actions</TableCell>
                      )}
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
                        <TableCell>{row.prix_unitaire} BIF</TableCell>
                        <TableCell>{row.prix_total} BIF</TableCell>
                        {validated_by === "pas paye" && (
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
                        {totalPT} BIF
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
            <Box sx={{ marginTop: 2 }}>
              {validated_by === "pas paye" ? (
                <Button
                  variant="contained"
                  sx={{ bgcolor: colors.greenAccent[700] }}
                  onClick={updatevalidated_by}
                >
                  paye
                </Button>
              ) : (
                ""
              )}
              <Button
                variant="contained"
                sx={{ marginLeft: 2, bgcolor: colors.blueAccent[700] }}
                onClick={handlePrintTable}
              >
                Print
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

const queryClient = new QueryClient();

const ListAvenant = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <ListFactureBar1 />
  </QueryClientProvider>
);

export default ListAvenant;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName)
      ? "First Name is Required"
      : "",
    lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
