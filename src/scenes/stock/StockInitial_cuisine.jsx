import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
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
  Autocomplete,
  InputLabel,
  CardHeader,
  Typography,
  TablePagination,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_URL } from "../../data/Api";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../../components/Header";

const rowsPerPageOptions = [5, 10, 25];

function StockInitialCuisine() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();
  const [isdate, setisdate] = useState(false);
  const [items, setitems] = useState([]);
  const [du, setdu] = useState();
  const [au, setau] = useState();
  const [produit_id, setproduit_id] = useState();
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

  const validationSchema = Yup.object().shape({
    auDate: Yup.date()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .required("Au date is required"),
    duDate: Yup.date()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .required("Du date is required"),
    product: Yup.object()
      .shape({
        id: Yup.number().required("Product selection is required"),
        nom: Yup.string().required("Product name is required"),
      })
      .nullable()
      .required("Product selection is required"),
  });

  const MyForm = () => (
    <Formik
      initialValues={{ auDate: "", duDate: "", product: null }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission
      }}
    >
      {({ errors, touched, setFieldValue, handleBlur }) => (
        <Form>
          <Grid item xs={12} sm={4}>
            <InputLabel htmlFor="au-input">Du</InputLabel>
            <Field name="auDate" type="date" as={TextField} />
            <ErrorMessage name="auDate" component="div" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel htmlFor="du-input">au</InputLabel>
            <Field name="duDate" type="date" as={TextField} />
            <ErrorMessage name="duDate" component="div" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              id="product-autocomplete"
              options={items}
              getOptionLabel={(item) => item.nom}
              onChange={(event, value) => setFieldValue("product", value)}
              onOpen={handleBlur}
              includeInputInList
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(touched.product && errors.product)}
                  fullWidth
                  helperText={touched.product && errors.product}
                  label="Product"
                  name="product"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button type="submit" variant="contained" color="secondary">
              Search
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );

  const fetchdata = () => {
    axios.get(API_URL + "finance/").then((response) => {
      setData([response.data]);
    });
  };
  const fetchdatabyparams = () => {
    const data = {
      du: du,
      au: au,
    };
    if (produit_id !== undefined) {
      data.produit = produit_id;
    }
    const options = {
      params: data,
      headers: { "Content-Type": "application/json" },
    };
    axios.get(API_URL + "finance/", options).then((response) => {
      setData([response.data]);
    });
  };
  const searchdata = () => {
    axios
      .get(API_URL + `produits/search/?search=${search}`)
      .then((response) => setitems(response.data));
  };

  useEffect(() => {
    if (search !== undefined) {
      searchdata();
    }
  }, [search]);

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
          <Grid item sm={2}>
            <InputLabel htmlFor="au-input">Date</InputLabel>
            <input
              type={isdate ? "date" : "text"}
              onClick={() => setisdate(true)}
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
                setdu(e.target.value);
                console.log(e.target.value, "change");
              }}
            />
          </Grid>
          
          <Grid item sm={2}>
            <InputLabel htmlFor="au-input">Produit</InputLabel>
            <Autocomplete
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
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item sm={1}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 3 }}
              onClick={fetchdatabyparams}
              fullWidth
            >
              <SearchIcon />
            </Button>
          </Grid>
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
                      <TableCell>Produit</TableCell>
                      <TableCell align="right">Date</TableCell>
                      <TableCell align="right">Etat Stock</TableCell>
                      <TableCell align="right">Nombre entre</TableCell>
                      <TableCell align="right">Nombre sortie</TableCell>
                      <TableCell align="right">Perte</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.length !== 0 ? (
                      data.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.periode}</TableCell>
                          <TableCell align="right">
                            {row.nombre_entre}
                          </TableCell>
                          <TableCell align="right">
                            {row.montant_entre} BIF
                          </TableCell>
                          <TableCell align="right">
                            {row.nombre_sortie}
                          </TableCell>
                          <TableCell align="right">
                            {row.montant_sortie} BIF
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
                            No data
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
    </Box>
  );
}

export default StockInitialCuisine;
