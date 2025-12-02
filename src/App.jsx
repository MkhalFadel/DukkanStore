import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Details from "./pages/Details/Details.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import { useEffect, useState } from "react";
import { getStorage, saveStorage } from "./localStorage.js";

export default function App()
{
  const [theme, setTheme] = useState("dark");
  const [sidebar, setSidebar] = useState(false);
  const [products, setProducts] = useState();
  const [productDetails, setProductDetails] = useState();
  const [cart, setCart] = useState(() => {
    const data = getStorage();
    return data ? data : [];
  });

  useEffect(() => {
    const body = document.querySelector("body");
    theme === 'dark' ? body.classList.add("darkMode") : body.classList.remove("darkMode");
  },[theme])

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
      <Route path="/" element={<Homepage theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} products={products} setProducts={setProducts} productDetails={productDetails} setProductDetails={setProductDetails} cart={cart} setCart={setCart} addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} cart={cart} setCart={setCart} />} />
      <Route path="/details" element={<Details theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} productDetails={productDetails} setProductDetails={setProductDetails} cart={cart} addToCart={addToCart} />} />
      <Route path="admin" element={<Admin products={products} setProducts={setProducts} />} />
    </Routes>
  )
}