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
  TableFooter,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { tokens } from "../../theme";
import RemoveIcon from "@mui/icons-material/Remove";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { API_URL } from "../../data/Api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CommandeBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const blue = colors.blueAccent[400];
  const navigate = useNavigate();
  const location = useLocation();
  const id_entre = location.state;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() is zero-based
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  function generateRandomCode(length) {
    const characters = "0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const code = generateRandomCode(4);
  const [generatedCode, setGeneratedCode] = useState(
    `FCT${currentYear}${currentMonth}${code}BR`
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [id, setId] = useState();
  const [pu, setpu] = useState();
  const [openModal, setopenModal] = useState(false);
  const [product, setproduct] = useState([]);
  const [secondTableData, setSecondTableData] = useState([]);
  const [id_client, setid_client] = useState();
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [listclient, setlistclient] = useState([]);
  const [Nomunite, setNomunite] = useState();
  //   const [PU, setPU] = useState();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const handleClose = () => {
    setopenModal(false);
  };

  const itemEntre = secondTableData.map((row) => ({
    produit: row.produit,
    unite_mesure: row.id,
    quantite: row.quantity,
    prix_unitaire: row.PU,
    type_sortie: 1,
    prix_total: row.quantity * row.PU,
  }));

  // recupere pU d'un produit et nom du produit
  const recupereIdProduit = (id) => {
    axios.get(API_URL + `unite/produit/${id}/`).then((response) => {
      setNomunite(response.data.code);
      //   setPU(response.data.value_prix_vente);
    });
  };

  // function to add item to secon table

  const handleAddButtonClick = (row) => {
    console.log(row, "row");

    recupereIdProduit(row.id);

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
      const newItem = {
        id: row.id,
        unite: row.code,
        nom: row.produit_info.produit,
        produit: row.produit,
        quantity: 1,
        PU: row.value_prix_vente,
        PT: 0,
      };
      setSecondTableData((prevData) => [...prevData, newItem]);
    }
  };

  // fetch list client
  const fetchClient = () => {
    axios.get(API_URL + "client/").then((res) => setlistclient(res.data));
  };

  // creation entre

  const createEntre = () => {
    axios
      .post(API_URL + "mouvement/sortie/", {
        reference: generatedCode,
        client: id_client,
        description: "facture",
        created_by: 1,
      })
      .then((response) => {
        axios
          .post(API_URL + "sortie/data/", itemEntre, {
            transformRequest: [
              (data, headers) => {
                // Assuming itemEntre is an array of objects
                // Modify each item in the array to include the new property
                const modifiedData = data.map((item) => ({
                  ...item,
                  mouvement_sortie: response.data.id, // Add your new property here
                }));

                // Return the modified data as a JSON string
                return JSON.stringify(modifiedData);
              },
            ],
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setopenModal(false);
            Swal.fire({
              icon: "success",
              title: "operation reussi",
              showConfirmButton: false,
              timer: 3000,
            });
          });
        setSecondTableData([]);
      });
  };

  const handleRemoveButtonClick = (rowId) => {
    setSecondTableData((prevData) =>
      prevData.filter((item) => item.id !== rowId)
    );
  };

  const inCreaseQuantity = (id, newQuantity) => {
    setSecondTableData(
      secondTableData.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity - 1 } : item
      )
    );
  };
  const decreaseQuantity = (id, newQuantity) => {
    setSecondTableData(
      secondTableData.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity + 1 } : item
      )
    );
  };

  //fetch of product
  const fetchProduct = () => {
    axios.get(API_URL + "unite/").then((response) => {
      setproduct(response.data);
    });
  };

  // search for products

  const searchProduct = async () => {
    try {
      const response = await axios.get(API_URL + "unite/search/", {
        params: { produit: searchTerm },
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
    fetchClient();
  }, []);

  const handleQuantityIncrease = (event) => {
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

  const totalPT = secondTableData.reduce(
    (acc, item) => acc + item.quantity * item.PU,
    0
  );

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
                              {item.produit_info.produit}
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
                title="Facturation"
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  padding: 1,
                }}
                titleTypographyProps={{
                  variant: "h1", // Adjust the variant to change the font size
                  sx: {
                    // fontSize: 20, // Directly set the font size
                    color: "white",
                    fontWeight: "bold", // Set the color of the title
                  },
                }}
              />
              <CardContent>
                {secondTableData.length === 0 ? (
                  <Typography variant="h3" align="center">
                    No product added
                  </Typography>
                ) : (
                  // Only display invoice details if a product is selected
                  <>
                    <TableContainer>
                      <Table>
                        <TableHead sx={{ backgroundColor: "transparent" }}>
                          <TableRow>
                            <TableCell sx={{ fontSize: 20 }}>Name</TableCell>
                            <TableCell sx={{ fontSize: 20 }}>unite</TableCell>
                            <TableCell align="right" sx={{ fontSize: 20 }}>
                              Quantity
                            </TableCell>
                            <TableCell align="right" sx={{ fontSize: 20 }}>
                              PU
                            </TableCell>
                            <TableCell align="right" sx={{ fontSize: 20 }}>
                              PT
                            </TableCell>
                            <TableCell align="right" sx={{ fontSize: 20 }}>
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {secondTableData.map((item) => (
                            <TableRow>
                              <TableCell sx={{ fontSize: 20 }}>
                                {item.nom}
                              </TableCell>
                              <TableCell sx={{ fontSize: 20 }}>
                                {item.unite}
                              </TableCell>
                              <TableCell align="right">
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                  justifyContent="end"
                                >
                                  <IconButton
                                    color="error"
                                    onClick={() =>
                                      inCreaseQuantity(item.id, item.quantity)
                                    }
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontSize: 20 }}
                                  >
                                    {item.quantity}
                                  </Typography>
                                  <IconButton
                                    color="secondary"
                                    onClick={() =>
                                      decreaseQuantity(item.id, item.quantity)
                                    }
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </Box>
                              </TableCell>
                              <TableCell align="right" sx={{ fontSize: 20 }}>
                                {item.PU}
                              </TableCell>
                              <TableCell align="right" sx={{ fontSize: 20 }}>
                                {item.quantity * item.PU}
                              </TableCell>
                              <TableCell align="right">
                                {/* <IconButton
                                 
                                  onClick={() => {
                                    setId(item.id);
                                    setopenModal(true);
                                  }}
                                >
                                  <EditIcon
                                    sx={{ color: blue }}
                                    fontSize="small"
                                  />
                                </IconButton> */}
                                <IconButton
                                  size="medium"
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
                        <TableFooter>
                          <TableRow sx={{ bgcolor: colors.primary[700] }}>
                            <TableCell
                              colSpan={4}
                              align="left"
                              sx={{ fontSize: 30, fontWeight: "bold" }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontSize: 30, fontWeight: "bold" }}
                            >
                              {totalPT}
                            </TableCell>
                            <TableCell />
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{
                        margin: 1,
                        fontSize: 20,
                      }}
                      onClick={() => setopenModal(true)}
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
            <Typography variant="h3" mb={2} sx={{ fontWeight: "bold" }}>
              Serveur
            </Typography>
            <Grid container spacing={2}>
              <Grid container spacing={2}>
                <FormControl fullWidth sx={{ marginTop: 5 }}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ fontSize: 20 }}
                  >
                    Serveur
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    size="small"
                    color="secondary"
                    onChange={(e) => {
                      setid_client(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {listclient.map((item) => (
                      <MenuItem value={item.id}>
                        {item.first_name} {item.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box mt={2}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  createEntre();
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
};

export default CommandeBar;