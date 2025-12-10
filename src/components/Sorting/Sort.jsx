import { useState, useRef, useEffect } from "react";
import styles from "./sort.module.css";

export default function Sorting({ setSortBy }) {
   const [open, setOpen] = useState(false);
   const [active, setActive] = useState("Default");
   const dropdownRef = useRef(null);

   const options = [
      { label: "Default", value: "none" },
      { label: "Price: Low → High", value: "priceLow" },
      { label: "Price: High → Low", value: "priceHigh" },
      { label: "Name: A → Z", value: "nameAz" },
      { label: "Name: Z → A", value: "nameZa" }
   ];

   function handleSelect(option) {
      setActive(option.label);
      setSortBy(option.value);
      setOpen(false);
   }

  // Close dropdown when clicking outside
   useEffect(() => {
      function handleClickOutside(e) {
         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div className={styles.wrapper} ref={dropdownRef}>
         <button className={styles.sortButton} onClick={() => setOpen(!open)}>
         {active}
         <span className={`${styles.arrow} ${open ? styles.up : ""}`}>▼</span>
         </button>

         {open && (
         <div className={styles.menu}>
            {options.map(o => (
               <div
               key={o.value}
               className={`${styles.option} ${
                  active === o.label ? styles.active : ""
               }`}
               onClick={() => handleSelect(o)}
               >
               {o.label}
               </div>
            ))}
         </div>
         )}
      </div>
   );
}
