import { Box, Modal,Typography, Button, TextField, Select, MenuItem, Stack, FormControl,InputLabel  } from '@mui/material'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
// import { API_Url } from "../../data/API";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { motion } from 'framer-motion';
import { API_URL } from '../../data/Api';
// import ReactToPrint from 'react-to-print';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const Fournisseur = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([])
  const [openModal, setopenModal] = useState(false)
  const [openModalu, setopenModalu] = useState(false)
  const [Category, setCategory] = useState()
  const [type, settype] = useState()
  function generateRandomCode(length) {
    const characters = '0123456789'
    const charactersLength = characters.length
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  // Example usage:
  const code = generateRandomCode(4)
  const [generatedCode, setGeneratedCode] = useState(`PR${code}`)
  const [Categoryu, setCategoryu] = useState()
  const [typeu, settypeu] = useState()
  const [quantite, setquantite] = useState() 
  const [quantiteu, setquantiteu] = useState()
  const [genre, setgenre] = useState()
  const [genreu, setgenreu] = useState()
  const [barcode, setbarcode] = useState()
  const [dataforupdate, setdataForupdate] = useState([])
  const [name, setname] = useState()
  const [nameu, setnameu] = useState()
  const [priceu, setpriceu] = useState()
  const [price, setprice] = useState()
  const [boite, setboite] = useState()
  const [id, setid] = useState()
  const [unite, setunite] = useState([])
  const [famille, setFamille] = useState([])
  const [Product, setProduct] = useState([])
  const [description, setdescription] = useState()
  const [selectedDate, setSelectedDate] = useState('');
  const [descriptionu, setdescriptionu] = useState()
  const [nombrepillule, setnombrepillule] = useState()
  const [nombreplaquette, setnombreplaquette] = useState()
  const [prixplaquette, setprixplaquette] = useState()
  const [prixpillule, setprixpillule] = useState()
  const [isPrinting, setIsPrinting] = useState(false);
  const [rows, setRows] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [firstNameu, setFirstNameu] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameu, setLastNameu] = useState('');
  const [address, setAddress] = useState('');
  const [addressu, setAddressu] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPersonu, setContactPersonu] = useState('');
  const [fournisseur, setFournissuer] = useState([]);
  const [email, setEmail] = useState('');
  const [emailu, setEmailu] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberu, setPhoneNumberu] = useState('');
  function printCard() {
    const cardWidth = 53.98; // Largeur en millimètres
    const cardHeight = 85.60; // Hauteur en millimètres
  
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
  
    // Injecter le contenu de votre carte dans la fenêtre d'impression
    printWindow.document.write('<html><head><title>Impression de la carte</title></head><body>');
  
    // Ajouter le contenu de votre carte ici
    printWindow.document.write('<div style="width: ' + cardWidth + 'mm; height: ' + cardHeight + 'mm; border: 1px solid black;">');
    // Contenu de la carte
    printWindow.document.write('</div>');
  
    printWindow.document.write('</body></html>');
    printWindow.document.close();
  
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
    };
  }
  var productdata = Product.map((obj) => ({
    id: obj.id,
    famille: obj.famille_info.famille,
    code: obj.code,
    nom: obj.nom,
    description: obj.description,
    barcode: obj.barcode,
  }));
  const dataGridRef = useRef();
  const handleClose = ()=>{
    setopenModal(false);
  }
   const handleCloseforupdate = ()=>{
    setopenModalu(false);
  }

  const fetchProduct = ()=>{
    axios.get(API_URL + 'produit/').then((response)=>{
setProduct(response.data);
    })
  }

  const createUnite = ()=>{
    axios.post(API_URL+'fournisseur/',{
        first_name :firstName,
        last_name :lastName,
        address :address,
        contact_person :contactPerson,
        email : email,
        phone_number :phoneNumber,
    }).then(response=>{
        handleClose();
        fetchContact();
            Swal.fire({
      icon: 'success',
      title: 'operation reussi',
      showConfirmButton: false,
      timer: 3000,
    })
    });
  };
  const updateUnite = ()=>{
    axios.patch(API_URL+`fournisseur/${id}/`,{
        first_name :firstNameu,
        last_name :lastNameu,
        address :addressu,
        contact_person :contactPersonu,
        email : emailu,
        phone_number :phoneNumberu,
    }).then(response=>{
        handleCloseforupdate();
        fetchContact();
            Swal.fire({
      icon: 'success',
      title: 'operation reussi',
      showConfirmButton: false,
      timer: 3000,
    })
    });
  };
  const fetchunite =() => {
    axios.get(API_URL+'unite/').then((response) => {
setunite(response.data);
  });}
  const fetchBarCode =() => {
    axios.get(API_URL+'barcode/').then((response) => {
setbarcode(response.data.barcode);
  });}

