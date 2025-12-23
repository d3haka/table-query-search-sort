import { BrowserRouter, Route, Routes } from "react-router";
import "./styles.css";
import { ProductsPage } from "./pages/products-page";
import { QueryProvider } from "./components/query-provider";

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
