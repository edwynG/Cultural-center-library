import { Alert, Box, Collapse, Paper, Snackbar, Stack, Zoom } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LayoutScanner from "../LayoutScanner";
import LoyoutSuccessScanner from "../LoyoutSuccessScanner";
import { Context } from "../../context/Context";

function ModalScanner() {
  const { scannerStatus, navigationRoutes, resetScanner, textWarningScan,setScannerStatus } =
    useContext(Context);
  const [open, setOpen] = useState(false);
  const classes = {
    Paper: { borderRadius: 5 },
    containerModalScanner: {
      borderRadius: 5,
      bgcolor: "#fff",
      minHeight: { xs: 543, sm: 543 },
      minWidth: { xs:260 , sm: 310 },
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
      margin:"0px 15px"

    },
    container: {
      padding: 4,
      height: "",
      minHeight: 630,
      justifyContent: "center",
      alignItems: "center",

    },
    alertContainer: {
      position: "fixed",
      right: 0,
      bottom: 0,
      margin:1,
      
    },
    bg_img:{
        position:"absolute",
        left:0,
        top:0,
        right:0,
        bottom:0,
        zIndex:-1,
        backgroundImage:
        "url('https://img.freepik.com/vector-gratis/ilustracion-contorno-estante-dibujado-mano_23-2150390211.jpg?t=st=1713508842~exp=1713512442~hmac=e6c29f3c21a7c1ba005dfd1a3db274a69b13524154658ecb7e9c82b5ba4a4e2e&w=740')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight:"calc(100vh)"

    }
  };

  useEffect(() => {
    if (textWarningScan != "") {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    }
  }, [textWarningScan]);

  return (
    <>
      <Stack sx={classes.container}>
      <Box sx={classes.bg_img}> </Box>

        <Paper sx={classes.Paper} elevation={9}>
          <Stack sx={classes.containerModalScanner}>

            {scannerStatus == 0 && <LayoutScanner />}
            {scannerStatus == 1 && (
              <LoyoutSuccessScanner
                title="Excelente!!"
                subtitle="El escaneo fue exitoso"
                textBottom="Ver collages"
                onclick={()=> navigationRoutes()}
              />
            )}
            {scannerStatus == -1 && (
              <LoyoutSuccessScanner
                title="Problema!!"
                subtitle="El QR es invalido"
                textBottom="Reintentar"
                modeError={true}
                onclick={resetScanner}
              />
            )}
          </Stack>
        </Paper>
      </Stack>
      <Zoom in={open} sx={classes.alertContainer}>
        <Alert severity="warning" variant="filled">
          {textWarningScan}
        </Alert>
      </Zoom>
    </>
  );
}

export default ModalScanner;
