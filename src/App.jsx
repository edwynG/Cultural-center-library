import React, { useContext} from "react";
import "./css/App.css";
import ModalScanner from "./components/Sections/ModalScanner";
import ModalBooks from "./components/Sections/ModalBooks";
import { Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";
import ModalCollections from "./components/Sections/ModalCollections";

function App() {
  const {pathBook} = useContext(Context)
  const classes = {
   
  };

  return (
   <>
    <Routes>
      <Route path="/" element={<ModalScanner/>}/>
      <Route path="/Collections" element={<ModalCollections/>}/>  
      <Route path={"/Collections/" + pathBook } element={<ModalBooks/>}/>
    </Routes>
   </>
  );
}

export default App;
