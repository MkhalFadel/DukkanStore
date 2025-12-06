import styles from './admin.module.css'
import {useEffect, useState} from 'react';
import { addProducts, fetchProducts, updateProduct, deleteProduct } from '../../API/products';
import { SuccessAlert, WarningAlert, PrimaryAlert, DotPulseLoader, ErrorAlert } from '@mkhalfadel/modoui-core';
import ScrollTop from '../../components/scrollTop/ScrollTop'
import { validateInput } from '../../inputValidation';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';

export default function Admin({products, setProducts, isAdmin})
{
   const [product, setProduct] = useState({id: "", pId: "", title: "", price: 0, category: "Plastics", image: ""})
   const [productState, setProductState] = useState('adding');
   const [displayFrozen, setDisplayFrozen] = useState(false); // Check if the products displayed are the frozen one or not
   const [search, setSearch] = useState(""); // Search for a products
   const [searchState, setSearchState] = useState('name'); // Decide if the search will be by the name or id
   const [loading, setLoading] = useState(true); // Hide loader after fetching Products
   const [alert, setAlert] = useState({adding: false, deleting: false, updating: false}) // Hide/Display Alert messages
   const [errors, setErrors] = useState({});
   const [showAlert, setShowAlert] = useState(false);
   const [alertTimer, setAlertTimer] = useState(0);

   const navigate = useNavigate();

   useEffect(() => {
      !isAdmin && navigate("/login")
      
      async function loadProducts()
      {
         const data = await fetchProducts();
         const productsData = data || [];
         setProducts(productsData);
         setLoading(false)
      }
      loadProducts();
   }, [])

   // Take the image object and convert it into base64 to store
   function handleImageUpload(e)
   {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
         setProduct(p => ({...p, image: reader.result}));
      }

      reader.readAsDataURL(file);
   }

   // Display products
   function displayProducts()
   {
      let filterdProducts;

      if(displayFrozen)
         filterdProducts = products.filter(p => p.isFrozen);
      else if(!displayFrozen)
         filterdProducts = products.filter(p => !p.isFrozen)

      if(search)
         filterdProducts = searchState === 'name' ? filterdProducts.filter(p => p.title.toLowerCase().includes(search.toLocaleLowerCase())):
                                                   filterdProducts.filter(p => p.pId.toLowerCase().includes(search.toLocaleLowerCase()))


      return filterdProducts.map(p => (
         <tr key={p.pId}>
            <td>{p.pId}</td>
            <td>{p.title}</td>
            <td>{p.price}</td>
            <td>{p.category}</td>
            <td>
               <button className={styles.freezeBtn} onClick={() => handleFreezing(p.id, p.isFrozen)}>
                  {p.isFrozen ? "Unfreeze" : "Freeze"}
               </button>
            </td>
            <td><button className={styles.editBtn} onClick={() => handleProductUpdate(p.pId)}>Edit</button></td>
            <td><button className={styles.deleteBtn} onClick={() => handleDeleting(p.id)}>Delete</button></td>
         </tr>
      ))
   }
   
   // Take the products to update and adds its values to the inputs
   function handleProductUpdate(id)
   {
      setProductState('editing')
      const productToUpdate = products.filter(p => p.pId === id);
      console.log(productToUpdate[0])
      setProduct(p => ({
                        id: productToUpdate[0].id,
                        pId: productToUpdate[0].pId,
                        title: productToUpdate[0].title,
                        price: productToUpdate[0].price,
                        category: productToUpdate[0].category,
      }))
   }

   // Show alert messages depending on state
   function handleAlerts(state)
   {
      if (state === "adding") {
         setAlert(p => ({ ...p, adding: true }));
         setTimeout(() => {
            setAlert(p => ({ ...p, adding: false }));
         }, 3000);
      }

      else if (state === "deleting") {
         setAlert(p => ({ ...p, deleting: true }));
         setTimeout(() => {
            setAlert(p => ({ ...p, deleting: false }));
         }, 3000);
      }

      else if (state === "updating") {
         setAlert(p => ({ ...p, updating: true }));
         setTimeout(() => {
            setAlert(p => ({ ...p, updating: false }));
         }, 3000);
      }
   }

   // Decide what to do depending on if the user wants to update or add a products
   async function handleProduct()
   {
      const itemId = products.filter(p => p.pId === product.pId);
      console.log(itemId[0])
      if(productState === 'adding'){
         const ID = nanoid();
         const adding = await addProducts(product.pId = ID, product.title, Number(product.price).toFixed(2), product.category, product.image)
         setProducts(p => ([...p, {...product, pId: ID}]))
         adding && setProduct(() => ({pId: "", title: "", price: 0, image: '', category: ''}))
         adding && handleAlerts("adding")
      }
      else{
         const updating = updateProduct({id: product.id, title: product.title, price: Number(product.price).toFixed(2), category: product.category, image: product.image});
         setProducts(products.filter(p => p.pId !== itemId[0].pId));
         setProducts(prev => ([...prev, product]))
         setProduct(() => ({title: "", price: 0, image: '', category: ''}))
         setProductState('adding')
         updating && handleAlerts("updating")
      }
   }

   function handleForm()
   {
      const validationErrors = validateInput(product.title, Number(product.price), product.image);
      if(Object.keys(validationErrors).length > 0)
      {
         setErrors(validationErrors);
         setShowAlert(true)
         displayAlerts()
      }   
      else
         handleProduct()
   }

   // Handles Deleting a product
   async function handleDeleting(id)
   {
      const deleting = await deleteProduct(id);
      deleting && setProducts(products.filter(p => p.id !== id));
      deleting && handleAlerts("deleting")
   }

   // Handles Freezing a product
   async function handleFreezing(id, isFrozen)
   {
      const frezzing = updateProduct({id, isFrozen: !isFrozen});
      frezzing && setProducts(product => product.map(p => p.pId === id ? {...p, isFrozen: !isFrozen} : p))
      frezzing && handleAlerts("updating");
   }

   function displayAlerts()
   {
      if(alertTimer)
         clearTimeout(alertTimer);

      const timer = setTimeout(() => {
         setShowAlert(false);
      }, 1500)

      setAlertTimer(timer)
   }

   return(
      <div className={styles.dashboard}>
         <ScrollTop />

         <div className={styles.alert}>
            {alert.adding && <SuccessAlert text="Item Added" />}
            {alert.deleting && <WarningAlert text="An Item was Deleted" />}
            {alert.updating && <PrimaryAlert text="Item Updated" />}
         </div>

         <div className={`${styles.errorAlerts} ${showAlert ? styles.active : ""}`}>
            {errors.name && <ErrorAlert text={errors.name} />}
            {errors.price && <ErrorAlert text={errors.price} />}
            {errors.image && <ErrorAlert text={errors.image} />}
         </div>

         <div className={styles.card}>
            <div className={styles.row}>
               <input
                  placeholder="Product Name"
                  value={product.title}
                  type="text"
                  className={styles.input}
                  onChange={(e) => setProduct(p => ({...p, title: e.target.value}))}
               />
            </div>

            <div className={styles.row}>
                  <input
                     placeholder="Product Price"
                     value={product.price}
                     type="number"
                     className={styles.input}
                     onChange={(e) => setProduct(p => ({...p, price: e.target.value}))}
                  />
               
                  <input
                     type="file"
                     accept="image/*"
                     className={styles.file}
                     onChange={handleImageUpload}
                  />

               <select
                  className={styles.select}
                  value={product.category}
                  onChange={(e) => setProduct(p => ({...p, category: e.target.value}))}
               >
                  <option value="Plastics">Plastics</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Toys">Toys</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Decoration">Decoration</option>
               </select>
            </div>

            <button className={styles.actionBtn} onClick={handleForm}>
               {productState === "adding" ? "Add Product" : "Update Product"}
            </button>
         </div>

         {/* Filters */}
         <div className={styles.card}>
            <div className={styles.rowCenter}>
               <button
                  className={`${styles.toggleBtn} ${!displayFrozen ? styles.active : ""}`}
                  onClick={() => setDisplayFrozen(false)}
               >
                  All Products
               </button>

               <button
                  className={`${styles.toggleBtn} ${displayFrozen ? styles.active : ""}`}
                  onClick={() => setDisplayFrozen(true)}
               >
                  Frozen Products
               </button>
            </div>

            <div className={styles.rowCenter}>
               <input
                  placeholder={`Search product by ${searchState === "name" ? "Name" : "ID"}`}
                  value={search}
                  type="text"
                  className={styles.input}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>

            <div className={styles.rowCenter}>
               <button
                  className={`${styles.toggleBtn} ${searchState === "id" ? styles.active : ""}`}
                  onClick={() => setSearchState("id")}
               >
                  Search by ID
               </button>

               <button
                  className={`${styles.toggleBtn} ${searchState === "name" ? styles.active : ""}`}
                  onClick={() => setSearchState("name")}
               >
                  Search by Name
               </button>
            </div>
         </div>

         {/* Products Table */}
         <div className={styles.card}>
            <table className={styles.table}>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Category</th>
                     <th>Freeze</th>
                     <th>Edit</th>
                     <th>Delete</th>
                  </tr>
               </thead>

               <tbody>
                  {products && displayProducts()}
               </tbody>
            </table>

            {loading && (
               <div className={styles.loader}>
                  <DotPulseLoader />
               </div>
            )}
         </div>
      </div>
   )
}