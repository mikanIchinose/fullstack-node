export const client = async () => {
  let res = await fetch("http://localhost:3000");
  return res.json();
};
