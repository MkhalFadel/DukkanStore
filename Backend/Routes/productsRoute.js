const express = require("express");
const { v4: uuidv4 } = require("uuid");
const supabase = require("../config/supabase");
const upload = require("../middleware/upload")
const router = express.Router();

const {getAllProducts, createProduct, updateProductAPI, deleteProduct, getProductById} = require("../Controllers/productsController");
const {checkProductFields, updateImage} = require("../utils/utils");

router.get("/", async (req, res) => {
   try {
      const products = await getAllProducts();
      res.status(200).json({data: products});
   } catch (error) {
      res.status(400).json({msg: "Failed to fetch data"});
   }
})

// router.post('/', async(req, res) => {
//    try {
//       const data = await createProduct(req.body);
//       res.status(201).json({data: data});
//    } catch (error) {
//       res.status(400).json({msg: "failed to create product", error: error.message});
//    }
// })

router.post("/upload", upload.single("image"), async (req, res) => {
   try {
      const bodyData = req.body;
      const file = req.file;

      if (!file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      if (!bodyData.title || !bodyData.price) {
         return res.status(400).json({ message: "Invalid product data" });
      }

      const ext = file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${ext}`;

      const { error } = await supabase.storage
         .from("products-images")
         .upload(fileName, file.buffer, {
         contentType: file.mimetype,
         });

      if (error) throw error;

      const { data } = supabase.storage
         .from("products-images")
         .getPublicUrl(fileName);

      try {
         const productData = await createProduct(bodyData, data.publicUrl);
         res.status(201).json({ data: productData });
      } catch (dbErr) {
         await supabase.storage.from("products-images").remove([fileName]);
         throw dbErr;
      }

   } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
   }
});


router.put('/:id', upload.single("image"), async(req, res) => {
   try {
      const {id} = req.params;
      const body = req.body;
      const file = req.file;

      const updates = checkProductFields(body);

      const product = await getProductById(id);

      let imageUrl = product.image_url;

      if(file){
         imageUrl = await updateImage(file)
         updates.image_url = imageUrl
      }
      
      await updateProductAPI(id, updates);

      if(file && product.image_url){
         const oldPath = product.image_url.split("/products-images/")[1];
         await supabase.storage.from("products-images").remove([oldPath]);
      }
      
      res.status(200).json({msg: "Product updated"});
   } catch (error) {
      console.log('ERROR:', error)
      res.status(400).json({msg: "faild to update product", err: error.message});
   }
})

router.delete("/:id", async (req, res) => {
   try {
      const {id} = req.params;
      await deleteProduct(id);
      res.status(200).json({msg: "product deleted!!"});
   } catch (error) {
      res.status(400).json({msg: "failed to delete product"});
   }
})

module.exports = router;