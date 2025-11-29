import styles from './navbar.module.css';
import { Link, useSearchParams } from 'react-router';
import cartIcon from '../../assets/cart2.svg';
import { GlowInput } from '@mkhalfadel/modoui-core';
import { useEffect, useState } from 'react';

export default function Navbar({theme, search, setSearch, cart})
{
   const [cartCounter, setCartCounter] = useState();

   useEffect(() => {
      let counter = 0;
      cart.forEach(i => counter = counter + i.quantity)
      setCartCounter(counter)
   }, [cart])

   const props = {
      width: "100%",
      boxShadow: `${theme === 'dark' ? "rgb(44, 188, 255, 1)" : "rgba(0, 60, 255, 1)"} 0px 0px 25px`,
      borderColor: "rgb(44, 188, 255, 1)" ,
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "black",
   }

   return(
      <nav className={styles.navBar}>
         <div className={styles.left}>
               <Link className={styles.homeLink} to="/">
                  Du<span>kk</span>an
               </Link>
               <Link to="/admin" className={styles.adminLink}>+</Link>
         </div>

         <div className={styles.middle}>
            <GlowInput props={props} placeholder={"Search Items..."} value={search ?? ""} onChange={(e) => setSearch(e.target.value)} />
         </div>
         
         <div className="right">
            <Link to="/cart" className={styles.cartLink}>
               <img loading="lazy" src={cartIcon} className={styles.cart} />
               <p className={styles.itemsCount}>{cartCounter}</p>
            </Link>
         </div>   
   </nav>
   )
}