/* eslint-disable no-undef */
import * as React from 'react';
import { Box, Button, IconButton, Typography, useTheme, InputLabel,TextField, } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as XLSX from "xlsx";
// import XLSX from 'xlsx-style';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Bar', 159, 6.0, 24, 4.0),
  createData('Cuisine', 237, 9.0, 37, 4.3),
  createData('Total', 356, 16.0, 49, 3.9),
];

const Rapport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);  
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  
  // function genererRapportExcel() {
  //   // Création d'un nouveau classeur Excel
  //   const classeur = XLSX.utils.book_new();
  
  //   // Création des données du rapport
  //   const rapportData = [
  //     ['RAPPORT ACTIVITE DE 01/05/2024 AU 30/05/2024'],
  //     ['MONTANT SUR LES ACTIVITES'],
  //     ['ACTIVITE', 'BAR', 'CUISINE', 'TOTAL'],
  //     ['Approvisionnement', 200000, 150000, 350000],
  //     ['Facture', 350000, 200000, 550000],
  //     ['Perte', 40000, 30000, 70000],
  //     ['Benefice', 110000, 20000, 130000],
  //     [],
  //     ['RECOUVREMENT'],
  //     ['Montant recouvrement bar', 60000],
  //     ['Montant recouvrement cuisine', 70000],
  //     ['Montant total recouvrement', 130000]
  //   ];
  
  //   // Création d'une feuille Excel avec les données du rapport
  //   const feuille = XLSX.utils.aoa_to_sheet(rapportData);
  
  //   // Ajout de la feuille au classeur
  //   XLSX.utils.book_append_sheet(classeur, feuille, 'Rapport d\'activité');
  
  //   // Génération du fichier Excel
  //   const fichierExcel = XLSX.write(classeur, { type: 'binary', bookType: 'xlsx' });
  
  //   // Convertir le fichier Excel en blob
  //   const blob = new Blob([s2ab(fichierExcel)], { type: 'application/octet-stream' });
  
  //   // Télécharger le fichier Excel
  //   saveAs(blob, 'rapport_activite.xlsx');
  // }
  
  // // Fonction pour convertir une chaîne de caractères en tableau de bytes
  // function s2ab(s) {
  //   const buf = new ArrayBuffer(s.length);
  //   const view = new Uint8Array(buf);
  //   for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  //   return buf;
  // }

  function genererRapportExcel() {
    // Création d'un nouveau classeur Excel
    const classeur = XLSX.utils.book_new();
  
    // Création des données du rapport
    const rapportData = [
      ['RAPPORT ACTIVITE DE 01/05/2024 AU 30/05/2024'],
      ['MONTANT SUR LES ACTIVITES'],
      ['ACTIVITE', 'BAR', 'CUISINE', 'TOTAL'],
      ['Approvisionnement', 200000, 150000, 350000],
      ['Facture', 350000, 200000, 550000],
      ['Perte', 40000, 30000, 70000],
      ['Benefice', 110000, 20000, 130000],
      [],
      ['RECOUVREMENT'],
      ['Montant recouvrement bar', 60000],
      ['Montant recouvrement cuisine', 70000],
      ['Montant total recouvrement', 130000]
    ];
  
    // Création d'une feuille Excel avec les données du rapport
    const feuille = XLSX.utils.aoa_to_sheet(rapportData);
  
    // Ajout de la feuille au classeur
    XLSX.utils.book_append_sheet(classeur, feuille, 'Rapport d\'activité');
  
    // Génération du fichier Excel
    const fichierExcel = XLSX.write(classeur, {
      bookType: 'xlsx',
      type: 'binary',
      cellStyles: true
    });
  
    // Conversion binaire en tableau d'octets
    const fichierExcelOctets = s2ab(fichierExcel);
  
    // Création d'un objet Blob à partir du tableau d'octets
    const blob = new Blob([fichierExcelOctets], { type: 'application/octet-stream' });
  
    // Téléchargement du fichier Excel
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rapport_activite.xlsx';
    link.click();
    URL.revokeObjectURL(url);
  }
  
  // Fonction pour convertir une chaîne de caractères en tableau d'octets
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return view;
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TABLEAU DE BORD" subtitle="Bienvenu sur le Tableau de bord" />       

        <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateField', 'DateField']}>
            <DateField label="Uncontrolled field" defaultValue={dayjs('2022-04-17')} />
            <DateField
              label="Controlled field"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        </Box>
        <Box>
          <InputLabel htmlFor="au-input">Date</InputLabel>
          <input
            type="date"
            style={{
              padding: "10px 20px",
            }}
            onChange={(e) => {     }}
          />
        </Box>
        <Box>
          <Button
            title="Rechercher"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.primary[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}            
          >
            <SearchIcon/>
          </Button>
        </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={genererRapportExcel}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Télécharger le Rapport
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >  

        {/* ROW 1 */}
        {/* Montant Approvisionnement Bar */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3"
            subtitle="Montant Approvisionnement Bar"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Facture Bar */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="8"
            subtitle="Montant Facture Bar"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Perte Bar */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="Montant Perte Bar"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Benefice Bar */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12"
            subtitle="Montant Benefice Bar"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        

        {/* ROW 2 */}
        {/* Montant Approvisionnement Cuisine */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12"
            subtitle="Montant Approvisionnement Cuisine"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Facture Cuisine */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="8"
            subtitle="Montant Facture Cuisine"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Perte Cuisine */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="Montant Perte Cuisinear"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Benefice Cuisine */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3"
            subtitle="Montant Benefice Cuisine"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 3 */}
        {/* Montant Total Approvisionnement */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3 000 000 BIF"
            subtitle="Montant Total Approvisionnement"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Total Facture */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="500 000 BIF"
            subtitle="Montant Total Facture"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Total Perte */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3 500 000 BIF"
            subtitle="Montant Total Perter"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Total Benefice */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="700 000 BIF"
            subtitle="Montant Total Benefice"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 4 */}
        {/* Montant Total Recouvrement Bar */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="700 000 BIF"
            subtitle="Montant Total Recouvrement Bar"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Total Recouvrement Cuisine */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="700 000 BIF"
            subtitle="Montant Total Recouvrement Cuisine"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Montant Total Recouvrement */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="700 000 BIF"
            subtitle="Montant Total Recouvrement"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>             
      </Box>
    </Box>
  );
};

export default Rapport;
