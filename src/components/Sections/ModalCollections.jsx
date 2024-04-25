import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { getAxios } from "../../js/API";
import ArrowTop from "../ArrowTop";
import AppbarDesing from "../AppbarDesing";
import { Context } from "../../context/Context";
import CardCategory from "../CardCategory";

function ModalCollections() {
  const [jsonData, setJsonData] = useState([]);
  const [errorData, setError] = useState(false);
  const [loanding, setLoanding] = useState(true);
  const { setPathBook, navigate, capitalize } = useContext(Context);
  const [listCard, setListCard] = useState([]);
  const classes = {
    box: {},
    containerCollections: {
      paddingBottom: 5,

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
    },
    containerCardcolletions: {
      justifyContent: "center",
      alignContent: "center",
      justifyItem: "center",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(275px,275px))",
      gap: 2,
      paddingTop: 6,
      paddingBottom:{xs:10,sm:1},
    },
    progress: {
      height: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const createCard = (data) => {
    let arr = data.map((obj) => {
      return (
        <Grid item key={obj.index} name={capitalize(obj.sheet)}>
          <span
            onClick={() => {
              setTimeout(() => {
                setPathBook(obj.sheet);
                navigate("/Collections/" + obj.sheet);
              }, 1000);
            }}
          >
            <CardCategory
              title={capitalize(obj.sheet)}
              image={capitalize(obj.sheet)}
            />
          </span>
        </Grid>
      );
    });
    setJsonData(arr)
    setListCard(arr)
  };

  useEffect(() => {
    if (jsonData.length <= 0) {
      getAxios()
        .then((data) => {
          createCard(data.result);
          
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
    if (jsonData.length > 0) {
      setTimeout(() => setLoanding(false), 2000);
    }
  }, [jsonData]);
  return (
    <>
      <AppbarDesing comparison={jsonData} coincidences={setListCard} />
      <Container sx={classes.containerCollections}>
        <Stack sx={classes.containerCollectionsText}>
          <Typography variant="h6" sx={classes.subTitle}>
            Por favor elija una
          </Typography>
          <Typography variant="h3" sx={classes.title}>
            Categoría
          </Typography>
        </Stack>
        <Grid container sx={classes.containerCardcolletions}>
          {loanding && !errorData && (
            <Box sx={classes.progress}>
              <CircularProgress color="secondary" />
            </Box>
          )}
          {!loanding && !errorData &&  listCard }
          {errorData &&  <>{"Lo sentimo hubo un error de conexión"}</>}

        </Grid>
      </Container>
      <ArrowTop />
    </>
  );
}

export default ModalCollections;
