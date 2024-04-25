import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { imagePixels } from "../js/API";

function CardCategory({ title, image = "Literatura" }) {
  const [url, setUrl] = useState("");
  const classes = {
    containerPaper: {
      borderRadius: 2,
    },
    containerCard: {
      width: 275,
      height: 220,
      borderRadius: "inherit",
      display: "grid",
    },
    cardArea: {
      height: "100%",
      // transition: "all 300ms ease",
      // "&:hover": { backgroundColor: "#5DD782", color: "#fff" },
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      gap: 0.5,
      color: "inherit",
      padding: 1,
    },
    avatar: {
      width: 56,
      height: 56,
    },
    titleCard: {
      fontWeight: 500,
      fontSize: 21,
      overflow: "hidden",
      textWrap: "nowrap",
      width: "21.3ch",
    },
    subTitleCard: {
      fontWeight: 100,
      fontSize: 14,
    },
    img: {
      height: 130,
      width: "100%",
    },
  };


  useLayoutEffect(() => {
    imagePixels(image,setUrl)
  }, []);

  return (
    <Paper sx={classes.containerPaper} elevation={2}>
      <Card sx={classes.containerCard}>
        <CardActionArea sx={classes.cardArea} component="span">
          <CardMedia src={url} component="img" sx={classes.img} alt="Imagen" />
          <CardContent sx={classes.cardContent}>
            <Typography variant="h6" sx={classes.titleCard}>
              {title}
            </Typography>
            <Typography variant="body2" sx={classes.subTitleCard}>
              La lectura alimenta la mente.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Paper>
  );
}

export default CardCategory;
