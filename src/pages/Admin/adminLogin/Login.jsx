import styles from './login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DEMO_KEY } from '../../../demoPassword';

export default function Login({setIsAdmin}) {
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const navigate = useNavigate();

   function handleLogin(e) {
      e.preventDefault();

      if (password === import.meta.env.VITE_ADMIN_KEY || password === DEMO_KEY) {
         localStorage.setItem("adminAuth", true);
         navigate("/admin");
         setIsAdmin(true)
      } else {
         setError("Incorrect password. Please try again.");
      }
   }

   return (
      <>
         <main className={styles.container}>
            <div className={styles.card}>
               <h2 className={styles.title}>Admin Login</h2>

               {error && <p className={styles.error}>{error}</p>}

               <form className={styles.form} onSubmit={handleLogin}>
                  <input
                     type="password"
                     placeholder="Enter Admin Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className={styles.input}
                  />

                  <button className={styles.loginBtn}>Login</button>
               </form>
            </div>
         </main>

      </>
   );
}