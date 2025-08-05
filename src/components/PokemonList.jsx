import { useInfinitePokemon } from "../hooks/useInfinitePokemon";
import { useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { keyframes } from "@emotion/react";

export default function PokemonList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePokemon();
  const loaderRef = useRef();

  const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#665bdf",
        }}
      >
        <CircularProgress
          size={80}
          sx={{
            color: "#ffffff",
            animation: `${spin} 1s linear infinite`,
            mb: 2,
          }}
        />
        <Box
          component="span"
          sx={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Pika Pika Pikachu...
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className="pokemon-list"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        backgroundColor: "#665bdf",
        paddingX: 10,
      }}
    >
      {data?.pages.map((page) =>
        page.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      )}
      <div ref={loaderRef} />
      {isFetchingNextPage && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            mt: 4,
            mb: 2,
          }}
        >
          <CircularProgress
            size={20}
            sx={{
              color: "#ffffff",
              animation: `${spin} 1s linear infinite`,
              mr: 1,
            }}
          />
          <Box
            component="span"
            sx={{
              color: "#ffffff",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Loading more...
          </Box>
        </Box>
      )}
    </Box>
  );
}
