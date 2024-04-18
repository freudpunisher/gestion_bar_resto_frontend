import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
// import { API_Url } from "../../data/API";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { API_URL } from "../../data/Api";
import { useNavigate } from "react-router-dom";
// import ReactToPrint from 'react-to-print';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const SortieStockCuisine = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() is zero-based
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [openModalu, setopenModalu] = useState(false);
  const [openModalv, setopenModalv] = useState(false);
  const [Category, setCategory] = useState();
  const [type, settype] = useState();
  function generateRandomCode(length) {
    const characters = "0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  // Example usage:
  const code = generateRandomCode(4);
  const [generatedCode, setGeneratedCode] = useState(
    `SRT${currentYear}${currentMonth}${code}`
  );
  const [generatedCodeu, setGeneratedCodeu] = useState();
  const [Categoryu, setCategoryu] = useState();
  const [typeu, settypeu] = useState();
  const [quantite, setquantite] = useState();
  const [quantiteu, setquantiteu] = useState();
  const [genre, setgenre] = useState();
  const [genreu, setgenreu] = useState();
  const [barcode, setbarcode] = useState();
  const [dataforupdate, setdataForupdate] = useState([]);
  const [name, setname] = useState();
  const [nameu, setnameu] = useState();
  const [priceu, setpriceu] = useState();
  const [price, setprice] = useState();
  const [boite, setboite] = useState();
  const [id, setid] = useState();
  const [validated_by, setvalidated_by] = useState();
  const [unite, setunite] = useState([]);
  const [famille, setFamille] = useState([]);
  const [Product, setProduct] = useState([]);
  const [fournisseur, setfournisseur] = useState([]);
  const [listentreproduit, setlistentreproduit] = useState([]);
  const [listproduit, setlistproduit] = useState([]);
  const [description, setdescription] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [descriptionu, setdescriptionu] = useState();
  const [nombrepillule, setnombrepillule] = useState();
  const [nombreplaquette, setnombreplaquette] = useState();
  const [prixplaquette, setprixplaquette] = useState();
  const [idforvalidation, setidforvalidation] = useState();
  const [prixpillule, setprixpillule] = useState();
  const [isPrinting, setIsPrinting] = useState(false);
  const [rows, setRows] = useState([]);
  // setidforvalidation()

  var productdata = listentreproduit.map((obj) => ({
    id: obj.id,
    reference: obj.reference,
    client: obj.client_info.client,
    created_by: obj.created_by_info.user,
    created_at: obj.created_at,
    validated_by: obj.validated_by,
  }));
  var produitdata = listproduit.map((obj) => ({
    id: obj.id,
    reference: obj.reference,
    produit: obj.produit_info.produit,
    mouvement_sortie: obj.mouvement_sortie_info.mouvement_sortie,
    quantite: obj.quantite,
  }));
  const dataGridRef = useRef();
  const handleClose = () => {
    setopenModal(false);
  };
  const handleCloseforupdate = () => {
    setopenModalu(false);
  };
  const handleCloseforView = () => {
    setopenModalv(false);
  };

  const fetchProduct = () => {
    axios.get(API_URL + "produit/").then((response) => {
      setProduct(response.data);
    });
  };
  const fetchfournisseur = () => {
    axios.get(API_URL + "client/").then((response) => {
      setfournisseur(response.data);
    });
  };
  console.log(currentDay);
  console.log(currentMonth);
  const createUnite = () => {
    axios
      .post(API_URL + "produit/", {
        nom: name,
        famille: type,
        unite_mesure: genre,
        description: quantite,
        code: generatedCode,
        barcode: barcode,
      })
      .then((response) => {
        handleClose();
        fetchProduct();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const createentreproduit = () => {
    axios
      .post(API_URL + "mouvement/sortie/", {
        reference: generatedCode,
        description: description,
        client: type,
        created_by: 1,
      })
      .then((response) => {
        handleClose();
        fetchentreproduit();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const fetchProduit = (id) => {
    axios.get(API_URL + `sortie/mouvement/${id}/`).then((response) => {
      setlistproduit(response.data);
    });
  };
  // const updateentreProduit = (id) => {
  //   axios.patch(API_URL + `entre/mouvement/1/`,{
  //     validated_by:1
  //   }).then(response => {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'operation reussi',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     })
  //   });
  // };
  var updatequantity = listproduit.map((obj) => ({
    id: obj.produit,
    // reference:obj.reference ,
    // produit:obj.produit_info.produit,
    // mouvement_sortie: obj.mouvement_sortie_info.mouvement_sortie,
    quantite: obj.quantite,
  }));

  const sendata = () => {
    axios.patch(API_URL + "sortie/update/quantite/", updatequantity, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const updatevalidated_by = () => {
    axios
      .patch(API_URL + `mouvement/sortie/${id}/`, {
        validated_by: 1,
      })
      .then((response) => {
        axios.patch(API_URL + "sortie/update/quantite/", updatequantity, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        handleCloseforView();
        fetchentreproduit();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const updateentreproduit = () => {
    axios
      .patch(API_URL + `mouvement/entre/${id}/`, {
        reference: generatedCodeu,
        description: quantiteu,
        fournisseur: typeu,
        created_by: 1,
      })
      .then((response) => {
        handleCloseforupdate();
        fetchentreproduit();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const fetchentreproduit = () => {
    axios.get(API_URL + "mouvement/sortie/").then((response) => {
      setlistentreproduit(response.data);
    });
  };

  const findname = (item) => {
    const result = fournisseur.find((name) => name.id === item);
    console.log(result, "result");
    setname(result.first_name + result.last_name);
  };
  console.log(name, "the nme");
  const updateUnite = () => {
    axios
      .patch(API_URL + `unite/${id}/`, {
        desigantion: nameu,
        code: descriptionu,
      })
      .then((response) => {
        handleCloseforupdate();
        fetchunite();
        Swal.fire({
          icon: "success",
          title: "operation reussi",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const fetchunite = () => {
    axios.get(API_URL + "unite/").then((response) => {
      setunite(response.data);
    });
  };
  const fetchBarCode = () => {
    axios.get(API_URL + "barcode/").then((response) => {
      setbarcode(response.data.barcode);
    });
  };

  useEffect(() => {
    // fetchunite();
    // fetchBarCode();
    // fetchProduct();;
    fetchfournisseur();
    fetchentreproduit();
  }, []);
  // const fetchData = () => {
  //   axios.get(API_Url+"medication/list/").then((response) => {
  //     setData(response.data);
  //   })
  // }
  // useEffect(()=>{
  //   fetchData();
  // },[])*
  
  const id_user = sessionStorage.getItem("user_id");
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

  const FetchFamille = () => {
    axios.get(API_URL + "famille/").then((response) => {
      setFamille(response.data);
    });
  };
  //   const fetchunite =() => {
  //     axios.get(API_URL+'unite/').then((response) => {
  // setunite(response.data);
  //   });}

  useEffect(() => {
    FetchFamille();
    fetchunite();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "reference",
      headerName: "Référence",
      flex: 1,
      //   cellClassName: "name-column--cell",
    },
    {
      field: "client",
      headerName: "Client",
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
      field: "created_at",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "validated_by",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) =>
        params.row.validated_by === null ? "suspendu" : "valide",
    },
    {
      field: "created_by",
      headerName: "Créé par",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    // {
    //   field: "created_by",
    //   headerName: "Cree par",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },

    // {
    //   field: "unite_mesure",
    //   headerName: "Unite",
    //   flex: 1,
    // },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
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
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => {
              console.log(params.row);
              navigate("/sortie/produit", { state: params.row.id });
              // setdataForupdate(params.row)
              // setnameu(params.row.fournisseur);
              // setdescriptionu(params.row.description);
              // setGeneratedCodeu(params.row.reference);
              // setquantiteu(params.row.description);
              // findname(params.row.fournisseur);

              // setpriceu(params.row.price);
              // settypeu(params.row.packaging_type);
              // setquantiteu(params.row.quantite);
              // setCategoryu(params.row.category);
              // setgenreu(params.row.genre);
              // setid(params.row.id);
              // setvalidated_by(params.row.validated_by);
            }}
          >
            <FolderIcon />
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
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    axios
                      .delete(API_URL + `mouvement/entre/${params.row.id}/`)
                      .then((response) => fetchentreproduit());
                  }
                })
                .then((response) => {
                  fetchentreproduit();
                  fetchunite();
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success",
                  });
                  if (response.status === 200) {
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
                  fetchentreproduit();
                });
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              setopenModalv(true);
              fetchProduit(params.row.id);
              setid(params.row.id);
              setvalidated_by(params.row.validated_by);
            }}
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
        title="Mouvement Sortie"
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
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginRight: "auto" }}
            onClick={() => setopenModal(true)}
          >
            Ajouter Sortie
          </Button>
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
              {/* <Grid item xs={6}>

    <TextField
      name="Nom"
      label="Nom"
      onChange={(e)=>setname(e.target.value)}
      fullWidth
      size='small'
    />
    </Grid> */}
              <Grid item xs={6}>
                <TextField
                  name="code"
                  label="Code"
                  value={generatedCodeu}
                  disabled
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">{nameu}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={typeu}
                    onChange={(e) => {
                      settypeu(e.target.value);
                    }}
                  >
                    <MenuItem>{name}</MenuItem>
                    {fournisseur.map((item) => (
                      <MenuItem value={item.id}>
                        {item.first_name} {item.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={6}>

    <TextField
      name="Barcode"
      label="Barcode"
      value={barcode}
     disabled
      fullWidth
      size='small'
    />
    </Grid> */}
              <Grid item xs={12}>
                <TextField
                  name="DeScription"
                  label="Description"
                  value={quantiteu}
                  onChange={(e) => setquantiteu(e.target.value)}
                  fullWidth
                  size="small"
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
                onClick={() => {
                  updateentreproduit();
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
      <Modal open={openModalv} onClose={handleCloseforView}>
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
            <TableContainer
              style={{ border: "1px solid black", borderRadius: "4px" }}
            >
              <Table
                style={{ borderCollapse: "collapse" }}
                aria-label="simple table"
              >
                <TableHead c>
                  <TableRow sx={{ border: 2 }}>
                    <TableCell sx={{ border: 2 }}>ID</TableCell>
                    <TableCell sx={{ border: 2 }}>Produit</TableCell>
                    {/* <TableCell>Mouvement Entre</TableCell> */}
                    <TableCell sx={{ border: 2 }}>Quantite</TableCell>
                    {/* <TableCell>Prix Unitaire</TableCell>
            <TableCell>Prix Total</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {produitdata.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 2 } }}
                    >
                      <TableCell component="th" scope="row" sx={{ border: 2 }}>
                        {row.id}
                      </TableCell>
                      <TableCell sx={{ border: 2 }}>{row.produit}</TableCell>
                      {/* <TableCell>{row.mouvement_entre}</TableCell> */}
                      <TableCell sx={{ border: 2 }}>{row.quantite}</TableCell>
                      {/* <TableCell>{row.prix_unitaire}</TableCell>
              <TableCell>{row.prix_total}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
                {validated_by == null ? (
                  <TableFooter>
                    <TableRow>
                      <TableCell>
                        {validated_by == null ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={updatevalidated_by}
                          >
                            valide
                          </Button>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                ) : null}
              </Table>
            </TableContainer>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default SortieStockCuisine;