const fetchContact = () => {
    axios.get(API_URL+'fournisseur/').then((response) => {
        setFournissuer(response.data);
          });
}

  useEffect(() => {
    fetchunite();
    fetchBarCode();
    fetchProduct();
    fetchContact();
  },[]);
  // const fetchData = () => {
  //   axios.get(API_Url+"medication/list/").then((response) => {
  //     setData(response.data);
  //   })
  // }
  // useEffect(()=>{
  //   fetchData();
  // },[])
 const id_user = sessionStorage.getItem('user_id');
// const creatDrug = () => {
//   axios.post(API_Url+"medication/list/", {
//   name: name,
//   boite: boite,
//   dateexpiration:selectedDate,
//   genre:genre,
//   quantite: quantite,
//   description: description,
//   price: price,
//   category:Category,
//   // stock: 2147483647,0
//   packaging_type: type,
//   created_by: id_user
//   }).then((response) => {
//     setopenModal(false)
//     Swal.fire({
//       icon: 'success',
//       title: 'medicament  Ajoute',
//       showConfirmButton: false,
//       timer: 3000,
//     })
//     fetchData()
//   }).catch((error) => {
//     Swal.fire({
//       icon: 'error',
//       title: 'eros',
//       showConfirmButton: false,
//       timer: 3000,
//     })
//   })
// }
// const updatecreatDrug = () => {
//   axios.patch(API_Url+`medication/detail/${id}/`, {
//   name: nameu,
//   quantite: quantiteu,
//   description: descriptionu,
//   price: priceu,
//   category:Categoryu,
//   // stock: 2147483647,0
//   packaging_type: typeu,
//   created_by: 4
//   }).then((response) => {
//     setopenModalu(false)
//     Swal.fire({
//       icon: 'success',
//       title: 'operation reussi',
//       showConfirmButton: false,
//       timer: 3000,
//     })
//     fetchData()
//   }).catch((error) => {
//     setopenModalu(false)
//     Swal.fire({
//       icon: 'error',
//       title: 'eros',
//       showConfirmButton: false,
//       timer: 3000,
//     })
//   })
// }

const FetchFamille = ()=>{
    axios.get(API_URL+'famille/').then((response) => {
      setFamille(response.data);
  })}
//   const fetchunite =() => {
//     axios.get(API_URL+'unite/').then((response) => {
// setunite(response.data);
//   });}

  useEffect(() =>{
    FetchFamille();
    fetchunite();
  },[])
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "first_name",
      headerName: "Nom",
      flex: 1,
    //   cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Prenom",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    // {
    //     field: "barcode",
    //     headerName: "Barcode",
    //     flex: 1,
    //     cellClassName: "name-column--cell",
    //   },
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
   
    // // {
    // //   field: "email",
    // //   headerName: "Email",
    // //   flex: 1,
    // // },
    // {
    //   field: "quantite",
    //   headerName: "Quantite",
    //   flex: 1,
    // },
    // {
    //   field: "created_by",
    //   headerName: "cree par",
    //   flex: 1,
    // },
    // {
    //   field: "created_at",
    //   headerName: "Date",
    //   flex: 1,
    // },
    // {
    //   field: "dateexpiration",
    //   headerName: "data d'expiration",
    //   flex: 1,
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      width:  150,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => {console.log(params.row)
              setopenModalu(true);
            // setdataForupdate(params.row)
            setFirstNameu(params.row.first_name);
            setLastNameu(params.row.last_name);
            setEmailu(params.row.email);
            setContactPersonu(params.row.contact_person);
            setAddressu(params.row.address);
            setPhoneNumberu(params.row.phone_number);
            // setgenreu(params.row.genre);
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
                confirmButtonText: "Yes, delete it!"
              }).then((result)=>{
                if (result.isConfirmed){
                  axios.delete(API_URL+`fournisseur/${params.row.id}/`)
                }
              }).then(response =>{
                fetchContact();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success"
                  });
                // if (response.status ===  200) {
                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your item has been deleted.",
                //     icon: "success"
                //   });
                // }else {
                //   Swal.fire({
                //     title: "Error!",
                //     text: "An error occurred while deleting the item.",
                //     icon: "error"
                //   });
                // }
              })
            }}
          >
            <DeleteIcon />
          </IconButton>
          {/* <IconButton
            aria-label="delete"
            onClick={() => console.log(params.row)}
          >
            <VisibilityIcon />
          </IconButton> */}
        </div>
      ),
    },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];
