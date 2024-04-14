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
const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([])
  const [openModal, setopenModal] = useState(false)
  const [openModalu, setopenModalu] = useState(false)
  const [Category, setCategory] = useState()
  const [type, settype] = useState()
  const [Categoryu, setCategoryu] = useState()
  const [typeu, settypeu] = useState()
  const [quantite, setquantite] = useState() 
  const [quantiteu, setquantiteu] = useState()
  const [genre, setgenre] = useState()
  const [genreu, setgenreu] = useState()
  const [dataforupdate, setdataForupdate] = useState([])
  const [name, setname] = useState()
  const [nameu, setnameu] = useState()
  const [priceu, setpriceu] = useState()
  const [nom, setnom] = useState()
  const [boite, setboite] = useState()
  const [id, setid] = useState()
  const [famille, setFamille] = useState([])
  const [description, setdescription] = useState()
  const [selectedDate, setSelectedDate] = useState('');
  const [descriptionu, setdescriptionu] = useState()
  const [nombrepillule, setnombrepillule] = useState()
  const [nombreplaquette, setnombreplaquette] = useState()
  const [prixplaquette, setprixplaquette] = useState()
  const [prixpillule, setprixpillule] = useState()
  const [isPrinting, setIsPrinting] = useState(false);
  const [rows, setRows] = useState([]);
  const dataGridRef = useRef();
  const handleClose = ()=>{
    setopenModal(false);
  }
   const handleCloseforupdate = ()=>{
    setopenModalu(false);
  }
  // const fetchData = () => {
  //   axios.get(API_Url+"medication/list/").then((response) => {
  //     setData(response.data);
  //   })
  // }
  // useEffect(()=>{
  //   fetchData();
  // },[])

  const FetchFamille = ()=>{
    axios.get(API_URL+'famille/').then((response) => {
      setFamille(response.data);
  })}
useEffect(()=>{
  FetchFamille();
},[])

const updateFamille = ()=>{
  axios.patch(API_URL+`famille/${id}/`,{nom:nameu}).then((response) => {
    handleCloseforupdate()
//     Swal.fire({
//       icon: 'success',
//       title: 'operation reussi',
//       showConfirmButton: false,
//       timer: 3000,
// })
FetchFamille()
})}
const DeleteFamille = ()=>{
  axios.delete(API_URL+`famille/${id}/`,).then((response) => {
    handleCloseforupdate()
//     Swal.fire({
//       icon: 'success',
//       title: 'operation reussi',
//       showConfirmButton: false,
//       timer: 3000,
// })
FetchFamille()
})}

  const createFamille =()=>{
    axios.post(API_URL+'famille/',{'nom':nom},{
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response=>{console.log(response)
    handleClose()
    // Swal.fire({
    //         icon: 'success',
    //         title: 'operation reussi',
    //         showConfirmButton: false,
    //         timer: 3000,
    //   })
    FetchFamille()
    });
  }
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
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "nom",
      headerName: "Nom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "category",
    //   headerName: "Category",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "packaging_type",
    //   headerName: "type",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "genre",
    //   headerName: "genre",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "price",
    //   headerName: "Prix",
    //   flex: 1,
    // },
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
            setnameu(params.row.nom);
            // setdescriptionu(params.row.description);
            // setpriceu(params.row.price);
            // settypeu(params.row.packaging_type);
            // setquantiteu(params.row.quantite);
            // setCategoryu(params.row.category);
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
                  axios.delete(API_URL+`famille/${id}/`,).then(response =>{
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your item has been deleted.",
                      icon: "success"
                    });
                    FetchFamille()
                    if (response.status ===  204) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                      });
                    }else {
                      Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the item.",
                        icon: "error"
                      });
                    }
                  })
                }
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
        title="Produits"
        subtitle="Listes des produits"
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
      <Button variant="contained" color="secondary"  sx={{ marginRight:'auto'}} onClick={()=> setopenModal(true)}>Ajouter famille</Button>
      {/* <Button variant="contained" color="primary"  sx={{ marginRight:'auto' }} onClick={handlePayButtonClick}>print</Button> */}
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={famille}
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
      {/* <motion.div
   initial={{ scale: 0 }}
   animate={{ rotate: 180, scale: 1 }}
   transition={{
     type: "spring",
     stiffness: 260,
     damping: 20
   }}
> */}
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
     Famille
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
  <InputLabel id="demo-simple-select-label">type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    value={type}
    onChange={(e)=>{settype(e.target.value);}}
  >
    <MenuItem value="Single">flacon</MenuItem>
    <MenuItem value="comprime">comprime</MenuItem>
    <MenuItem value="piece">piece</MenuItem>
    <MenuItem value="plaquette">plaquette</MenuItem>
    <MenuItem value="boite">boite</MenuItem>
    <MenuItem value="tube">tube</MenuItem>
  </Select>
