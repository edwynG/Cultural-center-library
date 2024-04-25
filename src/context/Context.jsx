import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export function ContextProvider(props) {
  const [scanStatus, setScanStatus] = useState(false);
  const [textWarningScan, setTextWarningScan] = useState("")
  const [scannerResult, setScannerResult] = useState("");
  const [pathBook, setPathBook] = useState("*")
  const navigate = useNavigate();
  const [scannerStatus, setScannerStatus] = useState(0);
  const [camera, setCamera] = useState([]);
  
  let navigatePath = [
    {
      path: "/Collections",
      to: () => navigate("/Collections"),
    }
  ];
  const paths = useMemo(() => {
    let path = Array();
    navigatePath.forEach((obj) => path.push(obj.path.toLowerCase()));
    return path;
  }, [navigatePath]);



  const navigationRoutes = (url = "/Collections") => {
    const path = navigatePath.find(
      (pat) => pat.path.toLowerCase() == url.toLowerCase()
    );
    path.to();
  };

  const offScannerQr = () => {
    camera.forEach((camare) => {
      if (camare._stream != null) {
        var tracks = camare._stream.getTracks();
        tracks.forEach(function (track) {
          track.stop(); // Detener el flujo de la cámara
        });
      }
    });
  };

  const validResultScanner = () => {
    let res = paths.includes(scannerResult.toLowerCase())? 1: -1;
    setScannerStatus(res);
  };
  const resetScanner = () => {
    setScannerStatus(0);
    setScannerResult("")
    setScanStatus(false)
  }
  
  const capitalize = (str) => {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
  };

  useEffect(() => {
    if (scannerResult != "") {
      validResultScanner();
      offScannerQr();
    }
  }, [scannerResult]);

  const settings = {
    setScannerResult,
    setScannerStatus,
    scannerStatus,
    navigationRoutes,
    scannerResult,
    setCamera,
    camera,
    offScannerQr,
    resetScanner,
    scanStatus,
    setScanStatus,
    setTextWarningScan,
    textWarningScan,
    pathBook,
    setPathBook,
    navigate,
    capitalize,
    navigatePath,
  };

  return <Context.Provider value={settings}>{props.children}</Context.Provider>;
}
