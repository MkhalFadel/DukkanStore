// Save cart in localStorage
export function saveStorage(data, name)
{
   console.log(name)
   try {
      const toStore = JSON.stringify(data ?? []);
      localStorage.setItem(name, toStore);
   } catch (err) {
      console.error('saveStorage failed:', err);
   }

}

// Fetch the cart from localStorage
export function getStorage(name)
{
   try {
      if (typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem(name);
      if (!raw) return [];
      // parse and return; if parsing fails, return an empty array
      return JSON.parse(raw);
   } catch (err) {
      console.error('getStorage failed:', err);
      return [];
   }
}

// Clear localStorage on checkout
export function clearStorage(name)
{
   localStorage.removeItem(name)
}