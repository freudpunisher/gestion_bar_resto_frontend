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
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_URL } from "../../data/Api";

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [type, settype] = useState();
  function generateRandomCode() {
    const characters = "0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  // Example usage:
  const code = generateRandomCode();
  const [codeu, setcodeu] = useState();
  const [generatedCode, setGeneratedCode] = useState(`PR${code}`);
  const [Categoryu, setCategoryu] = useState();
  const [typeu, settypeu] = useState();
  const [quantite, setquantite] = useState();
  const [quantiteu, setquantiteu] = useState();
  const [genre, setgenre] = useState();
  const [genreu, setgenreu] = useState();
  const [barcode, setbarcode] = useState();
  const [barcodeu, setbarcodeu] = useState();
  const [name, setname] = useState();
  const [nameu, setnameu] = useState();
  const [priceu, setpriceu] = useState();
  const [price, setprice] = useState();
  const [id, setid] = useState();
  const [Categorie, setCategorie] = useState();
  const [unite, setunite] = useState([]);
  const [famille, setFamille] = useState([]);
  const [Product, setProduct] = useState([]);
  const [descriptionu, setdescriptionu] = useState();
  const [rows, setRows] = useState([]);
  var productdata = Product.map((obj) => ({
    id: obj.id,
    famille: obj.famille_info.famille,
    famille_id: obj.famille,

    code: obj.code,
    nom: obj.nom,
    barcode: obj.barcode,
    description: obj.description,
    prix_vente: obj.prix_vente,
    type_produit: obj.type_produit,
  }));
  const dataGridRef = useRef();
  const handleClose = () => {
    setopenModal(false);
  };
  const handleCloseforupdate = () => {
    setopenModalu(false);
  };

  const fetchProduct = () => {
    axios.get(API_URL + "produit/").then((response) => {
      setProduct(response.data);
    });
  };

  const createUnite = () => {
    const newCode = generateRandomCode();

    axios
      .post(API_URL + "produit/", {
        nom: name,
        famille: type,
        unite_mesure: genre,
        description: quantite,
        code: "PR" + newCode,
        type_produit: Categorie,
        barcode: barcode,
        prix_vente: price,
      })
      .then((response) => {
        handleClose();
        fetchProduct();
        fetchBarCode();

        //         Swal.fire({
        //   icon: 'success',
        //   title: 'operation reussi',
        //   showConfirmButton: false,
        //   timer: 3000,
        // })
        // fetchBarCode();
        generateRandomCode(4);
      });
  };
  const updateUnite = () => {
    axios
      .patch(API_URL + `produit/${id}/`, {
        nom: nameu,
        famille: typeu,
        unite_mesure: genreu,
        description: quantiteu,
        type_produit: Categoryu,
        prix_vente: priceu,
      })
      .then((response) => {
        handleCloseforupdate();
        fetchProduct();
        //         Swal.fire({
        //   icon: 'success',
        //   title: 'operation reussi',
        //   showConfirmButton: false,
        //   timer: 3000,
        // })
      });
  };
  const fetchunite = () => {
    axios.get(API_URL + "unite/").then((response) => {
      setunite(response.data);
    });
  };
  const fetchBarCode = () => {
    axios.get(API_URL + "barcode/").then((response) => {
      setbarcode(response.data.barcode);
    });
  };

  useEffect(() => {
    fetchunite();
    fetchBarCode();
    fetchProduct();
  }, []);
  useEffect(() => {
    generateRandomCode();
  }, [barcode]);

  const FetchFamille = () => {
    axios.get(API_URL + "famille/").then((response) => {
      setFamille(response.data);
    });
  };

  useEffect(() => {
    FetchFamille();
    fetchunite();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "nom",
      headerName: "Nom",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "barcode",
      headerName: "Barcode",
      flex: 1,
      cellClassName: "name-column--cell",
      hide: true,
    },
    {
      field: "famille",
      headerName: "Famille",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "prix_vente",
      headerName: "prix de vente",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "type_produit",
      headerName: "Categorie",
      flex: 1,
      renderCell: (params) => {
        return params.row.type_produit === 1 ? "Bar" : "Cuisine";
      },
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
              setnameu(params.row.nom);
              setdescriptionu(params.row.description);
              setpriceu(params.row.prix_vente);
              setbarcodeu(params.row.barcode);
              setcodeu(params.row.code);
              settypeu(params.row.famille_id);
              setCategoryu(params.row.type_produit);
              setgenreu(params.row.unite_mesure);
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
                    .delete(API_URL + `produit/${params.row.id}/`)
                    .then((response) => {
                      fetchunite();
                      fetchProduct();
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
      <Header title="Produits" subtitle="Listes des produits" />
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
            onClick={() => {
              setopenModal(true);
              generateRandomCode(4);
            }}
          >
            Ajouter Produit
          </Button>
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={productdata}
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
                <th key={column.field}>{column.headerName}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* form creation produit */}
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
              Produit
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Selctionnez famille
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={type}
                    onChange={(e) => {
                      settype(e.target.value);
                    }}
                  >
                    {famille.map((item) => (
                      <MenuItem value={item.id}>{item.nom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Categorie}
                    label="Age"
                    size="small"
                    onChange={(e) => setCategorie(e.target.value)}
                  >
                    <MenuItem value={1}>Bar</MenuItem>
                    <MenuItem value={2}>Cuisine</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Nom"
                  label="Nom"
                  onChange={(e) => setname(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  name="code"
                  label="Code"
                  value={generatedCode}
                  disabled
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="Barcode"
                  label="Barcode"
                  value={barcode}
                  disabled
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="DeScription"
                  label="Description"
                  onChange={(e) => setquantite(e.target.value)}
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
                  // creatDrug();
                }}
              >
                Enregistre
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

      {/* form update produit */}
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
              Metre à jour le produit
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Selectionnez famille
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeu}
                    onChange={(e) => {
                      settypeu(e.target.value);
                    }}
                  >
                    {famille.map((item) => (
                      <MenuItem value={item.id}>{item.nom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categorie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Categoryu}
                    label="Age"
                    size="small"
                    onChange={(e) => setCategoryu(e.target.value)}
                  >
                    <MenuItem value={1}>Bar</MenuItem>
                    <MenuItem value={2}>Cuisine</MenuItem>
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Nom"
                  label="Nom"
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
                  value={codeu}
                  disabled
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="Barcode"
                  label="Barcode"
                  value={barcodeu}
                  disabled
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Nom"
                  label="Prix de vente"
                  value={priceu}
                  onChange={(e) => setpriceu(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="DeScription"
                  label="Description"
                  value={descriptionu}
                  onChange={(e) => setdescriptionu(e.target.value)}
                  fullWidth
                  size="small"
                />
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
                Enregistre
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

export default Product;
