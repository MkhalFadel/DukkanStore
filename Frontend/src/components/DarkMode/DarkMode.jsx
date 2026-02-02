import styles from './darkmode.module.css';
import moonIcon from '../../assets/icons/moon.svg';
import sunIcon from '../../assets/icons/sun.svg';
import { saveStorage } from '../../utils/localStorage';

export default function Darkmode({theme, setTheme})
{
   function handleMode()
   {
      const mode = theme === 'dark' ? 'light' : 'dark'
      setTheme(mode);
      saveStorage(mode, 'mode');
   }

   return (
      <div className={styles.darkMode}>
         <button onClick={handleMode}>
            <img src={theme === 'dark' ? sunIcon : moonIcon} alt="toggle theme" />
         </button>
      </div>
   );
}