import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Unite from "./scenes/parametrage/Unitedemesure.jsx"
import Settings from "./scenes/parametrage/famille.jsx"
import Product from "./scenes/parametrage/Product.jsx"
// import Calendar from "./scenes/calendar/calendar";
import Example from "./scenes/test table";
import MenuCuisine from "./scenes/parametrage/menucuisine.jsx";
import Fournisseur from "./scenes/parametrage/Fournisseur.jsx";
import Client from "./scenes/parametrage/Client.jsx";
import StockInitial from "./scenes/stock/StockInitial.jsx";
// import InventaireCuisine from "./scenes/stock/inventiare_cuisine.jsx";
import InventaireBar from "./scenes/stock/inventiare_bar.jsx";
import ListAvenant from "./scenes/avenant/ListeAvenant.jsx";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Example />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/list/avenant" element={<ListAvenant />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/unite" element={<Unite />} />
              <Route path="/famille" element={<Settings />} />
              <Route path="/produit" element={<Product />} />
              <Route path="/cuisinemenu" element={<MenuCuisine />} />
              <Route path="/Fournisseur" element={<Fournisseur />} />
              <Route path="/client" element={<Client />} />
              <Route path="/stockinitial" element={<StockInitial />} />
              <Route path="/inventiarebar" element={<InventaireBar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
