import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { MdFlipCameraIos } from "react-icons/md";
import QRCode from "react-qr-code";
import { Context } from "../context/Context";

const QrScanner = ({ scan = false }) => {
  const [device, setDevice] = useState(false);
  const [great, setGreat] = useState(false);
  const {
    setScannerResult,
    camera,
    setCamera,
    offScannerQr,
    setScannerStatus,
    setTextWarningScan,
  } = useContext(Context);
  const anonimo = '"La lectura es el alimento del alma." - Anónimo';

  const classes = {
    containerScanner: {
      margin: 0.5,
      overflow: "hidden",
      maxWidth: "100%",
      height: 200,
      alignItems: "center",
      display: "flex",
      position: "relative",
    },
    video: {
      width: 300,
      height: 300,
      transform: "scaleX(1) !important",
  

    },
    containerAsserts: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    QrStyle: {
      width: "100%",
      height: "100%",
    },
    iconStyle: {
      fill: great ? "red" : "#ffff",
    },
  };

  const onScannerQR = (id = null, search = false) => {
    //Permite escanear el QR https://rawgit.com/schmich/instascan-builds/master/instascan.min.js
    let scanner = new Instascan.Scanner({
      video: document.querySelector("#preview"),
    });
    scanner.addListener("scan", function (result) {
      offScannerQr();
      setGreat(true);
      setTimeout(() => {
        setScannerResult(result);
        setGreat(false);
        offScannerQr();
      }, 1000);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (e) {
        Instascan.Camera.getCameras()
          .then(function (cameras) {
            if (cameras.length > 0) {
              setCamera(cameras);
              let can = cameras.find((can) => can.id == id || search);
              scanner.start(can);
            } else {
              console.error("No cameras found.");
              setTextWarningScan("No se encontro ninguna cámara");
            }
          })
          .catch(function (e) {
            console.error(e);
            setTextWarningScan("Hubo un error reintente");
          });
      })
      .catch(function (err) {
        console.error(
          "Ocurrió un error al intentar acceder a la cámara: " + err
        );
        setTextWarningScan("Error al acceder a la cámara");
      });
  };

  const selectCamere = (select = false) => {
    if (camera.length <= 1) {
      onScannerQR(0, true);
      return;
    }
    const type = select ? "back" : "front";
    const deviceID = camera.find((device) =>
      device.name.toLowerCase().includes(type)
    );
    offScannerQr();
    onScannerQR(deviceID.id);
    setDevice(!device);
  };
  useEffect(() => {
    if (scan == false) {
      console.warn("Off camere");
      setTextWarningScan("cámara apagada");
      offScannerQr();
    } else {
      console.warn("On camere");
      setTextWarningScan("cámara encendida");
      selectCamere(true);
    }
    return () => offScannerQr();
  }, [scan]);

  return (
    <>
      <Box sx={classes.containerScanner}>
        <Box id="preview" sx={classes.video} component="video"></Box>
        <Box component="span" sx={classes.containerAsserts}>
          {scan ? (
            <MdFlipCameraIos
              size={40}
              style={classes.iconStyle}
              onClick={() => selectCamere(!device)}
            />
          ) : (
            <QRCode value={anonimo} sx={classes.QrStyle} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default QrScanner;
