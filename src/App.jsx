import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Details from "./pages/Details/Details.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Login from "./pages/Admin/adminLogin/Login.jsx";
import { useEffect, useState } from "react";
import { getStorage, saveStorage } from "./localStorage.js";

export default function App()
{
  const [theme, setTheme] = useState("dark"); // For dark / light theme options
  const [sidebar, setSidebar] = useState(false); // Show / Hide sidebar
  const [products, setProducts] = useState(); // Stores the products
  const [productDetails, setProductDetails] = useState(); // Stores the clicked on product to dispaly its details
  const [isAdmin, setIsAdmin] = useState(false); // Checks if the user is admin or not
  const [cart, setCart] = useState(() => {
    const data = getStorage();
    return data ? data : [];
  }); // Checks if user have cart items stores in local storage

  useEffect(() => {
    const body = document.querySelector("body");
    theme === 'dark' ? body.classList.add("darkMode") : body.classList.remove("darkMode");
  },[theme])

  // Handles adding items to cart
  function addToCart(id, e)
  {
    e.stopPropagation();
    let tempCart = [...cart];
    const exist = tempCart.find(p => p.id === id);
    if(!exist)
    {
        const product = products.filter(p => p.id === id);
        const newProduct = {...product[0], quantity: 1}
        console.log(product)
        tempCart.push(newProduct);
    }else{
        tempCart = tempCart.map(p => p.id === id ? {...p, quantity: p.quantity + 1} : p);
    }
  
    setCart(tempCart)
    saveStorage(tempCart);
  }


  return(
    <Routes>
      <Route path="/" element={<Homepage theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} products={products} setProducts={setProducts} setProductDetails={setProductDetails} cart={cart} setCart={setCart} addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} cart={cart} setCart={setCart} />} />
      <Route path="/details" element={<Details theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} productDetails={productDetails} cart={cart} addToCart={addToCart} />} />
      <Route path="/admin" element={<Admin products={products} setProducts={setProducts} isAdmin={isAdmin} />} />
      <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
    </Routes>
  )
}