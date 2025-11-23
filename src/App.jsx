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

  useEffect(() => {
    const body = document.querySelector("body");
    theme === 'dark' ? body.classList.add("darkMode") : body.classList.remove("darkMode");
  },[theme])

  return(
    <Routes>
      <Route path="/" element={<Homepage theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} />} />
      <Route path="/cart" element={<Cart theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} />} />
      <Route path="/details" element={<Details theme={theme} setTheme={setTheme} sidebar={sidebar} setSidebar={setSidebar} />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  )
}