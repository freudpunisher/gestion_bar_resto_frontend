import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  CardMedia,
  Typography,
  Box,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  InputBase,
  Modal,
  Stack,
} from "@mui/material";
import { tokens } from "../../../theme";
import RemoveIcon from "@mui/icons-material/Remove";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { API_URL } from "../../../data/Api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EntreCuisine = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const blue = colors.blueAccent[400];
  const navigate = useNavigate();
  const location = useLocation();
  const id_entre = location.state;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState();
  const [pu, setpu] = useState();
  const [openModal, setopenModal] = useState(false);
  const [product, setproduct] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const handleClose = () => {
    setopenModal(false);
  };

  const itemEntre = secondTableData.map((row) => ({
    produit: row.id,
    mouvement_entre: id_entre,
    quantite: row.quantity,
    prix_unitaire: row.PU,
    prix_total: row.quantity * row.PU,
  }));

  // function to add item to secon table

  const handleAddButtonClick = (row) => {
    console.log(row, "row");
    const existingIndex = secondTableData.findIndex(
      (item) => item.id === row.id
    );

    if (existingIndex >= 0) {
      // Update quantity for existing product
      const updatedTableData = [...secondTableData];
      updatedTableData[existingIndex].quantity =
        parseInt(updatedTableData[existingIndex].quantity) + 1;
      setSecondTableData(updatedTableData);
    } else {
      // Add new product to the table
      const newItem = { id: row.id, nom: row.nom, quantity: 1, PU: 1, PT: 0 };
      setSecondTableData((prevData) => [...prevData, newItem]);
    }
  };

  // creation entre

  const createEntre = () => {
    axios.post(API_URL + "entre/data/", itemEntre).then((response) => {
      Swal.fire({
        icon: "success",
        title: "operation reussi",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/entre/cuisine");
    });
  };

  const handleRemoveButtonClick = (rowId) => {
    setSecondTableData((prevData) =>
      prevData.filter((item) => item.id !== rowId)
    );
  };

  const updateObjectById = (id, newQuantity, pu) => {
    setSecondTableData(
      secondTableData.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity, PU: pu } : item
      )
    );
  };

  //fetch of product
  const fetchProduct = () => {
    axios.get(API_URL + "produit/").then((response) => {
      setproduct(response.data);
    });
  };

  // search for products

  const searchProduct = async () => {
    try {
      const response = await axios.get(API_URL + "produits/search/", {
        params: { search: searchTerm },
      });
      setproduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (searchTerm !== undefined) {
      searchProduct();
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      setQuantity(1); // Ensure quantity is positive
    } else {
      setQuantity(newQuantity);
    }
  };

  const addToInvoice = () => {
    // Implement logic to add the selected product and quantity to your invoice data structure
    console.log(`Adding ${selectedProduct.name} (x${quantity}) to invoice`);
    // Clear selection and quantity after adding to invoice
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box padding={3}>
            <Card sx={{ backgroundColor: "transparent", padding: 2 }}>
              <Typography
                padding={2}
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Listes des produits
              </Typography>

              <InputBase
                color="secondary"
                sx={{
                  ml: 2,
                  flex: 1,
                  border: 1,
                  borderRadius: 2,
                  paddingLeft: 2,
                }}
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton type="button" sx={{ p: 1 }} onClick={searchProduct}>
                <SearchIcon />
              </IconButton>
              <CardContent>
                <div>
                  <Grid container xs={12} spacing={2}>
                    {product.map((item) => (
                      <Grid item sm={12} md={12} lg={3} key={item.nom}>
                        <Card
                          variant="outlined"
                          sx={{
                            backgroundColor: colors.greenAccent[700],
                            maxWidth: 200,
                            height: 100,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            handleAddButtonClick(item);
                            console.log(item);
                          }}
                        >
                          {/* <CardMedia
                           component="img"
                           height="140"
                           image={item.imageUrl}
                           alt={item.nom}
                         /> */}
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              sx={{ fontSize: 16, fontWeight: "bold" }}
                            >
                              {item.nom}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box padding={3}>
            <Card sx={{ backgroundColor: "transparent", padding: 2 }}>
              <CardHeader
                title="Invoice"
                sx={{ backgroundColor: colors.blueAccent[700], padding: 1 }}
              />
              <CardContent>
                {secondTableData.length !== 0 && ( // Only display invoice details if a product is selected
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead sx={{ backgroundColor: "transparent" }}>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">PU</TableCell>
                            <TableCell align="right">PT</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {secondTableData.map((item) => (
                            <TableRow>
                              <TableCell>{item.nom}</TableCell>
                              <TableCell align="right">
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                  justifyContent="end"
                                >
                                  <Typography
                                    variant="body2"
                                    onClick={() => setopenModal(true)}
                                  >
                                    {item.quantity}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="right">{item.PU}</TableCell>
                              <TableCell align="right">
                                {item.quantity * item.PU}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  onClick={() => {
                                    setId(item.id);
                                    setopenModal(true);
                                  }}
                                >
                                  <EditIcon
                                    sx={{ color: blue }}
                                    fontSize="small"
                                  />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleRemoveButtonClick(item.id)
                                  }
                                >
                                  <DeleteIcon color="error" fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{
                        margin: 1,
                      }}
                      onClick={createEntre}
                    >
                      Add to Invoice
                    </Button>
                  </>
                )}
                {/* Content for Invoice */}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* modal for add quantity and PU.......................................................... */}

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
            <Typography variant="h5" mb={2}></Typography>
            <Grid container spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="designation"
                    label="Quantity"
                    color="secondary"
                    // value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="code"
                    label="PU"
                    color="secondary"
                    // value={pu}
                    onChange={(e) => setpu(e.target.value)}
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
                  updateObjectById(id, quantity, pu);
                  setopenModal(false);
                  // updatecreatDrug();
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
    </Box>
  );
};

export default EntreCuisine;
