import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography,Divider, useTheme, Select, FormControl, InputLabel,Accordion, AccordionSummary,AccordionDetails } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.blueAccent[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
              
      <Typography color='white'>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box sx={{
        "& .pro-sidebar-inner": {background: `${colors.primary[400]} !important`,},
        "& .pro-icon-wrapper": {backgroundColor: "transparent !important",},
        "& .pro-inner-item": {padding: "5px 35px 5px 20px !important",},
        "& .pro-inner-item:hover": {color: "#4d8d9e !important",},
        "& .pro-menu-item.active": {color: "#4d8d9e !important",},
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0px 20px 0px",
              color: colors.grey[200],
            }}>

            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px">

                <Typography variant="h3">
                  BUGARAMA
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon  color='white'/>
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box sx={{ marginRight: '8px'}} paddingLeft={isCollapsed ? undefined : "5%"}>

            {/* menu Tableau de bord */}
            {/* <Item
              title="Tableau de bord"
              to="/"
              icon={<HomeOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* menu Tableau de bord */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px',
              width: '100%', '&:before': {backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <DashboardIcon sx={{ marginRight: '14px'}}/>
                <Typography variant="subtitle1">Tableau de bord</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Tableau Boss"
                  to="/doshbord/boss"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Tableau Gerent"
                  to="/doshbord/gerent"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Tableau Bar-Main"
                  to="/doshbord/gerent"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> 
                <Item
                  title="Tableau Cuisinié"
                  to="/doshbord/gerent"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />          
              </AccordionDetails>
            </Accordion>

            {/* menu stock initial */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px',
              width: '100%', '&:before': {backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <StoreIcon sx={{ marginRight: '14px'}}/>
                <Typography variant="subtitle1">Stock Initial</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Stock Bar"
                  to="/famille"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Stok Cuisine"
                  to="/unite"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />          
              </AccordionDetails>
            </Accordion>

            {/* menu inventaire */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px',
              width: '100%', '&:before': {backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <InventoryIcon sx={{ marginRight: '14px'}}/>
                <Typography variant="subtitle1">Inventaire</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Bar"
                  to="/famille"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Cuisine"
                  to="/unite"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />          
              </AccordionDetails>
            </Accordion>

            {/* menu approvisionnement */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px',
              width: '100%', '&:before': {backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <AddBusinessIcon sx={{ marginRight: '14px'}}/>
                <Typography variant="subtitle1">Approvisionner</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Bar"
                  to="/famille"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Cuisine"
                  to="/unite"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />          
              </AccordionDetails>
            </Accordion>

            {/* menu commande */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px', 
              width: '100%', '&:before': { backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <ShoppingCartIcon sx={{ marginRight: '14px'}}/>
                <Typography variant="subtitle1">Commande</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Bar"
                  to="/famille"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Cuisine"
                  to="/unite"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />          
              </AccordionDetails>
            </Accordion>

            {/* menu Sortie Stock */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px', 
              width: '100%', '&:before': {backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <UnarchiveIcon sx={{ marginRight: '14px' }}/>
                <Typography variant="subtitle1">Sortie Stock</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{ width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Stock Cuisine "
                  to="/famille"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />        
              </AccordionDetails>
            </Accordion>
            
            {/* menu rapport */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px', 
              width: '100%', '&:before': {backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <AssessmentIcon sx={{ marginRight: '14px'}}/>
                <Typography variant="subtitle1">Rapport</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Finance"
                  to="/famille"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />        
              </AccordionDetails>
            </Accordion>

            {/* menu parametrage */}
            <Accordion sx={{ 
              backgroundColor: 'inherit',
              padding: '0px 8px 0px 8px', 
              width: '100%', '&:before': {backgroundColor: 'transparent !important',},
              borderWidth:'0' 
            }}>
              <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon />}>
                <SettingsSuggestIcon sx={{ marginRight: '14px'}}/>
                <Typography variant="subtitle1">Parametrage</Typography>
              </AccordionSummary>
              <Divider component="li" />
              <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>         
                <Item
                  title="Familles"
                  to="/famille"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Produits"
                  to="/produit"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Unites de mesure"
                  to="/unite"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Fournisseurs"
                  // to="/product"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Clients"
                  // to="/product"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Menus cuisine"
                  // to="/product"
                  icon={<TrendingFlatIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />                          
              </AccordionDetails>
            </Accordion>          
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
