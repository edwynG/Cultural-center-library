import React, { useContext, useLayoutEffect, useState } from "react";
import { Context } from "../../context/Context";
import { getAxios } from "../../js/API";
import { useLocation } from "react-router-dom";
import CardBook from "../CardBook";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AppbarDesing from "../AppbarDesing";
import ArrowTop from "../ArrowTop";

function ModalBooks() {
  const location = useLocation();
  const [collection, setCollection] = useState("");
  const { capitalize } = useContext(Context);
  const [dataBooks, setDataBooks] = useState([]);
  const [listCard, setListCard] = useState([]);
  const [loanding, setLoanding] = useState(true);
  const [isValidPage, setIsValidPage] = useState(false);
  const [stopErrorFound, setStopErrorFound] = useState(false);
  const classes = {
    containerCardBook: {
      padding: 1,
      maxWidth: 1200,
      margin: "auto !important",
      gap: 2,
      paddingTop: 6,
      paddingBottom: { xs: 10, sm: 4 },
    },
    containerCollectionsText: {
      textAlign: "center",
    },
    subTitle: {
      fontWeight: "bold",
      color: "#A2A2A2",
    },
    title: {
      fontWeight: "bold",
      fontSize: { xs: 28, sm: 48 },
    },
    progress: {
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const setting = (str) => {
    let arr = str.split("/");
    // arr = arr[2].split("%20"); //-> /Collections/Book
    arr = arr[1].split("%20"); // -> /Book
    let res = arr.join(" ");
    return res;
  };

  const genericList = (data) => {
    let arr = Array();
    arr = data.map((obj) => {
      return (
        <Grid item key={obj.isbn_issn + obj.register} name={obj.title}>
          <CardBook data={obj} />
        </Grid>
      );
    });
    setDataBooks(arr);
    setListCard(arr);
  };

  const isValidBook = (pages, name) => {
    return pages.some(e => e.sheet.toLowerCase() === name.toLowerCase());
  };

  useLayoutEffect(() => {
    const path = setting(decodeURIComponent(location.pathname));
    let name = capitalize(path);
    getAxios()
      .then((data) => {
        let result = isValidBook(data.result, name);
        setIsValidPage(result)
        setStopErrorFound(true);

      })
      .catch((err) => {
        console.info("Pagina no encontrada");
      });
    if (dataBooks.length <= 0) {
      setCollection(name);
      getAxios(`/${path}`)
        .then((res) => {
          genericList(res.result);
        })
        .catch((err) => {
          setLoanding(false);
          setListCard(["Lo sentimos hubo un error:("]);
        });
    }
    if (dataBooks.length > 0) {
      setLoanding(false);
    }
  }, [dataBooks]);

  return (
    <>
      {!stopErrorFound && (
        <>
          {" "}
          <Box sx={{...classes.progress,height:"95vh"}}>
            <CircularProgress color="secondary" />
          </Box>
        </>
      )}
      {!isValidPage ? (
        stopErrorFound && (
          <>
            <Container>
              <Typography
                variant="h2"
                textAlign={"center"}
                color={"red"}
                paddingTop={20}
              >
                Error 404
              </Typography>
              <Typography variant="h3" textAlign={"center"}>
                pagina no encontrada
              </Typography>
            </Container>
          </>
        )
      ) : (
        <>
          <AppbarDesing comparison={dataBooks} coincidences={setListCard} />
          <Stack spacing={3} paddingTop={1}>
            <Stack sx={classes.containerCollectionsText}>
              <Typography variant="h6" sx={classes.subTitle}>
                Elija su favorito
              </Typography>
              <Typography variant="h3" sx={classes.title}>
                {collection}
              </Typography>
            </Stack>
            <Stack sx={classes.containerCardBook}>
              {loanding && (
                <Box sx={classes.progress}>
                  <CircularProgress color="secondary" />
                </Box>
              )}
              {!loanding && listCard}
            </Stack>
          </Stack>
          <ArrowTop />
        </>
      )}
    </>
  );
}

export default ModalBooks;
