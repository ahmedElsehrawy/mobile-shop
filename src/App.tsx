import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import SellProduct from "./pages/SellProduct";
import AddCategory from "./pages/AddCategory";
import Categories from "./pages/Categories";

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
      </Routes>
    </LayoutComponent>
  );
}

export default App;
