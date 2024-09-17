import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import QrScanner from "./QrScanner";
import { Context } from "../context/Context";

function LayoutScanner() {
  const {setScanStatus,scanStatus} = useContext(Context)
  const classes = {
    containerScan: {
      minHeight: 240,
      padding:1,
    
    },
    paperScan: {
      width: "max-content",
      padding: 1.5,
      borderRadius: 3,
    },
    boxScan: {
      width: "100%",
      maxWidth: "200px",
    },
    containerText: {
      flexDirection: "column",
      maxWidth: 224,
    },
    buttonLayout: {
      height: 55,
      minWidth: 224,
      backgroundColor: "#5DD782",
      "&:hover": { backgroundColor: "#60c98f" },
    },
    textLayout: {
      display: scanStatus ? "none" : "inline-block",
      width: "100%",
      textAlign: "justify",
    },
  };
  

  return (
    <>
      <Box sx={classes.containerScan}>
        <Paper sx={classes.paperScan} elevation={4}>
          <Box component="div" sx={classes.boxScan}>
            <QrScanner scan={scanStatus}/>
          </Box>
        </Paper>
      </Box>
      <Stack gap={2.5} sx={classes.containerText}>
        <Button
          variant="contained"
          sx={classes.buttonLayout}
          onClick={() => setScanStatus(!scanStatus)}
        >
          {scanStatus ? "Dejar de escaner QR" : "Escanear QR"}
        </Button>
        <Typography variant="body1" sx={classes.textLayout}>
          Permite usar la cámara para escáner el QR y acceder a la colección de
          la biblioteca del centro cultural de Baruta.
        </Typography>
      </Stack>
    </>
  );
}

export default LayoutScanner;
