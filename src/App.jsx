import "./App.css";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from "./components/NavBar";
import MainContent from './components/MainContent';

function App() {
  return (
    <Router>
      <NavBar />
      <hr className="m-0 mt-1" />
      <MainContent />
    </Router>
  );
}

export default App;
