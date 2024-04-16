import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import "./App.css";
import Chto from "./components/Chto/Chto";
import Welcome from "./pages/Welcome/Welcome";

function App() {

  return (
    <>
      {/* <Chto /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Welcome/>} />
          <Route path='/chat' element={<Chto/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
