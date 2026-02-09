import styles from './details.module.css'
import Navbar from '../../components/NavBar/Navabar.jsx'
import Darkmode from '../../components/DarkMode/DarkMode.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import notFound from '../../assets/notFound.svg'
import { SuccessAlert } from '@mkhalfadel/modoui-core'
import { useState } from 'react'



export default function Details({theme, setTheme, sidebar, setSidebar, productDetails, cart, addToCart})
{

   const [alertShowen, setAlertShowen] = useState(false); // Dispaly the Add alert
   const [alertTimer, setAlertTimer] = useState(0); // Takes the timout's ID to prevent UI issues
   
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
         <Navbar theme={theme} cart={cart} />
         <div className={`${styles.alertContainer} ${alertShowen && styles.showen}`}>
            <SuccessAlert text={"Item Added to the Cart"} props={props} />
         </div>
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         <main className={styles.container}>
            <div className={styles.card}>
               
               <div className={styles.imageWrapper}>
                  <img 
                     src={productDetails.image_url ? productDetails.image_url : notFound}
                     alt={productDetails.title}
                     className={styles.productPic}
                  />
               </div>

               <div className={styles.info}>
                  <h1 className={styles.name}>{productDetails.title}</h1>
                  <p className={styles.price}>${productDetails.price}</p>

                  <div className={styles.meta}>
                     <p><strong>ID:</strong> {productDetails.pId}</p>
                     <p><strong>Category:</strong> {productDetails.category}</p>
                  </div>

                  <button className={styles.addBtn} onClick={(e) => {addToCart(productDetails.id, e); showAlert()}}>
                     Add to Cart
                  </button>
               </div>

            </div>
         </main>
         <Footer />
      </>
   )
}