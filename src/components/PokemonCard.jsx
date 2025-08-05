import Card from "@mui/material/Card";
import { saveToCollection, getCollection } from "../utils/localStorageHelpers";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { typeColors } from "../utils/colors";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

export default function PokemonCard({ pokemon }) {
  const [exists, setExists] = useState(false);

 const handleAdd = () => {
  const current = getCollection();
  const updated = [...current, pokemon];
  saveToCollection(updated);
  setExists(true);
};

const handleRemove = (id) => {
  const current = getCollection();
  const updated = current.filter((p) => p.id !== id);
  saveToCollection(updated);
  setExists(false); 
};

useEffect(() => {
  const current = getCollection();
  setExists(current.some((p) => p.id === pokemon.id));
}, [pokemon.id]);


  return (
    <Card
      className="card"
      sx={{
        margin: 5,
        padding: 2,
        textAlign: "center",
        width: 300,
        position: "relative",
        borderRadius: 5,
      }}
    >
      <Tooltip
        title={exists ? "Remove from Collection" : "Add to Collection"}
        arrow
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            backgroundColor: exists ? "red" : "#079a5f",
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            minWidth: 0,
            borderRadius: "50%",
            padding: 0,
            fontSize: "1rem",
            zIndex: 1000,
          }}
          onClick={() => (exists ? handleRemove(pokemon.id) : handleAdd())}
        >
          {exists ? "x" : "+"}
        </Button>
      </Tooltip>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{
          border: "1px solid black",
          borderRadius: "50%",
          height: "25%",
          backgroundColor: "#c25aab",
        }}
      />

      <Typography variant="subtitle1" fontFamily={"fantasy"}>
        {pokemon.name}
      </Typography>
   
        {pokemon.types.map((t, i) => (
          <>
            <Chip
              sx={{
                textTransform: "none",
                borderRadius: 5,
                ml: 1,
                mr: 1,
                pointerEvents: "none",
                backgroundColor: typeColors[t.type.name] || "#ccc",
                color: "#fff",
                fontFamily: "monospace",
                fontWeight: "bold",
                padding: "0.2rem 0.5rem",
                fontSize: "1.0rem",
              }}
              key={t.type.name + "-" + i}
              label={t.type.name}
            />
          </>
        ))}
   
      <Grid container justifyContent={"space-between"} p={2}>
        <Grid item container direction={"column"} alignItems="center">
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {pokemon.stats[0].base_stat}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: "bold" }}
          >
            HP
          </Typography>
        </Grid>
        <Grid item container direction={"column"} alignItems="center">
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {pokemon.stats[1].base_stat}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: "bold" }}
          >
            Attack
          </Typography>
        </Grid>
        <Grid item container direction={"column"} alignItems="center">
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {pokemon.stats[2].base_stat}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: "bold" }}
          >
            Defense
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
