import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
// Function to fetch Pokémon data with pagination
const fetchPokemon = async ({ pageParam = 0 }) => {
  const limit = 6;
  const offset = pageParam * limit;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  const pokemons = await Promise.all(
    response.data.results.map(async (p) => {
      const res = await axios.get(p.url);
      return res.data;
    })
  );

  return {
    pokemons,
    nextPage: pageParam + 1,
    hasMore: response.data.next !== null,
  };
};
// Custom hook to use infinite query for Pokémon data
export const useInfinitePokemon = () =>
  useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });
