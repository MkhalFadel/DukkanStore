import styles from './darkmode.module.css';
import moonIcon from '../../assets/icons/moon.svg';
import sunIcon from '../../assets/icons/sun.svg';

export default function Darkmode({theme, setTheme})
{
   return (
      <div className={styles.darkMode}>
         <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <img src={theme === 'dark' ? sunIcon : moonIcon} alt="toggle theme" />
         </button>
      </div>
   );
}