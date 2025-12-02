export function saveStorage(cart)
{
   try {
      const toStore = JSON.stringify(cart ?? []);
      localStorage.setItem('cart', toStore);
   } catch (err) {
      console.error('saveStorage failed:', err);
   }
}

export function getStorage()
{
   try {
      if (typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem('cart');
      if (!raw) return [];
      // parse and return; if parsing fails, return an empty array
      return JSON.parse(raw);
   } catch (err) {
      console.error('getStorage failed:', err);
      return [];
   }
}