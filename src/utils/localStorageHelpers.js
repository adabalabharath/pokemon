const COLLECTION_KEY = "pokemonCollection";
// Function to get the Pokémon collection from localStorage
export const getCollection = () => {
  const stored = localStorage.getItem(COLLECTION_KEY);
  return stored ? JSON.parse(stored) : [];
};
// Function to save the Pokémon collection to localStorage
export const saveToCollection = (collection) => {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
};
