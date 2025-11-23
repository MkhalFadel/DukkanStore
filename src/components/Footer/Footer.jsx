import styles from './footer.module.css';
import { Link } from 'react-router';
import igIcon from '../../assets/icons/igIcon.svg'
import fbIcon from '../../assets/icons/fbIcon.svg'

export default function Footer()
{
   return(
      <footer className={styles.footer}>
         <div className={styles.infoFooter}>
            <div className={styles.left}>
               <p className={styles.contact}>Contact us:</p>
               <p className={styles.email}>DukkanLB@gmail.com</p>
               <p className={styles.phoneNumber}>+961 03073780</p>
               <p className={styles.address}>South Lebanon, Main street Almjadel</p>
            </div>


            <div className={styles.right}>
               <div className={styles.socialsContainer}>
                  <p className={styles.socials}>Social Media:</p>
                  <a href="https://www.instagram.com/dukancenter/" className={styles.igLink}>
                     <img src={igIcon} className={styles.igIcon} /> Dukan Center
                  </a>
                  <a href="https://www.facebook.com/people/dukancenter/100089183195387/" className={styles.fbLink}>
                     <img src={fbIcon} className={styles.fbIcon} /> Dukan Center
                  </a>
               </div>
               <div className={styles.pagesContainer}>
                  <p className={styles.pages}>Pages:</p>
                  <Link to="/" className={styles.homeLink}>Home Page</Link>
                  <Link to="cart" className={styles.cartLink}>Cart</Link>
               </div>
            </div>
         </div>
      </footer>
   )
}