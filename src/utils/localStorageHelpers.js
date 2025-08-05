const COLLECTION_KEY = "pokemonCollection";

export const getCollection = () => {
  const stored = localStorage.getItem(COLLECTION_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveToCollection = (collection) => {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
};
