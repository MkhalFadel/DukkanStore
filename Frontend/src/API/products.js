const API_URL = 'https://6923368a09df4a492324b26f.mockapi.io/dukkan/';

export async function test()
{
   const res = await fetch("http://localhost:5000/api/test/");
   const data = await res.json();
   console.log(data);
}

export async function addProducts(pId, title, price, category, image)
{
   try{
         const res = await fetch(`${API_URL}/Products`,{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({pId, title, price, category, image})
         }) 
         return res.ok;
   }
   catch(err)
   {
      console.log(err)
   }
}

export async function fetchProducts()
{
   try{
      const res = await fetch(`${API_URL}/Products`)
      return res.json();
   }  
   catch(err){
      console.log(err);
   }
}

export async function deleteProduct(id)
{
   try{
      const res = await fetch(`${API_URL}/Products/${id}`, {
         method: 'DELETE'
      })
      return res.ok;
   }
   catch(err)
   {
      console.log(err);
   }
}

export async function updateProduct({id, title, price, category, image, isFrozen})
{
   try{
      const res = await fetch(`${API_URL}/Products/${id}`,{
         method: 'PUT',
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({title: title, price: price, category: category, image: image, isFrozen: isFrozen})
      }) 
      
      return res.ok;
   }
   catch(err)
   {
      console.log(err);
   }
}