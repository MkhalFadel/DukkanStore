import styles from './popup.module.css'

export default function Popup({setShowConfirm, checkout}) {
   return (
      <div className={styles.orderModalOverlay}>
         <div className={styles.orderModal}>
         <h2>Confirm Order</h2>

         <p>
            You will be forwarded to WhatsApp with your cart items already written
            in a message. After doing so, your cart will be cleared.
         </p>

         <div className={styles.orderModalBtns}>
            <button className={styles.orderCancelBtn} onClick={() => setShowConfirm(false)}>
               Cancel
            </button>

            <button className={styles.orderConfirmBtn} onClick={checkout}>
               Continue
            </button>
         </div>
         </div>
      </div>
   );
}
