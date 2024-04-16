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
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_URL } from "../../data/Api";

const InvantaireBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [nameu, setnameu] = useState();
  const [nom, setnom] = useState();
  const [id, setid] = useState();
  const [famille, setFamille] = useState([]);
  const [rows, setRows] = useState([]);
  const dataGridRef = useRef();
  const handleClose = () => {
    setopenModal(false);
  };
  const handleCloseforupdate = () => {
    setopenModalu(false);
  };
  
  // liste data famille
  const FetchFamille = () => {
    axios.get(API_URL + "famille/").then((response) => {
      setFamille(response.data);
    });
  };

  // refresh liste famille
  useEffect(() => {
    FetchFamille();
  }, []);

  // update famille
  const updateFamille = () => {
    axios.patch(API_URL + `famille/${id}/`, { nom: nameu }).then((response) => {
      handleCloseforupdate();
      //     Swal.fire({
      //       icon: 'success',
      //       title: 'operation reussi',
      //       showConfirmButton: false,
      //       timer: 3000,
      // })
      FetchFamille();
    });
  };

  // delete famille
  const DeleteFamille = () => {
    axios.delete(API_URL + `famille/${id}/`).then((response) => {
      handleCloseforupdate();
      //     Swal.fire({
      //       icon: 'success',
      //       title: 'operation reussi',
      //       showConfirmButton: false,
      //       timer: 3000,
      // })
      FetchFamille();
    });
  };
  
  // create famille
  const createFamille = () => {
    axios
      .post(
        API_URL + "famille/",
        { nom: nom },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        handleClose();
        // Swal.fire({
        //         icon: 'success',
        //         title: 'operation reussi',
        //         showConfirmButton: false,
        //         timer: 3000,
        //   })
        FetchFamille();
      });
  };
  
  // column table liste famille
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "produit",
      headerName: "Produit",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "unite_mesure",
      headerName: "Unite de mesure",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "unite_mesure",
      headerName: "Unite de mesure",
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
              setnameu(params.row.nom);
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
                  axios.delete(API_URL + `famille/${id}/`).then((response) => {
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your item has been deleted.",
                      icon: "success",
                    });
                    FetchFamille();
                    if (response.status === 204) {
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
      <Header title="Famille" subtitle="Listes des familles des produits" />
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
            Ajouter famille
          </Button>
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={famille}
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
      
      {/* form create invantaire bar  ----------------------------------------------- */}
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
              Ajouter nouvelle Famille
            </Typography>
            <Grid container spacing={2}>             
              <Grid item xs={12}>
                <TextField
                  name="prix"
                  label="Nom"
                  onChange={(e) => setnom(e.target.value)}
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
                  createFamille();
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
      
      {/* form update invantaire cuisine -------------------------------------------- */}
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
              Modifier famille
            </Typography>

            <Grid container spacing={2}>             
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  value={nameu}
                  onChange={(e) => setnameu(e.target.value)}
                  fullWidth
                  size="medium"
                />
              </Grid>              
            </Grid>

            <Box mt={2}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  updateFamille();
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

export default InvantaireBar;
