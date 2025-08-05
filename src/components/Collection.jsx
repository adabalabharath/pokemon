import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getCollection, saveToCollection } from "../utils/localStorageHelpers";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { typeColors } from "../utils/colors";
import Chip from "@mui/material/Chip";

function Collection() {
  const [collection, setCollection] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setCollection(getCollection());
  }, []);

  const handleRemove = (id) => {
    const updated = collection.filter((p) => p.id !== id);
    setCollection(updated);
    saveToCollection(updated);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(collection);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setCollection(items);
    saveToCollection(items);
  };

  return (
    <Box
      sx={{
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#665bdf",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h6"
        fontFamily={"fantasy"}
        fontStyle={"normal"}
        color="#ffffff"
        mb={4}
        sx={{ textDecoration: "underline" }}
      >
        My Collection
      </Typography>
      {collection.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            fontSize={18}
            mb={2}
            fontWeight={"bold"}
            color="#ffffff"
          >
            No collections yet.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ textTransform: "none", fontWeight: "bold", borderRadius: 3 }}
            onClick={() => navigate("/")}
          >
            Back to Discover
          </Button>
        </Box>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="collection">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  p: 4,
                  justifyContent: "center",
                }}
              >
                {collection.map((pokemon, index) => (
                  <Draggable
                    key={pokemon.id}
                    draggableId={pokemon.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          sx={{
                            padding: 2,
                            textAlign: "center",
                            width: 300,
                            position: "relative",
                            borderRadius: 5,
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              position: "absolute",
                              backgroundColor: "red",
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
                            onClick={() => handleRemove(pokemon.id)}
                          >
                            X
                          </Button>

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

                          <h3>{pokemon.name}</h3>
                          <p>
                            {pokemon.types.map((t, i) => (
                              <Chip
                                sx={{
                                  textTransform: "none",
                                  borderRadius: 5,
                                  ml: 1,
                                  mr: 1,
                                  pointerEvents: "none",
                                  backgroundColor:
                                    typeColors[t.type.name] || "#ccc",
                                  color: "#fff",
                                  fontFamily: "monospace",
                                  fontWeight: "bold",
                                  padding: "0.2rem 0.5rem",
                                  fontSize: "1.0rem",
                                }}
                                key={t.type.name + "-" + i}
                                label={t.type.name}
                              />
                            ))}
                          </p>
                          <Grid
                            container
                            justifyContent={"space-between"}
                            p={2}
                          >
                            <Grid
                              item
                              container
                              direction={"column"}
                              alignItems="center"
                            >
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
                            <Grid
                              item
                              container
                              direction={"column"}
                              alignItems="center"
                            >
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
                            <Grid
                              item
                              container
                              direction={"column"}
                              alignItems="center"
                            >
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
}

export default Collection;
