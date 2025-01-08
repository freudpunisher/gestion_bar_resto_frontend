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
import Unite from "./scenes/parametrage/Unitedemesure.jsx";
import Settings from "./scenes/parametrage/famille.jsx";
import Product from "./scenes/parametrage/Product.jsx";
// import Calendar from "./scenes/calendar/calendar";
import Example from "./scenes/test table";
import MenuCuisine from "./scenes/parametrage/menucuisine.jsx";
import Fournisseur from "./scenes/parametrage/Fournisseur.jsx";
import Client from "./scenes/parametrage/Client.jsx";
import StockInitial from "./scenes/stock/StockInitial.jsx";
// import InventaireCuisine from "./scenes/stock/inventiare_cuisine.jsx";
import InventaireBar from "./scenes/stock/inventiare_bar.jsx";
import ListAvenant from "./scenes/avenant/ListeAvenant.jsx";
import LisCommandeBar from "./scenes/Approvisionnement/Bar/ListCommandeBar.jsx";
import CommandeBarEntre from "./scenes/Approvisionnement/Bar/CommandeBar.jsx";
import LisEntreCuisine from "./scenes/Approvisionnement/cuisine/ListEntreCuisine.jsx";
import EntreCuisine from "./scenes/Approvisionnement/cuisine/EntreCuisine.jsx";
import CommandeBar from "./scenes/commande/CommandeBar.jsx";
import ListSortieBar from "./scenes/Sortie/Bar/ListSortieBar.jsx";
import ListFactureBar from "./scenes/Facture/ListFactureBar.jsx";

// importation stock initial
import StockInitialBar from "./scenes/stock/StockInitial_bar.jsx";
import StockInitialCuisne from "./scenes/stock/StockInitial_cuisine.jsx";

// importation invantaire produit
import InvantaireBar from "./scenes/stock/invantaire_bar.jsx";
import InvantaireCuisine from "./scenes/stock/invantaire_cuisine.jsx";

// importation sortie stock cuisine
import SortieStockCuisine from "./scenes/stock/sortie_stock_cuisine.jsx";
import SortieProduitCuisine from "./scenes/stock/sortie_produit_cuisine.jsx";

// importation rapport
import Rapport from "./scenes/rapport/index.jsx";
import CommandeCuisine from "./scenes/commande/CommandeCuisine.jsx";
import ListFactureCuisine from "./scenes/Facture/ListFactureCuisine.jsx";
import SignIn from "./scenes/signinForm/index.jsx";
import ListFactureBar1 from "../src/scenes/ListFactureBar1.jsx";
import RapportCusine from "./scenes/rapport/cuisine/index.js";
import AuthCheck from "./Auth.js";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AuthCheck>
            <Sidebar isSidebar={isSidebar} />
          </AuthCheck>
          <main className="content">
            <AuthCheck>
              <Topbar setIsSidebar={setIsSidebar} />
            </AuthCheck>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthCheck>
                    <Dashboard />
                  </AuthCheck>
                }
              />
              <Route
                path="/team"
                element={
                  <AuthCheck>
                    <ListFactureBar />
                  </AuthCheck>
                }
              />
              <Route
                path="/contacts"
                element={
                  <AuthCheck>
                    <Contacts />
                  </AuthCheck>
                }
              />
              <Route
                path="/invoices"
                element={
                  <AuthCheck>
                    <Invoices />
                  </AuthCheck>
                }
              />
              <Route
                path="/list/avenant"
                element={
                  <AuthCheck>
                    <ListAvenant />
                  </AuthCheck>
                }
              />
              <Route path="/form" element={<Form />} />
              <Route
                path="/bar"
                element={
                  <AuthCheck>
                    <Bar />
                  </AuthCheck>
                }
              />
              <Route
                path="/unite"
                element={
                  <AuthCheck>
                    <Unite />
                  </AuthCheck>
                }
              />
              <Route
                path="/famille"
                element={
                  <AuthCheck>
                    <Settings />
                  </AuthCheck>
                }
              />
              <Route
                path="/produit"
                element={
                  <AuthCheck>
                    <Product />
                  </AuthCheck>
                }
              />
              <Route
                path="/cuisinemenu"
                element={
                  <AuthCheck>
                    <MenuCuisine />
                  </AuthCheck>
                }
              />
              <Route
                path="/Fournisseur"
                element={
                  <AuthCheck>
                    <Fournisseur />
                  </AuthCheck>
                }
              />
              <Route
                path="/entre/bar"
                element={
                  <AuthCheck>
                    <LisCommandeBar />
                  </AuthCheck>
                }
              />
              <Route
                path="/entre/cuisine"
                element={
                  <AuthCheck>
                    <LisEntreCuisine />
                  </AuthCheck>
                }
              />
              <Route
                path="/entre/bar/commande"
                element={
                  <AuthCheck>
                    <CommandeBarEntre />
                  </AuthCheck>
                }
              />
              <Route
                path="/entre/cuisine/commande"
                element={
                  <AuthCheck>
                    <EntreCuisine />
                  </AuthCheck>
                }
              />
              <Route
                path="/entre/commande/bar"
                element={
                  <AuthCheck>
                    <CommandeBar />
                  </AuthCheck>
                }
              />
              <Route
                path="/entre/commande/cuisine"
                element={
                  <AuthCheck>
                    <CommandeCuisine />
                  </AuthCheck>
                }
              />
              <Route
                path="/sortie/bar"
                element={
                  <AuthCheck>
                    <ListSortieBar />
                  </AuthCheck>
                }
              />
              <Route
                path="/facture/bar"
                element={
                  <AuthCheck>
                    <ListFactureBar1 />
                  </AuthCheck>
                }
              />
              <Route
                path="/facture/cuisine"
                element={
                  <AuthCheck>
                    <Example />
                  </AuthCheck>
                }
              />
              <Route
                path="/client"
                element={
                  <AuthCheck>
                    <Client />
                  </AuthCheck>
                }
              />
              <Route
                path="/stockinitial"
                element={
                  <AuthCheck>
                    <StockInitial />
                  </AuthCheck>
                }
              />
              <Route
                path="/inventiarebar"
                element={
                  <AuthCheck>
                    <InventaireBar />
                  </AuthCheck>
                }
              />
              {/* <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} /> */}
              <Route path="/login" element={<SignIn />} />
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> */}

              {/* stock initial route */}
              <Route
                path="/stockinitial/bar"
                element={
                  <AuthCheck>
                    <StockInitialBar />
                  </AuthCheck>
                }
              />
              <Route
                path="/stockinitial/cuisine"
                element={<StockInitialCuisne />}
              />

              {/* Invantaires produits */}
              <Route
                path="/invantaire/bar"
                element={
                  <AuthCheck>
                    <InvantaireBar />
                  </AuthCheck>
                }
              />
              <Route
                path="/invantaire/cuisine"
                element={
                  <AuthCheck>
                    <InvantaireCuisine />
                  </AuthCheck>
                }
              />

              {/* sortie stock cuisine */}
              <Route
                path="/sortie/cuisine"
                element={
                  <AuthCheck>
                    <SortieStockCuisine />
                  </AuthCheck>
                }
              />
              <Route
                path="/sortie/produit"
                element={
                  <AuthCheck>
                    <SortieProduitCuisine />
                  </AuthCheck>
                }
              />

              {/* rapport bar-resto*/}
              <Route
                path="/rapport"
                element={
                  <AuthCheck>
                    <Rapport />
                  </AuthCheck>
                }
              />
              <Route
                path="/rapport/cuisine"
                element={
                  <AuthCheck>
                    <RapportCusine />
                  </AuthCheck>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
