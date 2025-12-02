import styles from './homepage.module.css'
import Navbar from '../../components/NavBar/Navabar.jsx'
import Darkmode from '../../components/DarkMode/DarkMode.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../../API/products.js'
import notFound from '../../assets/notFound.svg';
import noResults from '../../assets/itemNotFound.svg'
import { DualRingLoader } from '@mkhalfadel/modoui-core'
import { useNavigate } from 'react-router'
import ScrollTop from '../../components/scrollTop/ScrollTop.jsx'
import { SuccessAlert } from '@mkhalfadel/modoui-core'

export default function Homepage({
                                 theme,
                                 setTheme,
                                 sidebar,
                                 setSidebar,
                                 products,
                                 setProducts,
                                 productDetails,
                                 setProductDetails,
                                 cart,
                                 addToCart})
{
   const [loading, setLoading] = useState(products ? false : true);
   const [search, setSearch] = useState("");
   const [alertShowen, setAlertShowen] = useState(false);
   const [alertTimer, setAlertTimer] = useState(0);
   const [filter, setFilter] = useState("all");

   const navigate = useNavigate();

   useEffect(() => {
      async function loadProducts()
      {
         const data = await fetchProducts();
         const productsData = data || [];
         setProducts(productsData)
         setLoading(false);
      }

      loadProducts();
   }, [])

   function getProductDetails(id)
   {
      const product = products?.filter(p => p.id === id);
      setProductDetails(product[0]);
      navigate('/details')
   }
   
   function displayProducts()
   {
      let filteredProducts;

      if(filter === 'all')
         filteredProducts = search ? products.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : products;
      else if(filter !== 'all')
         filteredProducts = search ? products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) && p.category === filter) : products.filter(p => p.category === filter);
      
      return filteredProducts?.map(p => (
         <div className={styles.itemCard} key={p.id} onClick={() => getProductDetails(p.id)}>
            <img src={p.img ? p.img : notFound} className={styles.itemPic} style={{borderBottom: theme === 'light' ? "0.5px solid black" : ""}} />
            <p className={styles.itemName}>{p.title}</p>
            <p className={styles.itemPrice}>${p.price}</p>
            <button className={styles.addBtn} onClick={e => {addToCart(p.id, e); showAlert()}}>Add to Cart</button>
         </div>
      ))
   }

   const productsEl = displayProducts();

   function showAlert()
   {
      if(alertTimer) clearTimeout(alertTimer)

      setAlertShowen(true)

      const timerID = setTimeout(() => {
         setAlertShowen(false)
      }, 1500)

      setAlertTimer(timerID)
   }

   const props = {
      backgroundColor: "var(--navBackgroundColor)",
      border: 'none',
      boxShadow: "var(--navShadow)"
   }

   return(
      <>
         <Darkmode theme={theme} setTheme={setTheme}/>
         <Navbar theme={theme} search={search} setSearch={setSearch} cart={cart} />
         <div className={`${styles.alertContainer} ${alertShowen && styles.showen}`}>
            <SuccessAlert text={"Item Added to the Cart"} props={props} />
         </div>
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} filter={filter} setFilter={setFilter} />
         <ScrollTop />
         <main className={styles.container}>
            {productsEl}
         </main>
         {productsEl?.length === 0 && <img src={noResults} className={styles.noResultsImg} />}
         {loading && <div className={styles.loader}><DualRingLoader /></div>}
         <Footer />
      </>
   )
}