import React, { useState, useEffect } from "react";
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
  // Autocomplete,
  InputLabel,
  // CardHeader,
  // Typography,
  TablePagination,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_URL } from "../../data/Api";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Swal from 'sweetalert2';

const rowsPerPageOptions = [5, 10, 25];

function StockInitialCuisine() {
  const [data, setData] = useState([]);
  // const [search, setSearch] = useState();
  // const [isdate, setisdate] = useState(false);
  // const [items, setitems] = useState([]);
  const [openModal, setopenModal] = useState(false);

  // variable de recherche
  const [date, setdate] = useState();
  const [produit, setproduit] = useState();

  // variabale pour la vration invataire
  const [produit_data_id, setproduit_data_id] = useState();
  const [produit_data_name, setproduit_data_name] = useState();
  const [produit_data_qte, setproduit_data_qte] = useState();
  const [produit_post_qte, setproduit_post_qte] = useState();
  // const [du, setdu] = useState();
  // const [au, setau] = useState();
  // const [produit_id, setproduit_id] = useState();
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

  const fetchdata = () => {
    axios.get(API_URL + "etat/stock/2/").then((response) => {
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
    axios.get(API_URL + "etat/stock/2/", options).then((response) => {
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
  
  return (
    <Box m="20px">
      <Header
        title="Stock Initial" 
        subtitle="Stock Initial Cuisine"
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
              onChange={(e) => {
                setproduit(e.target.value);
                console.log(e.target.value, "change");
              }}
            />            
          </Grid>
          {/* bouton recherch */}
          <Grid item sm={2}>
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
                marginTop: 3
              }}
            >
              <DownloadOutlinedIcon/>
            </Button>
          </Grid>
          {/*etat stock liste */}
          <Grid item xs={12}>
            <Box
              height="75vh"
              width="100%"
              sx={{
                overflow: "auto",
                "& .MuiTable-root": {
                  border: "none",
                },
                "& .MuiTableCell-root": {
                  borderBottom: "none",
                  color: colors.greenAccent[300],
                },
                "& .MuiTableHead-root": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiTablePagination-root": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: "inherit" }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
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
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
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
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* from nouveau invantaire cuisine --------------------------------------- */}
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
export default StockInitialCuisine;
