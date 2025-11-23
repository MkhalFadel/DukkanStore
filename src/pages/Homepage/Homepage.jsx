import styles from './homepage.module.css'
import Navbar from '../../components/NavBar/Navabar.jsx'
import Darkmode from '../../components/DarkMode/DarkMode.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'

export default function Homepage({theme, setTheme, sidebar, setSidebar})
{
   return(
      <>
         <Darkmode theme={theme} setTheme={setTheme}/>
         <Navbar theme={theme} />
         <main className={styles.container}>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         </main>
         <Footer />
      </>
   )
}