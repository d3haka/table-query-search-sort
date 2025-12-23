import { BrowserRouter, Route, Routes } from "react-router";
import "./styles.css";
import { QueryProvider } from "./components/query-provider";
import { ProductsPage } from "./pages/products-page";

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
