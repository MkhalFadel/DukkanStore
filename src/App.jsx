import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Details from "./pages/Details/Details.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import { useEffect, useState } from "react";

export default function App()
{
  const [theme, setTheme] = useState("dark");
  const [sidebar, setSidebar] = useState(false);
  const [products, setProducts] = useState();
  const [productDetails, setProductDetails] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const body = document.querySelector("body");
    theme === 'dark' ? body.classList.add("darkMode") : body.classList.remove("darkMode");
  },[theme])

  function addToCart(id, e)
  {
    e.stopPropagation();
    const exist = cart.find(p => p.id === id);
    if(!exist)
    {
        const product = products.filter(p => p.id === id);
        product[0].quantity = 1;
        setCart(prev => [...prev, product[0]]);
    }else{
        setCart(cart => cart.map(p => p.id === id ? {...p, quantity: p.quantity + 1} : p))
    }
  }

  return(
    <Routes>
      <Route path="/" element={<Homepage theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} products={products} setProducts={setProducts} productDetails={productDetails} setProductDetails={setProductDetails} cart={cart} setCart={setCart} addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} cart={cart} setCart={setCart} />} />
      <Route path="/details" element={<Details theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} productDetails={productDetails} setProductDetails={setProductDetails} cart={cart} addToCart={addToCart} />} />
      <Route path="admin" element={<Admin products={products} setProducts={setProducts} />} />
    </Routes>
  )
}