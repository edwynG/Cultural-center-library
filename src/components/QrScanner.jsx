import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { MdFlipCameraIos } from "react-icons/md";
import QRCode from "react-qr-code";
import { Context } from "../context/Context";

var scanner = undefined;

const QrScanner = ({ scan = false }) => {
  const [great, setGreat] = useState(false);

  const {
    setScannerResult,
    camera,
    setCamera,
    offScannerQr,
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
  //Permite escanear el QR https://rawgit.com/schmich/instascan-builds/master/instascan.min.js
  const initScanner = () => {
    const scanner = new Instascan.Scanner({
      video: document.querySelector("#preview"),
    });

    scanner.addListener("scan", function (result) {
      setGreat(true);
      setTimeout(() => {
        setScannerResult(result);
        setGreat(false);
        offScannerQr();
      }, 1000);
    });

    return scanner;
  };

  const onScannerQR = (index = null) => {
    scanner = initScanner();
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (e) {
        Instascan.Camera.getCameras()
          .then(function (cameras) {
            if (cameras.length > 0) {
              setCamera(cameras);

              if (index != null) {
                scanner.start(cameras[index]);
                return;
              }

              const type = "front";
              let root = cameras.find((device) =>
                device.name.toLowerCase().includes(type)
              );
              root = root != undefined ? root : cameras[0];
              scanner.start(root);
            } else {
              console.error("No cameras found.");
              setTextWarningScan("No se encontro ninguna cámara");
            }
          })
          .catch(function (e) {
            console.error("Hubo un error reintente");
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

  const changeCamere = () => {
    try {
      let currentCameraIndex = camera.findIndex(
        (element) => element.id === scanner._camera.id
      );
      const nextCameraIndex = (currentCameraIndex + 1) % camera.length; // Cambia a la siguiente cámara

      offScannerQr();
      scanner.stop();
      scanner = null;
      onScannerQR(nextCameraIndex);
    } catch (error) {
      console.error("Problema al cambiar la camara.");
    }
  };

  useEffect(() => {
    if (!scan) {
      console.warn("Off camere");
      setTextWarningScan("cámara apagada");
      offScannerQr();
      scanner = null;
    } else {
      console.warn("On camere");
      setTextWarningScan("cámara encendida");
      onScannerQR();
    }
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
              onClick={() => changeCamere()}
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
