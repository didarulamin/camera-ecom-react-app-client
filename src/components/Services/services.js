import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import fluoride from "../../assets/fluoride.png";
import cavity from "../../assets/cavity.png";
import whitening from "../../assets/whitening.png";

const data = [
  {
    name: "Fluoride Treatment",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas",
    img: fluoride,
  },
  {
    name: "Cavity Filling",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas",
    img: cavity,
  },
  {
    name: "Teeth Whitening",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas",
    img: whitening,
  },
];

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={{ fontWeight: 500, m: 2, color: "#63b7d5" }}
        variant="h6"
        component="div"
        align="center"
      >
        OUR SERVICES
      </Typography>
      <Typography
        sx={{ fontWeight: 600, m: 5 }}
        variant="h4"
        component="div"
        align="center"
      >
        Services We Provide
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        alignItems="center"
        justifyContent="center"
      >
        {data.map((item, index) => (
          <Grid item xs={3} sm={3} md={3}>
            <Card sx={{ width: 275, border: 0, boxShadow: 0 }}>
              <CardContent>
                <CardMedia
                  component="img"
                  image={item.img}
                  alt="green iguana"
                  style={{ width: "auto", height: "80px", margin: "auto" }}
                />
                <Typography variant="h5" component="div" align="center">
                  {item.name}
                </Typography>

                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
