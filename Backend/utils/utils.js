const supabase = require('../config/supabase');
const { v4: uuidv4 } = require("uuid");


function checkProductFields(data)
{
   const fields = {};
   if(data.title !== undefined) fields.title = data.title;
   if(data.price !== undefined) fields.price = parseFloat(data.price);
   if(data.category !== undefined) fields.category = data.category;
   if(data.is_frozen !== undefined)
   {
      if(data.is_frozen === 'true' || data.is_frozen === true) fields.is_frozen = true;
      else fields.is_frozen = false;
   } 

   return fields;
}

async function updateImage(file)
{
   let newFileName;
   const ext = file.originalname.split(".").pop();
   newFileName = `${uuidv4()}.${ext}`;

   const {error} = await supabase.storage
   .from("products-images")
   .upload(newFileName, file.buffer, {
      contentType: file.mimetype
   })

   if(error) throw error;

   const {data} = supabase.storage
   .from("products-images")
   .getPublicUrl(newFileName);

   return data.publicUrl;
}

module.exports = {checkProductFields, updateImage};