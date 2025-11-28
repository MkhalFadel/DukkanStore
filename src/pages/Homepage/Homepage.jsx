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

export default function Homepage({theme, setTheme, sidebar, setSidebar, products, setProducts, productDetails, setProductDetails})
{
   const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");

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
   }

   console.log(productDetails)

   function displayProducts()
   {
      const filteredProducts = search ? products.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : products;

      return filteredProducts?.map(p => (
         <div className={styles.itemCard} key={p.id} onClick={() => getProductDetails(p.id)}>
            <img src={p.img ? p.img : notFound} className={styles.itemPic} style={{borderBottom: theme === 'light' ? "0.5px solid black" : ""}} />
            <p className={styles.itemName}>{p.title}</p>
            <p className={styles.itemPrice}>${p.price}</p>
            <button className={styles.addBtn} onClick={e => e.stopPropagation()}>Add to Cart</button>
         </div>
      ))
   }

   const productsEl = displayProducts();

   return(
      <>
         <Darkmode theme={theme} setTheme={setTheme}/>
         <Navbar theme={theme} search={search} setSearch={setSearch} />
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         <main className={`${styles.container} ${productDetails && styles.details}`}>
            {productsEl}
         </main>
         {productsEl?.length === 0 && <img src={noResults} className={styles.noResultsImg} />}
         {loading && <div className={styles.loader}><DualRingLoader /></div>}
         <Footer />
      </>
   )
}