console.log(selectedDate);
// const handlePageChange = (params) => {
//   setPage(params.page);
// };

const handlePayButtonClick = () => {
  const firstPageRows = dataGridRef.current.getVisibleRows();
    setRows(firstPageRows);
    console.log(firstPageRows);
    window.print();
 };
  return (
    <Box m="20px">
      <Header
        title="Fournisseur"
        // subtitle="Listes des produits"
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
        {/* <ReactToPrint
        trigger={() => (
          <Button variant="contained" color="primary" sx={{ marginRight: 'auto' }}>
            Print
          </Button>
        )}
        content={() => dataGridRef.current}
      /> */}
      <Button variant="contained" color='secondary'   sx={{ marginRight:'auto'}} onClick={()=> setopenModal(true)}>Ajouter Fournisseur</Button>
      {/* <Button variant="contained" color="primary"  sx={{ marginRight:'auto' }} onClick={handlePayButtonClick}>print</Button> */}
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={fournisseur}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <>
      <style media="print">
        {`
          @page {
            size: auto; /* auto is the initial value */
            margin:   0mm; /* this affects the margin in the printer settings */
          }
          body {
            margin:   1cm; /* this affects the margin on the content before sending to printer */
          }
        `}
      </style>
      <table id="printableArea" className="hiddenOnScreen" style={{ display: 'none' }}>
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
    
      </>
      /**Add medication */
     
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
      onChange={(e)=>setFirstName(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={6}>

    <TextField
      name="Prenom"
      label="Prenom"
      onChange={(e)=>setLastName(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
<Grid item xs={6}>

    <TextField
      name="code"
      label="Adresse"
      onChange={(e)=>setAddress(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={6}>

    <TextField
      name="Barcode"
      label="Contact"
      onChange={(e)=>setContactPerson(e.target.value)}
      
      fullWidth
      size='small'
    />
    </Grid>
<Grid item xs={6}>
    <TextField
      name="DeScription"
      label="Email"
      onChange={(e)=>setEmail(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={6}>

   <TextField
      name="prix"
      label="Phone"
      onChange={(e)=>setPhoneNumber(e.target.value)}
      fullWidth
      size='small'
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
        onClick={()=>{
            createUnite();
          // creatDrug();
        }}
      >
        Save
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClose}>
        close
      </Button>
    </Box>
 </Stack>
</Box>
    </Modal>
     /**update medication */

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
      onChange={(e)=>setFirstNameu(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={6}>

    <TextField
      name="Prenom"
      label="Prenom"
      value={lastNameu}
      onChange={(e)=>setLastNameu(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
<Grid item xs={6}>

    <TextField
      name="code"
      label="Adresse"
      value={addressu}
      onChange={(e)=>setAddressu(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={6}>

    <TextField
      name="Barcode"
      label="Contact"
      value={contactPersonu}
      onChange={(e)=>setContactPersonu(e.target.value)}
      
      fullWidth
      size='small'
    />
    </Grid>
<Grid item xs={6}>
    <TextField
      name="DeScription"
      label="Email"
      value={emailu}
      onChange={(e)=>setEmailu(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={6}>

   <TextField
      name="prix"
      label="Phone"
      value={phoneNumberu}
      onChange={(e)=>setPhoneNumberu(e.target.value)}
      fullWidth
      size='small'
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
        onClick={()=>{
            updateUnite();
          // creatDrug();
        }}
      >
        Save
      </Button>
      <Button variant="contained" color="secondary" onClick={handleCloseforupdate}>
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
