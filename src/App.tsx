import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/Layout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import SellProduct from "./pages/SellProduct";
import AddCategory from "./pages/AddCategory";
import Categories from "./pages/Categories";
import SoldProducts from "./pages/SoldProducts";

function App() {
  return (
    <LayoutComponent>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/sell-product" element={<SellProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sold-products" element={<SoldProducts />} />
      </Routes>
    </LayoutComponent>
  );
}

export default App;
