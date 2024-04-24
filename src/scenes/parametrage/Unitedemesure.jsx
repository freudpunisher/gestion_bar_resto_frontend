import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Stack,
  Autocomplete,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
// import { API_Url } from "../../data/API";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { motion } from 'framer-motion';
import { API_URL } from "../../data/Api";

const Unite = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [name, setname] = useState();
  const [nameu, setnameu] = useState();
  const [id, setid] = useState();
  const [unite, setunite] = useState([]);
  const [description, setdescription] = useState();
  const [descriptionu, setdescriptionu] = useState();
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

  // create unite
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

  // update unite
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

  // liste unite
  const fetchunite = () => {
    axios.get(API_URL + "unite/").then((response) => {
      setunite(response.data);
    });
  };

  // refresh liste
  useEffect(() => {
    fetchunite();
    fetchProduct();
  }, []);

  var uniteData = unite.map((obj) => ({
    id: obj.id,
    produit: obj.produit_info.produit,
    produit_id: obj.produit,
    desigantion: obj.desigantion,
    code: obj.code,

    value_piece: obj.value_piece,
    value_rapport: obj.value_rapport,
    value_prix_vente: obj.value_prix_vente,
    // barcode: obj.barcode,
  }));

  //columns table
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "produit", headerName: "Produit", flex: 0.5 },

    {
      field: "desigantion",
      headerName: "Designation",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "code",
      headerName: "Code",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "value_piece",
      headerName: "Valeur piece",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "value_rapport",
      headerName: "Valeur Rapport",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => {
              console.log(params.row);
              setopenModalu(true);
              setnameu(params.row.desigantion);
              setdescriptionu(params.row.code);
              setpieceu(params.row.value_piece);
              setrapportu(params.row.value_rapport);
              setprix_venteu(params.row.value_prix_vente);
              setproduit_idu(params.row.produit_id);
              setid(params.row.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
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
                    .delete(API_URL + `unite/${params.row.id}/`)
                    .then((response) => {
                      fetchunite();
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success",
                      });
                    });
                }
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Unite de mesure"
        subtitle="Listes des Unites de mesure des produits"
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
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "auto" }}
            onClick={() => setopenModal(true)}
          >
            Ajouter l'unite de mesure
          </Button>
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={uniteData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
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

      {/* form create unite mesure ------------------------------------------------------------- */}
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
              Ajouter unite de mesure
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  sx={{ marginTop: 3 }}
                  options={items}
                  getOptionLabel={(items) => items.nom}
                  inputValue={search}
                  onChange={(event, newValue) => {
                    setproduit_id(newValue.id);
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
                  onChange={(e) => setname(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="code"
                  label="Code"
                  onChange={(e) => setdescription(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="Quantite"
                  label="Valeur Piece"
                  onChange={(e) => setpiece(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="prix"
                  label="Valuer rapport"
                  onChange={(e) => setrapport(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="prix"
                  label="Valeur prix vente"
                  onChange={(e) => setprix_vente(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>

            <Box mt={2} paddingLeft={2}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  createUnite();
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

      {/* form update unite mesure ----------------------------------------------------------------- */}
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
            </Grid>
            <Box mt={2}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  updateUnite();
                }}
              >
                Enregistrer
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseforupdate}
              >
                Fermer
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default Unite;
