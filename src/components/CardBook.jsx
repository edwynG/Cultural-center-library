import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { imagePixels } from "../js/API";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CardBook(props) {
  const [expanded, setExpanded] = useState(false);
  const [url, setUrl] = useState("");

  window.addEventListener("click", () => {
    setExpanded(false);
  });
  let classes = {
    cardContent: {
      display: "grid",
      gap: 1,
      padding: 1.5,
    },
    cardContainer: {
      width: { xs: "90vw", sm: 600 },
      minWidth: 275,
    },
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  useLayoutEffect(() => {
    imagePixels(
      props.data.title,
      setUrl,
      "https://images.pexels.com/photos/13650913/pexels-photo-13650913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    );
  }, []);

  return (
    <>
      <Card sx={classes.cardContainer}>
        <CardMedia component="img" height={180} image={url} alt="Libro" />
        <CardContent sx={classes.cardContent}>
          <Typography variant="h6" color="text" sx={{ fontWeight: "bold" }}>
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.observations}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display={props.data.editorial == null ? "none" : " "}
          >
            <b>Autor:</b> {props.data.author}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display={props.data.year_edition == null ? "none" : " "}
          >
            <b>Año de edición:</b> {props.data.year_edition}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display={props.data.editorial == null ? "none" : " "}
          >
            <b>Editorial:</b> {props.data.editorial}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="body1">Detalles</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MdExpandMore />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={classes.cardContent}>
            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.isbn_issn == null ? "none" : " "}
            >
              <b>ISBN-ISSN:</b> {props.data.isbn_issn}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.page == null ? "none" : " "}
            >
              <b>Numero de pagina:</b> {props.data.page}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.colection == null ? "none" : " "}
            >
              <b>Colección:</b> {props.data.colection}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.city == null ? "none" : " "}
            >
              <b>Ciudad:</b> {props.data.city}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.ejempla == null ? "none" : " "}
            >
              <b>Ejemplares:</b> {props.data.ejempla}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.support == null ? "none" : " "}
            >
              <b>Soporte</b>: {props.data.support}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.type_support == null ? "none" : " "}
            >
              <b>Tipo de Soporte</b>: {props.data.type_support}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.materia == null ? "none" : " "}
            >
              <b>Materias</b>: {props.data.materia}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.location == null ? "none" : " "}
            >
              <b>Ubicación:</b> {props.data.location}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              display={props.data.register == null ? "none" : " "}
            >
              <b>Registro:</b> {props.data.register}
            </Typography>

          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default CardBook;
