// Error messages for validation
const errorMessages ={
   emptyName: "Name Can not be empty",
   negativeValue: "Price must be at least 0",
   emptyImage: 'Image Required'
}

// Check passed value for invalid input
export function validateInput(name, price, img)
{
   const errors = {};

   if(!name)
      errors.name = errorMessages.emptyName;

   if(price < 0)
      errors.price = errorMessages.negativeValue;

   if(!img)
      errors.image = errorMessages.emptyImage;

   return errors
}