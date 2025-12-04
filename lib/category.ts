export const getCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories");
  const categories = await res.json();
  return categories;
};
