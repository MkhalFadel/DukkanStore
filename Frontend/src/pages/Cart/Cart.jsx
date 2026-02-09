import styles from './cart.module.css'
import Navbar from '../../components/NavBar/Navabar.jsx'
import Darkmode from '../../components/DarkMode/DarkMode.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import notFound from '../../assets/notFound.svg';
import emptyCart from '../../assets/emptyCart.svg';
import { useEffect, useState } from 'react'
import whatsappIcon from '../../assets/whatsapp icon.svg'
import ScrollTop from '../../components/scrollTop/ScrollTop.jsx'
import { saveStorage, clearStorage } from '../../utils/localStorage.js'
import Popup from '../../components/PopUp/Popup.jsx'

export default function Cart({theme, setTheme, sidebar, setSidebar, cart, setCart})
{

   const [edit, setEdit] = useState(null); // Shows an input El to take edit the quantity of a product
   const [newQuantity, setNewQuantity] = useState(0); // Takes the new quantity of the product
   const [pricing, setPricing] = useState(); // Stores the prices data of the cart
   const [showConfirm, setShowConfirm] = useState(false); // Display the confirmation popup when the user checksout

   useEffect(() => {
      let totalPrice = 0;
      let delivery = 0;
      cart.forEach(i => totalPrice = totalPrice + (+i.price * i.quantity));
      if(totalPrice < 50)
         delivery = 4;
      else if(totalPrice >= 50 && totalPrice <= 100)
         delivery = 2;
      else
         delivery = 0;      
      const finalPrice = totalPrice + delivery;
      setPricing({totalPrice, delivery, finalPrice: totalPrice === 0 ? 0 : finalPrice})

   }, [cart])

   // Edit products quantity
   function editQuantity(id)
   {
      let tempCart;
      if(!newQuantity)
      {
         tempCart = cart.filter(i => i.id !== id);
      }
      else{
         tempCart = cart.map(i => i.id === id ? {...i, quantity: newQuantity} : i);
      }
      setCart(tempCart)
      setEdit(null)
      setNewQuantity(0);
      saveStorage(tempCart, 'cart');
   }

   // Delete a product from the cart
   function deleteItem(id)
   {
      let tempCart = cart.filter(i => i.id !== id);
      setCart(tempCart);
      saveStorage(tempCart, 'cart');
   }

   // Create the cart's items Elements
   const cartEl = cart && cart.map(i => (
      <div key={i.id} className={styles.item}>
         <img src={i.image_url ?? notFound} className={styles.itemPic} />
         <div className={styles.itemInfo}>
            <h3 className={styles.itemName}>{i.title}</h3>
            <p className={styles.itemPrice}>${(Number(i.price) * i.quantity).toFixed(2)}</p>

            <div className={styles.quantity}>
               <p>Quantity: {i.quantity}</p>
               {edit === i.id && <input 
                  type="number"
                  value={newQuantity}
                  placeholder="New quantity"
                  className={styles.quantityInput}
                  onChange={e => setNewQuantity(e.target.value)}
               />}
            </div>

            <div className={styles.actions}>
               <button className={styles.deleteBtn} onClick={() => deleteItem(i.id)}>Delete</button>
               <button className={styles.editBtn} onClick={() => setEdit(i.id)}>Edit</button>
               {edit === i.id && <button className={styles.saveBtn} onClick={() => editQuantity(i.id)}>Save</button>}
            </div>
         </div>
      </div>
   ))

   // Handles the Checout proccess
   function checkout()
   {
      let message = '';
      let total = 0;
      const number = '96597977452';

      // Loops the cart's items and store them in a message variable
      cart.forEach(item => {
         message += `-${item.title} x${item.quantity} $${item.price}\n`
         total = (item.price * item.quantity) + total;
      })

      let totalMsg = `Total Price: $${total.toFixed(2)}`;

      // Redirect to whatsapp with a ready to send message that conatins the cart's items and the total cost
      const url =  "https://wa.me/" + number + "?text=" + encodeURIComponent(message) + encodeURIComponent(totalMsg);
      window.open(url, "_blank")
      clearStorage();
      setCart([]);
   }

   return(
      <>
         {showConfirm && <Popup setShowConfirm={setShowConfirm} checkout={checkout} />}
         <Darkmode theme={theme} setTheme={setTheme}/>
         <Navbar theme={theme} cart={cart} />
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         <ScrollTop />
         <main className={styles.container}>
            <div className={styles.sections}>

               <div className={styles.left}>
                  {cartEl}
                  {cart.length === 0 && <img src={emptyCart} alt="emptyCart" className={styles.emptyCartImg} /> }
               </div>

               <div className={styles.right}>
                  <div className={styles.checkout}>
                     <h2>Order Summary</h2>

                     <div className={styles.row}>
                        <p>Total:</p>
                        <p>${pricing?.totalPrice.toFixed(2)}</p>
                     </div>

                     <div className={styles.row}>
                        <p>Delivery:</p>
                        <p>${pricing?.delivery.toFixed(2)}</p>
                     </div>

                     <div className={styles.rowFinal}>
                        <p>Final Price:</p>
                        <p>${pricing?.finalPrice.toFixed(2)}</p>
                     </div>

                     <button onClick={() => setShowConfirm(true)} className={styles.whatsappBtn}>
                        <img src={whatsappIcon} className={styles.whatsappIcon} />
                        Checkout with WhatsApp
                     </button>
                  </div>
               </div>

            </div>
         </main>

         <Footer />
      </>
   )
}