</FormControl>
</Grid> */}
{/* <Grid item xs={6}>
    <FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label">type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    value={genre}
    onChange={(e)=>{setgenre(e.target.value);}}
  >
    <MenuItem value="specialite">specialite</MenuItem>
    <MenuItem value="generique">generique</MenuItem>
  </Select>
</FormControl>
</Grid> */}
{/* <Grid item xs={6}>

    <TextField
      name="name"
      label="Name"
      onChange={(e)=>setname(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid> */}
{/* <Grid item xs={6}>

    <TextField
      name="Description"
      label="Description"
      onChange={(e)=>setdescription(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid> */}
{/* <Grid item xs={6}>
    <TextField
      name="Quantite"
      label="Quantite"
      // onChange={(e)=>setquantite(e.target.value)}
      onKeyUp={(e)=>{alert(e.target.value)
    console.log(e.target.value)}}
      fullWidth
      size='small'
    />
    </Grid> */}
    <Grid item xs={12}>

   <TextField
      name="prix"
      label="Nom"
      onChange={(e)=>setnom(e.target.value)}
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
          createFamille()
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
    {/* </motion.div> */}
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
    <Typography variant="h5" mb={2}>
     update famille
    </Typography>
<Grid container spacing={2}>
<Grid item xs={6}>
{/* <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{Categoryu}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={Categoryu}
        onChange={(e)=>{setCategoryu(e.target.value);}}
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
    </FormControl> */}
  </Grid>
  {/* <Grid item xs={6}>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    value={genreu}
    onChange={(e)=>{setgenreu(e.target.value);}}
  >
    <MenuItem value="specialite">specialite</MenuItem>
    <MenuItem value="generique">generique</MenuItem>
  </Select>
</FormControl>
</Grid> */}
{/* <Grid item xs={6}>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">{typeu}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    value={type}
    onChange={(e)=>{settypeu(e.target.value);}}
  >
    <MenuItem value="Single">flacon</MenuItem>
    <MenuItem value="comprime">comprime</MenuItem>
    <MenuItem value="piece">piece</MenuItem>
    <MenuItem value="plaquette">plaquette</MenuItem>
    <MenuItem value="boite">boite</MenuItem>
    <MenuItem value="tube">tube</MenuItem>
  </Select>
</FormControl>
</Grid> */}
  <Grid item xs={12}>
    <TextField
      name="name"
      label="Name"
      value={nameu}
      onChange={(e) => setnameu(e.target.value)}
      fullWidth
      size='medium'
    />
  </Grid>
  {/* <Grid item xs={6}>
    <TextField
      name="Description"
      label="Description"
      value={descriptionu}
      onChange={(e) => setdescriptionu(e.target.value)}
      fullWidth
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      name="Quantite"
      label="Quantite"
      value={quantiteu}
      onChange={(e) => setquantiteu(e.target.value)}
      fullWidth
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      name="prix"
      label="prix"
      value={priceu}
      onChange={(e) => setpriceu(e.target.value)}
      fullWidth
    />
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

    <Box mt={2}>
      <Button
        style={{ marginRight: "10px" }}
        variant="contained"
        color="info"
        onClick={()=>{
          updateFamille();
          // updatecreatDrug();
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

export default Settings;
