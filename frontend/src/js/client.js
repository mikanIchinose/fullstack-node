const API_URL = 'http://localhost:3000'

export const client = async () => {
  let res = await fetch(API_URL)
  return res.json()
}
