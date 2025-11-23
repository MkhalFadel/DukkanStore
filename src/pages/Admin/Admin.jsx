import styles from './admin.module.css'

export default function Admin()
{
   return(
      <div className={styles.container}>
      <div className={styles.row1}>
         <input placeholder="Product Name" type="text" className={styles.title} />
      </div>

      <div className={styles.row2}>
         <input placeholder="Product Price" className={styles.price} type="number" />
         <input className={styles.uploadBtn} style={{marginLeft: "15px"}} placeholder="Choose Image" type="file" accept="image/*" />
         <select className={styles.category}>
            <option value="Plastics">Plastics</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Clothes">Clothes</option>
            <option value="Decoration">Decoration</option>
         </select>
      </div>

      <div className={styles.row3}>
         <button className={styles.addBtn}>Add Product</button>
      </div>

      
   <div className={styles.row4}>
      <button className={styles.all}>All Products</button>
      <button style={{marginLeft: "20px"}} className={styles.append}>Frozen Products</button>
   </div>

   <div className={styles.row6}>
      <input placeholder="Search Product by Name" type="text" className={styles.search} />
   </div>

   <div className={styles.row6}>
      <button className={styles.byId}>Search via ID</button>
      <button style={{marginLeft: "20px"}} className={styles.byName}>Search via Name</button>
   </div>

      <div className={styles.displayProducts}>
         <table className={styles.table}>
            <thead>
               <tr className={styles.column}>
                  <th>الحذف</th>
                  <th>التعديل</th>
                  <th>تعليق</th>
                  <th>المجموعة</th>
                  <th>السعر</th>
                  <th>المنتج</th>
                  <th>الـID</th>
                  <th>No.</th>
               </tr>
            </thead>

            <tbody className={styles.tableBody}>
            
            </tbody>

         </table>
      </div>

   </div>
   )
}