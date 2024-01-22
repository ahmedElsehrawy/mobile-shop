import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/Layout";
import Home from "./pages/home";
import AddProduct from "./pages/products/add";
import SellProduct from "./pages/products/sold/SellProduct";
import AddCategory from "./pages/categories/add";
import Categories from "./pages/categories";
import SoldProducts from "./pages/products/sold";
import ProductPage from "./pages/product";
import Products from "./pages/products";

function App() {
  return (
    <LayoutComponent>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/sell-product" element={<SellProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sold-products" element={<SoldProducts />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </LayoutComponent>
  );
}

export default App;
