const API_URL = 'http://localhost:5000/api/products';

export async function addProducts(id, title, price, category, image)
{
   try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const res = await fetch(`${API_URL}/upload`, {
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
      const res = await fetch(`${API_URL}`);
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
      const res = await fetch(`${API_URL}/${id}`, {
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

   const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      body: formData
   });

   return await res.json();
}