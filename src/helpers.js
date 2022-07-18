export async function fetchJson(url) {
  const data = await fetch(url)
  return await data.json()
}

export function toArray(obj) {
  return Object.keys(obj).map((key) => ({ id: key, ...obj[key] }))
}
