import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography,Divider, useTheme, Select, FormControl, InputLabel,Accordion, AccordionSummary,AccordionDetails } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
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
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.greenAccent[100]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#4d8d9e !important",
        },
        "& .pro-menu-item.active": {
          color: "#4d8d9e !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[200],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color='white'>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{color:'white'}} color='white'/>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )} */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon sx={{color:'white'}} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Accordion sx={{ backgroundColor: 'inherit',paddingLeft: '12px', width: '100%', '&:before': {
      backgroundColor: 'transparent !important',
    }, }}>
      <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon sx={{color:'white'}} />}>
      <SettingsIcon   sx={{ marginRight: '7px', color:'white'}}/>
        <Typography variant="subtitle1" color='white'>Societe</Typography>
      </AccordionSummary>
      <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>
         
      <Item
              title="Societe-famille"
              // to="/settings"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="societe-client"
              // to="/unite"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="societe-partenaire"
              // to="/product"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <MenuItem value="option3">Option 3</MenuItem> */}
          
      </AccordionDetails>


    </Accordion>

    <Divider component="li" />
{/* //menu avenant */}

   {/*  <Accordion sx={{ backgroundColor: 'inherit',paddingLeft: '12px', width: '100%', '&:before': {
      backgroundColor: 'transparent !important',
    }, }}>
      <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}>
      <SettingsIcon sx={{ marginRight: '7px', color:'white'}}/>
        <Typography variant="subtitle1" color='white'>Avenant</Typography>
      </AccordionSummary>
      <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>
         
      <Item
              title="Liste Avenant"
              // to="/settings"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Groupe avenant"
              // to="/unite"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />  
      </AccordionDetails>
    </Accordion> */}
    <Divider component="li" />
 {/* menu parametrage */}

    <Accordion sx={{ backgroundColor: 'inherit',paddingLeft: '12px', width: '100%', '&:before': {
      backgroundColor: 'transparent !important',
    },borderWidth:'0' }}>
      <AccordionSummary id="panel-header" aria-controls="panel-content"  expandIcon={<ExpandMoreIcon sx={{color:'white'}}/>}>
      <SettingsIcon sx={{ marginRight: '7px',color:'white'}}/>
        <Typography variant="subtitle1" color="white">Parametrage</Typography>
      </AccordionSummary>
      <AccordionDetails  sx={{width: '250px', paddingLeft:'1px' }}>
         
      <Item
              title="Categorie societe partenaire"
              // to="/settings"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categorie societe client"
              // to="/unite"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="ticket modilateur"
              // to="/product"
              icon={<TrendingFlatIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <MenuItem value="option3">Option 3</MenuItem> */}
          
      </AccordionDetails>
    </Accordion>

            <Typography
              variant="h6"
              color='white'
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon sx={{color:'white'}}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon sx={{color:'white'}}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon sx={{color:'white'}}/>}
              selected={selected}
              setSelected={setSelected}
            />

<Item
  title="Calendar"
  to="/invoices"
  icon={<CalendarTodayOutlinedIcon />}
  selected={selected}
  setSelected={setSelected}
/>
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
