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
const Fournisseur = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);  
  const [id, setid] = useState();
  const [rows, setRows] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [firstNameu, setFirstNameu] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameu, setLastNameu] = useState("");
  const [address, setAddress] = useState("");
  const [addressu, setAddressu] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonu, setContactPersonu] = useState("");
  const [fournisseur, setFournissuer] = useState([]);
  const [email, setEmail] = useState("");
  const [emailu, setEmailu] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberu, setPhoneNumberu] = useState("");
  
  const dataGridRef = useRef();
  const handleClose = () => {
    setopenModal(false);
  };
  
  const handleCloseforupdate = () => {
    setopenModalu(false);
  };

  const createUnite = () => {
    axios
      .post(API_URL + "fournisseur/", {
        first_name: firstName,
        last_name: lastName,
        address: address,
        contact_person: contactPerson,
        email: email,
        phone_number: phoneNumber,
      })
      .then((response) => {
        handleClose();
        fetchContact();
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
      .patch(API_URL + `fournisseur/${id}/`, {
        first_name: firstNameu,
        last_name: lastNameu,
        address: addressu,
        contact_person: contactPersonu,
        email: emailu,
        phone_number: phoneNumberu,
      })
      .then((response) => {
        handleCloseforupdate();
        fetchContact();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  // liste fournisseur
  const fetchContact = () => {
    axios.get(API_URL + "fournisseur/").then((response) => {
      setFournissuer(response.data);
    });
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "first_name",
      headerName: "Nom",
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Prenom",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: "Telephone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact_person",
      headerName: "contact telephone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
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
              setFirstNameu(params.row.first_name);
              setLastNameu(params.row.last_name);
              setEmailu(params.row.email);
              setContactPersonu(params.row.contact_person);
              setAddressu(params.row.address);
              setPhoneNumberu(params.row.phone_number);
              setid(params.row.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              Swal.fire({
                title: "Etez-vous sur de vouloire supprimer cet fournisseur ?",
                text: "Après validation vous ne pouvez pas recuperer cette infomation supprimer !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Oui, Supprimer le!",
                cancelButtonText: "Annuler",
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    axios.delete(API_URL + `fournisseur/${params.row.id}/`);
                  }
                })
                .then((response) => {
                  fetchContact();
                  Swal.fire({
                    title: "Suppression!",
                    text: "Le fournisseur a été supprimer avec succès",
                    icon: "success",
                  });
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
      <Header title="Fournisseur" subtitle="Listes des fournisseur" />
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
            Ajouter Fournisseur
          </Button>
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={fournisseur}
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
      
      {/* form create fournisseur +++++++++++++++++++++++++++++++++++++++++++++++++++ */}
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
              Ajouter un nouveau fournisseur
            </Typography>
            <Grid container spacing={2}>              
              <Grid item xs={6}>
                <TextField
                  name="FistName"
                  label="Nom"
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Prenom"
                  label="Prenom"
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="code"
                  label="Adresse"
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Barcode"
                  label="Contact"
                  onChange={(e) => setContactPerson(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="DeScription"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="prix"
                  label="Phone"
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

      {/* form upudate fournisseur ++++++++++++++++++++++++++++++++++++++ */}
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
            <Typography variant="h5" mb={1}>
              Fournisseur
            </Typography>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
<FormControl fullWidth size='small'>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={Category}
        onChange={(e)=>{setCategory(e.target.value);}}
      >
        <MenuItem value="antispamedique">antispamedique</MenuItem>
        <MenuItem value="antiallergiques">antiallergiques</MenuItem>
        <MenuItem value="antieurmetiques">antieurmetiques</MenuItem>
        <MenuItem value="antifongiques">antifongiques</MenuItem>
        <MenuItem value="antigripaux">antigripaux</MenuItem>
        <MenuItem value="antalagiques">antalagiques</MenuItem>
        <MenuItem value="antiparasitaires">antiparasitaires</MenuItem>
        <MenuItem value="collyres">collyres</MenuItem>
        <MenuItem value="anti_diabetiques">anti diabetiques</MenuItem>
        <MenuItem value="anti_septiques">anti septiques</MenuItem>
      </Select>
    </FormControl>
  </Grid> */}
              {/* <Grid item xs={6}>
    <FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label">Selctionnez famille</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    value={type}
    onChange={(e)=>{settype(e.target.value);}}
  >
    {famille.map(item =>(
    <MenuItem value={item.id}>{item.nom}</MenuItem>))}
    
  </Select>
</FormControl>
</Grid> */}
              {/* <Grid item xs={6}>
    <FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label">Selectionnez unite de mesure</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    value={genre}
    onChange={(e)=>{setgenre(e.target.value);}}
  >
   {unite.map(item =>(
    <MenuItem value={item.id}>{item.desigantion} ({item.code})</MenuItem>))}
    
  </Select>
</FormControl>
</Grid> */}
              <Grid item xs={6}>
                <TextField
                  name="FistName"
                  label="Nom"
                  value={firstNameu}
                  onChange={(e) => setFirstNameu(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Prenom"
                  label="Prenom"
                  value={lastNameu}
                  onChange={(e) => setLastNameu(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="code"
                  label="Adresse"
                  value={addressu}
                  onChange={(e) => setAddressu(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="Barcode"
                  label="Contact"
                  value={contactPersonu}
                  onChange={(e) => setContactPersonu(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="DeScription"
                  label="Email"
                  value={emailu}
                  onChange={(e) => setEmailu(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="prix"
                  label="Phone"
                  value={phoneNumberu}
                  onChange={(e) => setPhoneNumberu(e.target.value)}
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* <Grid item xs={6}>
   <input type='date' value={selectedDate}
      onChange={(e)=> setSelectedDate(e.target.value)}  style={{
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width:'100%'
    // Add more styles as needed
  }}/>
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

            <Box mt={2} paddingLeft={2}>
              <Button
                style={{ marginRight: "10px" }}
                variant="contained"
                color="info"
                onClick={() => {
                  updateUnite();
                  // creatDrug();
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
    </Box>
  );
};

export default Fournisseur;
