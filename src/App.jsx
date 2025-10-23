import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import NotFound from "./components/NotFound"
// admin ke liye
import Products from "./components/Admin/Product"
import Orders from "./components/Admin/Orders";
import Dashboard from "./components/Admin/Dashboard";
import Customers from "./components/Admin/Customers";
import Payments from "./components/Admin/Payments";
import Setting from "./components/Admin/setting";
import AdminGuart from "./components/Guard/AdminGuard";

// user ke liye
import Home from "./components/Home";
import Product from "./components/Products";
import Category from "./components/Category";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import PreGuard from "./components/Guard/PreGuard";

// curtomers ke liye
import Cart from "./components/Cart";
import Profile from "./components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminGuart />}>
          <Route path="/admin">
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="payments" element={<Payments />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/category" element={<Category />} />
        <Route element={<PreGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App