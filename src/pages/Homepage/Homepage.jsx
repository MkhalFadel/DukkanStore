import styles from './homepage.module.css'
import Navbar from '../../components/NavBar/Navabar.jsx'
import Darkmode from '../../components/DarkMode/DarkMode.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../../API/products.js'
import notFound from '../../assets/notFound.svg';
import noResults from '../../assets/noResults.svg'
import { DualRingLoader } from '@mkhalfadel/modoui-core'
import { useNavigate } from 'react-router'
import ScrollTop from '../../components/scrollTop/ScrollTop.jsx'
import { SuccessAlert } from '@mkhalfadel/modoui-core'
import Sorting from '../../components/Sorting/Sort.jsx'
import { saveSession } from '../../utils/sessionStorage.js'

export default function Homepage({
                                 theme,
                                 setTheme,
                                 sidebar,
                                 setSidebar,
                                 products,
                                 setProducts,
                                 setProductDetails,
                                 cart,
                                 addToCart})
{
   const [loading, setLoading] = useState(products ? false : true); // Show / Hide the Loading animation
   const [search, setSearch] = useState(""); // Stores the value of the search input
   const [alertShowen, setAlertShowen] = useState(false); // Display the Add Alert
   const [alertTimer, setAlertTimer] = useState(0); // Stores the timeout's ID to prevent UI issues
   const [filter, setFilter] = useState("all"); // Takes the filter value to filter products
   const [sortBy, setSortBy] = useState("none"); // Takes the sorting value to sort products

   const navigate = useNavigate();

      // Fisher–Yates shuffle algorithem returns a new shuffled array
      function shuffleProducts(array) {
         const arr = [...array];
         for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
         }

         return arr;
      }

   useEffect(() => {
      async function loadProducts()
      {
         const data = await fetchProducts();
         const productsData = data || [];
         const shuffled = shuffleProducts(productsData); // Shuffle productsData using Fisher–Yates algorithem before setting state
         setProducts(shuffled)
         setLoading(false);
      }

      loadProducts();
   }, [])

   // Redirect to the details page and shows products details
   function getProductDetails(id)
   {
      const product = products?.filter(p => p.id === id);
      setProductDetails(product[0]);
      saveSession(product[0], 'product');
      navigate('/details')
   }

   function sortAndFilter()
   {
      let sorted = products && [...products];
      
      if(sortBy === 'priceLow') sorted.sort((a,b) => a.price - b.price);
      else if (sortBy === "priceHigh") sorted.sort((a, b) => b.price - a.price);
      else if (sortBy === "nameAz") sorted.sort((a, b) => a.title.localeCompare(b.title));
      else if (sortBy === "nameZa") sorted.sort((a, b) => b.title.localeCompare(a.title));
      
      return sorted;
   }
   
   function displayProducts()
   {
      const sorted = sortAndFilter();

      let filteredProducts;
      
      // Filter products if Search or Filter values exist else display as is
      if(filter === 'all' && sortBy === 'none')
         filteredProducts = search ? sorted.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : sorted;
      else if(filter !== 'all' && sortBy === 'none')
         filteredProducts = search ? sorted.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) && p.category === filter) : sorted.filter(p => p.category === filter);
      else
         filteredProducts = search ? sorted.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) && (filter === 'all' || p.category === filter)) : sorted.filter(p => filter === 'all' || p.category === filter);
      
      return filteredProducts?.map(p => (
         <div className={styles.itemCard} key={p.id} onClick={() => getProductDetails(p.id)}>
            <img src={p.image ? p.image : notFound} className={styles.itemPic} style={{borderBottom: theme === 'light' ? "0.5px solid black" : ""}} />
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
         <Sorting setSortBy={setSortBy} />
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