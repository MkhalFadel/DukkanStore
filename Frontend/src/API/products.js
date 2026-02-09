const API_URL = import.meta.env.VITE_API_URL;

export async function addProducts(id, title, price, category, image)
{
   try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const res = await fetch(`${API_URL}/api/products/upload`, {
         method: 'POST',
         body: formData
      })
      
      return await res.json();
      
   } catch (error) {
      console.log(error);
   }
}

export async function fetchProducts()
{
   try{
      const res = await fetch(`${API_URL}/api/products`);
      // console.log(await res.json())
      return await res.json();
   }  
   catch(err){
      console.log(err);
   }
}

export async function deleteProduct(id)
{
   try{
      const res = await fetch(`${API_URL}/api/products/${id}`, {
         method: 'DELETE'
      })
      return res.ok;
   }
   catch(err)
   {
      console.log(err);
   }
}

export async function updateProduct(id, data)
{
   const formData = new FormData();

   Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
   })

   if(data.image_url)
      formData.append("image", data.image_url);

   const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PUT',
      body: formData
   });

   return await res.json();
}