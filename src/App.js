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
              <Route path="/team" element={<ListFactureBar />} />
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
              <Route path="/entre/bar" element={<LisCommandeBar />} />
              <Route path="/entre/cuisine" element={<LisEntreCuisine />} />
              <Route
                path="/entre/bar/commande"
                element={<CommandeBarEntre />}
              />
              <Route
                path="/entre/cuisine/commande"
                element={<EntreCuisine />}
              />
              <Route path="/entre/commande/bar" element={<CommandeBar />} />
              <Route
                path="/entre/commande/cuisine"
                element={<CommandeCuisine />}
              />
              <Route path="/sortie/bar" element={<ListSortieBar />} />
              <Route path="/facture/bar" element={<ListFactureBar1 />} />
              <Route path="/facture/cuisine" element={<Example />} />
              <Route path="/client" element={<Client />} />
              <Route path="/stockinitial" element={<StockInitial />} />
              <Route path="/inventiarebar" element={<InventaireBar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              <Route path="/geography" element={<Geography />} />

              {/* stock initial route */}
              <Route path="/stockinitial/bar" element={<StockInitialBar />} />
              <Route
                path="/stockinitial/cuisine"
                element={<StockInitialCuisne />}
              />

              {/* Invantaires produits */}
              <Route path="/invantaire/bar" element={<InvantaireBar />} />
              <Route
                path="/invantaire/cuisine"
                element={<InvantaireCuisine />}
              />

              {/* sortie stock cuisine */}
              <Route path="/sortie/cuisine" element={<SortieStockCuisine />} />
              <Route
                path="/sortie/produit"
                element={<SortieProduitCuisine />}
              />

              {/* rapport bar-resto*/}
              <Route path="/rapport" element={<Rapport />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
