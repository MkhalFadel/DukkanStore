import styles from './details.module.css'
import Navbar from '../../components/NavBar/Navabar.jsx'
import Darkmode from '../../components/DarkMode/DarkMode.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import notFound from '../../assets/notFound.svg'


export default function Details({theme, setTheme, sidebar, setSidebar, productDetails, setProductDetails, cart, addToCart})
{
   return(
      <>
         <Darkmode theme={theme} setTheme={setTheme}/>
         <Navbar theme={theme} cart={cart} />
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         <main className={styles.container}>
            <div className={styles.card}>
               
               <div className={styles.imageWrapper}>
                  <img 
                     src={productDetails.img ?? notFound}
                     alt={productDetails.title}
                     className={styles.productPic}
                  />
               </div>

               <div className={styles.info}>
                  <h1 className={styles.name}>{productDetails.title}</h1>
                  <p className={styles.price}>${productDetails.price}</p>

                  <div className={styles.meta}>
                     <p><strong>ID:</strong> {productDetails.id}</p>
                     <p><strong>Category:</strong> {productDetails.category}</p>
                  </div>

                  <button className={styles.addBtn} onClick={(e) => addToCart(productDetails.id, e)}>
                     Add to Cart
                  </button>
               </div>

            </div>
         </main>
         <Footer />
      </>
   )
}