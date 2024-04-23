import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import Swal from 'sweetalert2';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_URL } from "../../data/Api";
const MenuCuisine = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
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
  const [name, setname] = useState();
  const [nameupt, setnameupt] = useState();
  const [reduction, setreduction] = useState();
  const [reductionupt, setreductionupt] = useState();
  const [amount, setamount] = useState();
  const [amountupt, setamountupt] = useState();
  const [id, setid] = useState();
  const [Product, setProduct] = useState([]);
  const [description, setdescription] = useState();
  const [descriptionupt, setdescriptionupt] = useState();
  const [rows, setRows] = useState([]);
  
  // data liste menu cuisine
  var productdata = Product.map((obj) => ({
    id: obj.id,
    name: obj.name,
    description: obj.description,
    amount: obj.amount+ ' BIF',
    reduction: obj.reduction+ ' %',
  }));

  //data grid
  const dataGridRef = useRef();
  
  // close popup
  const handleClose = () => {
    setopenModal(false);
  };
  
  // close popup
  const handleCloseforupdate = () => {
    setopenModalu(false);
  };
  
  // liste menu cuisine
  const fetchProduct = () => {
    axios.get(API_URL + "ciusine/tarif/").then((response) => {
      setProduct(response.data);
    });
  };
  
  // creation menu cuisine
  const createUnite = () => {
    axios
      .post(API_URL + "ciusine/tarif/", {
        name: name,
        description: description,
        amount: amount,
        reduction: reduction,
      })
      .then((response) => {
        handleClose();
        fetchProduct();
      });
  };
  
  // update menu cuisine
  const updateUnite = () => {
    axios
      .patch(API_URL + `ciusine/tarif/${id}/`, {
        name: nameupt,
        description: descriptionupt,
        amount: amountupt,
        reduction: reductionupt,
      })
      .then((response) => {
        handleCloseforupdate();
        fetchProduct();
        // fetchunite();
        //         Swal.fire({
        //   icon: 'success',
        //   title: 'operation reussi',
        //   showConfirmButton: false,
        //   timer: 3000,
        // })
      });
  };
  
  // refresh liste
  useEffect(() => {
    fetchProduct();
  }, []);
  
  // colunm table
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Montant",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "reduction",
      headerName: "Reduction",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Déscription",
      flex: 1,
      cellClassName: "name-column--cell",
      hide: true,
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
              setnameupt(params.row.name);
              setdescriptionupt(params.row.description);
              setreductionupt(params.row.reduction);
              setamountupt(params.row.amount);
              setid(params.row.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
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
        title="Menu Cuisine" 
        subtitle="Listes des menus cuisines"
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
            onClick={() => {
              setopenModal(true);
              generateRandomCode(4);
            }}
          >
            Ajouter Menu cuisine
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
                <td key={column.field}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    
      {/* from nouveau menu cuisine --------------------------------------- */}
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
              Ajouter Menu cuisine
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Nom"
                  label="Nom"
                  onChange={(e) => setname(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="reduction"
                  label="reduction"
                  type="number"
                  value="0"
                  onChange={(e) => setreduction(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="Amount"
                  label="Montant"
                  type="number"
                  onChange={(e) => setamount(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="DeScription"
                  label="Description"
                  onChange={(e) => setdescription(e.target.value)}
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

      {/* form update --------------------------------------------- */}
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
              Modification Menu cuisine
            </Typography>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  name="Nom"
                  label="Nom"
                  value={nameupt}
                  onChange={(e) => setnameupt(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="reduction"
                  label="reduction"
                  value={reductionupt}
                  onChange={(e) => setreductionupt(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="Amount"
                  label="Montant"
                  value={amountupt}
                  onChange={(e) => setamountupt(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="DeScription"
                  label="Description"
                  value={descriptionupt}
                  onChange={(e) => setdescriptionupt(e.target.value)}
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

export default MenuCuisine;
