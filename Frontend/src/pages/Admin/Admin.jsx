import styles from './admin.module.css'
import {useEffect, useState} from 'react';
import { addProducts, fetchProducts, updateProduct, deleteProduct } from '../../API/products';
import { SuccessAlert, WarningAlert, PrimaryAlert, DotPulseLoader, ErrorAlert } from '@mkhalfadel/modoui-core';
import ScrollTop from '../../components/scrollTop/ScrollTop'
import { validateInput } from '../../utils/inputValidation';
import { useNavigate } from 'react-router';
import { nanoid } from 'nanoid';

export default function Admin({products, setProducts, isAdmin})
{
   const [product, setProduct] = useState({id: "", title: "", price: 0, category: "Plastics", image: ""})
   const [productState, setProductState] = useState('adding');
   const [displayFrozen, setDisplayFrozen] = useState(false); // Check if the products displayed are the frozen one or not
   const [search, setSearch] = useState(); // Search for a products
   const [searchState, setSearchState] = useState('name'); // Decide if the search will be by the name or id
   const [loading, setLoading] = useState(true); // Hide loader after fetching Products
   const [alert, setAlert] = useState({adding: false, deleting: false, updating: false}) // Hide/Display Alert messages
   const [errors, setErrors] = useState({}); // Store errors to display if any were found
   const [showAlert, setShowAlert] = useState(false); // Shows alerts
   const [alertTimer, setAlertTimer] = useState(0); // Stores timeout ID's to prevent UI issues

   const navigate = useNavigate();

   useEffect(() => {
      !isAdmin && navigate("/login")
      
      async function loadProducts()
      {
         const data = await fetchProducts();
         const productsData = await data.data || [];
         setProducts(productsData);
         setLoading(false)
         console.log(productsData)
      }

      loadProducts();
   }, [])

   // Take the image object and convert it into base64 to store
   function handleImageUpload(e)
   {
      setProduct(p => ({...p, image: e.target.files[0]}))
   }

   // Display products
   function displayProducts()
   {
      let filterdProducts;

      if(displayFrozen)
         filterdProducts = products.filter(p => p.is_frozen);
      else if(!displayFrozen)
         filterdProducts = products.filter(p => !p.is_frozen)

      if(search)
         filterdProducts = searchState === 'name' ? filterdProducts.filter(p => p.title.toLowerCase().includes(search.toLocaleLowerCase())):
                                                   filterdProducts.filter(p => String(p.id).includes(String(search)))


      return filterdProducts.map(p => (
         <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.title}</td>
            <td>{p.price}</td>
            <td>{p.category}</td>
            <td>
               <button className={styles.freezeBtn} onClick={() => handleFreezing(p.id, p.is_frozen)}>
                  {p.is_frozen ? "Unfreeze" : "Freeze"}
               </button>
            </td>
            <td><button className={styles.editBtn} onClick={() => handleProductUpdate(p.id)}>Edit</button></td>
            <td><button className={styles.deleteBtn} onClick={() => handleDeleting(p.id)}>Delete</button></td>
         </tr>
      ))
   }
   
   // Take the products to update and adds its values to the inputs
   function handleProductUpdate(id)
   {
      scroll({top: 0, behavior: 'smooth'})
      setProductState('editing')
      const productToUpdate = products.filter(p => p.id === id);
      console.log(productToUpdate[0])
      console.log("ID:", id);
      setProduct(() => ({
                        id: productToUpdate[0].id,
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
      const itemId = products.filter(p => p.id === product.id);
      if(productState === 'adding'){
         const ID = nanoid();
         const adding = await addProducts(ID, product.title, Number(product.price).toFixed(2), product.category, product.image)
         setProducts(p => ([...p, {...product, id: ID}]))
         adding && setProduct(() => ({id: "", title: "", price: 0, image: '', category: 'Plastics'}))
         adding && handleAlerts("adding")
      }
      else{
         const updating = await updateProduct(product.id, {title: product.title, 
                                                            price: product.price,
                                                            category: product.category,
                                                            image: product.image});
         setProducts(products.filter(p => p.id !== itemId[0].id));
         setProducts(prev => ([...prev, product]))
         setProduct(() => ({title: "", price: 0, image: '', category: 'Plastics'}))
         setProductState('adding')
         updating && handleAlerts("updating")
      }
   }

   // Validates the input value for proudcts and checks if values are valid
   function handleForm()
   {
      let validationErrors;
      if(productState === 'adding')
         validationErrors = validateInput("adding", product.title, Number(product.price), product.image);
      else
         validationErrors = validateInput("editing", product.title, Number(product.price));


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
   async function handleFreezing(id, is_frozen)
   {
      const frezzing = updateProduct(id, {is_frozen: !is_frozen});
      frezzing && setProducts(product => product.map(p => p.id === id ? {...p, is_frozen: !is_frozen} : p))
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
                  <option value="Cleaning">Cleaning products</option>
                  <option value="Makeup">Makeup</option>
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
            <div className={styles.tableWrapper}>
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
            </div>

            {loading && (
               <div className={styles.loader}>
                  <DotPulseLoader />
               </div>
            )}
         </div>
      </div>
   )
}