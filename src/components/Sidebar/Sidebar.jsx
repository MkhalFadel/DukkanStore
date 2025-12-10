import styles from './sidebar.module.css';
import closeIcon from '../../assets/icons/CloseIcon.svg'
import humMenu from '../../assets/icons/humMenu.svg'

export default function Sidebar({sidebar, setSidebar, filter, setFilter})
{
   function filterProducts(category)
   {
      setFilter(category);
      setSidebar(false);
   }

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
               <span onClick={() => filterProducts("all")} className={filter === 'all' ? styles.checked : ""}>All</span>
               <span onClick={() => filterProducts("Plastics")} className={filter === 'Plastics' ? styles.checked : ""}>Plastics</span>
               <span onClick={() => filterProducts("Electronics")} className={filter === 'Electronics' ? styles.checked : ""}>Electronics</span>
               <span onClick={() => filterProducts("Toys")} className={filter === 'Toys' ? styles.checked : ""}>Toys</span>
               <span onClick={() => filterProducts("Clothes")} className={filter === 'Clothes' ? styles.checked : ""}>Clothes</span>
               <span onClick={() => filterProducts("Decoration")} className={filter === 'Decoration' ? styles.checked : ""}>Decoration</span>
               <span onClick={() => filterProducts("Cleaning")} className={filter === 'Cleaning' ? styles.checked : ""}>Cleaning products</span>
               <span onClick={() => filterProducts("Makeup")} className={filter === 'Makeup' ? styles.checked : ""}>Makeup</span>
            </div>
         </div>
      </>
   )
}