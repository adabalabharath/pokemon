import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Route, Routes } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import Card from "@mui/material/Card";
import PokemonList from "./components/PokemonList";
import Collection from "./components/Collection";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {"\u{1F525}"} Pokemon Collection App
          </Typography>
          <Typography variant="body2">
            Discover and Collect your favorite Pokemon
          </Typography>

          <nav>
            <Link to="/">
              <Button
                startIcon={<SearchIcon />}
                variant="contained"
                sx={{
                  borderRadius: 5,
                  backgroundColor: "purple",
                  margin: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                size="small"
              >
                Discover Pokemon
              </Button>
            </Link>
            {"|"}{" "}
            <Link to="/collection">
              <Button
                startIcon={<CollectionsBookmarkIcon />}
                variant="contained"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                size="small"
              >
                My Collection
              </Button>
            </Link>
          </nav>
        </Card>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
