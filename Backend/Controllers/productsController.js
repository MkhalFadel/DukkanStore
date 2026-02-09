const prisma = require("../Database/prismaClient");

async function getAllProducts() {
   try {
      const products = await prisma.products.findMany();
      return products;
   } catch (error) {
      console.error('Database error:', error.message);
   }
}

async function getProductById(id) {
   try {
      const product = await prisma.products.findUnique({
         where: { id: parseInt(id) }
      });
      return product;
   } catch (error) {
      console.error('Database error:', error.message);
   }
}

async function createProduct(data, image) {
   try {
      const product = await prisma.products.create({
         data: {
            title: data.title,
            price: data.price ? parseFloat(data.price) : null,
            category: data.category || null,
            image_url: image || null,
            is_frozen: data.is_frozen || false
         }
      });
      console.log('Product created:', product);
      return product;
   } catch (error) {
      console.error('Database error:', error.message);
   }
}

async function updateProductAPI(id, data) {
   try {
      const product = await prisma.products.update({
         where: { id: parseInt(id) },
         data: data
      });
      console.log("DB function is running")
      console.log('Product updated:', product);
      return product;
   } catch (error) {
      console.error('Database error:', error.message);
   }
}

async function deleteProduct(id) {
   try {
      const product = await prisma.products.delete({
         where: { id: parseInt(id) }
      });
      console.log('Product deleted:', product);
      return product;
   } catch (error) {
      console.error('Database error:', error.message);
   }
}

module.exports = {
   getAllProducts,
   getProductById,
   createProduct,
   updateProductAPI,
   deleteProduct
};