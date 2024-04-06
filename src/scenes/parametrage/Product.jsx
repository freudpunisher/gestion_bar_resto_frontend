import { Box, Modal,Typography, Button, TextField, Select, MenuItem, Stack, FormControl,InputLabel  } from '@mui/material'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
// import { API_Url } from "../../data/API";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import Swal from 'sweetalert2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { motion } from 'framer-motion';
import { API_URL } from '../../data/Api';
import { useNavigate } from 'react-router-dom';
// import ReactToPrint from 'react-to-print';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const Product = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([])
  const [openModal, setopenModal] = useState(false)
  const [openModalu, setopenModalu] = useState(false)
  const [Category, setCategory] = useState()
  const [type, settype] = useState()
  function generateRandomCode() {
    const characters = '0123456789'
    const charactersLength = characters.length
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  // Example usage:
  const code= generateRandomCode()
  const [codeu, setcodeu] = useState()
  const [generatedCode, setGeneratedCode] = useState(`PR${code}`)
  const [Categoryu, setCategoryu] = useState()
  const [typeu, settypeu] = useState()
  const [quantite, setquantite] = useState() 
  const [quantiteu, setquantiteu] = useState()
  const [genre, setgenre] = useState()
  const [genreu, setgenreu] = useState()
  const [barcode, setbarcode] = useState()
  const [barcodeu, setbarcodeu] = useState()
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
  var productdata = Product.map((obj) => ({
    id: obj.id,
    famille: obj.famille_info.famille,
    unite_mesure: obj.unite_mesure_info.unite_mesure,
    code: obj.code,
    nom: obj.nom,
    barcode: obj.barcode,
    description: obj.description,
    prix_vente: obj.prix_vente
    // barcode: obj.barcode,
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
    const newCode = generateRandomCode();
//  const [generatedCode, setGeneratedCode] = useState(`PR${newCode}`);

    axios.post(API_URL+'produit/',{
        nom:name,
        famille:type,
        unite_mesure:genre,
        description:quantite,
        code:'PR'+newCode,
        barcode:barcode,
        prix_vente:price
    }).then(response=>{
        handleClose();
        fetchProduct();
    //         Swal.fire({
    //   icon: 'success',
    //   title: 'operation reussi',
    //   showConfirmButton: false,
    //   timer: 3000,
    // })
    fetchBarCode();
generateRandomCode(4)
    });
  };
  const updateUnite = ()=>{
    axios.patch(API_URL+`produit/${id}/`,{
      nom:nameu,
      famille:typeu,
      unite_mesure:genreu,
      description:quantiteu,
      prix_vente:priceu
    }).then(response=>{
        handleCloseforupdate();
        fetchunite();
    //         Swal.fire({
    //   icon: 'success',
    //   title: 'operation reussi',
    //   showConfirmButton: false,
    //   timer: 3000,
    // })
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

  useEffect(() => {
    fetchunite();
    fetchBarCode();
    fetchProduct();
  },[]);
  useEffect(() => {
    generateRandomCode()

  },[barcode]);
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
const sinkfamilleandunite = (item)=>{
const result = productdata.find(item => item.id === item)
settypeu(result.famille)
}

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    //   cellClassName: "name-column--cell",
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
        field: "unite_mesure",
        headerName: "Unite",
        flex: 1,
      },
    {
      field: "prix_vente",
      headerName: "prix de vente",
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
              // sinkfamilleandunite(params.row.id)
            // setdataForupdate(params.row)
            setnameu(params.row.nom);
            setdescriptionu(params.row.description);
            setpriceu(params.row.prix_vente);
setbarcodeu(params.row.barcode);
setcodeu(params.row.code);
            settypeu(params.row.famille);
            // setquantiteu(params.row.quantite);
            // setCategoryu(params.row.category);
            setgenreu(params.row.unite_mesure);
            setid(params.row.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            // onClick={() => {
            //   Swal.fire({
            //     title: "Are you sure?",
            //     text: "You won't be able to revert this!",
            //     icon: "warning",
            //     showCancelButton: true,
            //     confirmButtonColor: "#3085d6",
            //     cancelButtonColor: "#d33",
            //     confirmButtonText: "Yes, delete it!"
            //   }).then((result)=>{
            //     if (result.isConfirmed){
            //       axios.delete(API_URL+`produit/${params.row.id}/`)
            //     }
            //   }).then(response =>{
            //     fetchunite();
            //     fetchProduct();
            //     Swal.fire({
            //         title: "Deleted!",
            //         text: "Your item has been deleted.",
            //         icon: "success"
            //       });
                
            //   })
            // }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => navigate('/barcode', {state: {barcode:params.row.barcode, id:params.row.id}})}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];
// console.log(selectedDate);
// const handlePageChange = (params) => {
//   setPage(params.page);
// };

const handlePayButtonClick = () => {
  const firstPageRows = dataGridRef.current.getVisibleRows();
    setRows(firstPageRows);
    console.log(firstPageRows);
    window.print();
 };
 console.log(typeu, 'FAMILLE')
  return (
    <Box m="20px">
      <Header
        title="Produit"
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
      <Button variant="contained" color="secondary"  sx={{ marginRight:'auto'}} onClick={()=> {setopenModal(true)
      generateRandomCode(4)
      }}>Ajouter Produit</Button>
      {/* <Button variant="contained" color="primary"  sx={{ marginRight:'auto' }} onClick={handlePayButtonClick}>print</Button> */}
        </Box>
        <DataGrid
          checkboxSelection
          ref={dataGridRef}
          rows={productdata}
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
<Grid item xs={6}>
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
</Grid>
<Grid item xs={6}>
  

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    label="Age"
    size='small'
    // onChange={handleChange}
  >
    <MenuItem value={10}>Bar</MenuItem>
    <MenuItem value={20}>Cuisine</MenuItem>
    {/* <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>
</FormControl>
   </Grid> 
<Grid item xs={6}>

    <TextField
      name="Nom"
      label="Nom"
      onChange={(e)=>setname(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
   
<Grid item xs={3}>

    <TextField
      name="code"
      label="Code"
      value={generatedCode}
      disabled
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={3}>

    <TextField
      name="Barcode"
      label="Barcode"
      value={barcode}
     disabled
      fullWidth
      size='small'
    />
    </Grid>
<Grid item xs={12}>
    <TextField
      name="DeScription"
      label="Description"
      onChange={(e)=>setquantite(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
    
    {/* <Grid item xs={6}>

   <TextField
      name="prix"
      label="prix"
      onChange={(e)=>setprice(e.target.value)}
      fullWidth
      size='small'
    />
   </Grid>
   <Grid item xs={6}>
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
     update produit
    </Typography>
<Grid container spacing={2}>
<Grid item xs={6}>
    <FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label">{typeu}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label={typeu}
    value={typeu}
    onChange={(e)=>{settypeu(e.target.value);}}
  >
    {/* <MenuItem>{typeu}</MenuItem> */}
    {famille.map(item =>(
    <MenuItem value={item.id}>{item.nom}</MenuItem>))}
    
  </Select>
</FormControl>
</Grid>
<Grid item xs={6}>
    <FormControl fullWidth size='small'>
  <InputLabel id="demo-simple-select-label">{genreu}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    value={genreu}
    onChange={(e)=>{setgenreu(e.target.value);}}
  >
   {unite.map(item =>(
    <MenuItem value={item.id}>{item.desigantion} ({item.code})</MenuItem>))}
    
  </Select>
</FormControl>
</Grid>
<Grid item xs={6}>

    <TextField
      name="Nom"
      label="Nom"
      value={nameu}
      onChange={(e)=>setnameu(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
   
<Grid item xs={3}>

    <TextField
      name="code"
      label="Code"
      value={codeu}
      disabled
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={3}>

    <TextField
      name="Barcode"
      label="Barcode"
      value={barcodeu}
     disabled
      fullWidth
      size='small'
    />
    </Grid>
    <Grid item xs={6}>

<TextField
  name="Nom"
  label="Prix de vente"
  value={priceu}
  onChange={(e)=>setpriceu(e.target.value)}
  fullWidth
  size='small'
/>
</Grid>
<Grid item xs={6}>
    <TextField
      name="DeScription"
      label="Description"
      value={descriptionu}
      onChange={(e)=>setdescriptionu(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid>
   
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
            updateUnite();
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

export default Product;
