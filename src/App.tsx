import { BrowserRouter, Route, Routes } from "react-router";
import "./styles.css";
import { QueryProvider } from "./components/query-provider";
import { ProductsPage } from "./pages/products-page";
import { Suspense } from "react";

function App() {
  return (
    <QueryProvider>
      <Suspense
        fallback={
          <main className="flex h-screen w-screen items-center justify-center">
            lodaing...
          </main>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryProvider>
  );
}

export default App;
