import styles from './sidebar.module.css';
import closeIcon from '../../assets/icons/CloseIcon.svg'
import humMenu from '../../assets/icons/humMenu.svg'

export default function Sidebar({sidebar, setSidebar})
{
   return (
      <>
         <button className={styles.openButton} onClick={() => setSidebar(true)}>
            <img src={humMenu} alt="sidebarOpenButton" />
         </button>
         <div className={`${styles.sideBarContainer} ${sidebar ? styles.open : ""}`} onClick={() => setSidebar(false)}>
            <div className={styles.sideBar} onClick={(e) => e.stopPropagation()}>
               <button className={styles.closeBtn} onClick={() => setSidebar(false)}>
                  <img src={closeIcon} alt="CloseButton" />
               </button>
               <h3>Sections:</h3>
               <span>Plastics</span>
               <span>Electronics</span>
               <span>Toys</span>
               <span>Decoration</span>
               <span>Clothes</span>
            </div>
         </div>
      </>
   )
}