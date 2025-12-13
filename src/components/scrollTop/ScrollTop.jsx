import styles from './scrollTop.module.css'
import topArrow from '../../assets/icons/topArrow.svg';
import { useEffect, useState } from 'react';

export default function ScrollTop()
{
   const [visible, setVisible] = useState();

   useEffect(() => {
      function handleScroll()
      {
         // Check the view position of the user 
         if(window.scrollY > 512) setVisible(true)
         else setVisible(false);
      }

      window.addEventListener("scroll", handleScroll)

      return () =>  window.removeEventListener('scroll', handleScroll)
   }, [])


   function scrollTop()
   {
      if(window.scrollY > 512)
         scroll({top: 0, behavior: 'smooth'});
   }

   return(
      <>
         <button onClick={scrollTop} className={`${styles.container} ${visible && styles.visible}`}>
            <img src={topArrow} alt="ScrollTop" />
         </button>
      </>
   )
}