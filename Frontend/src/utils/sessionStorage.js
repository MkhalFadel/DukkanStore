export function saveSession(data, name)
{
   sessionStorage.setItem(name, JSON.stringify(data));
}

export function getSession(name)
{
   return JSON.parse(sessionStorage.getItem(name));
}