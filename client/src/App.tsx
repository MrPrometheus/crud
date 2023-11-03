import React from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import {AddCard} from "./components/AddCard/AddCard";
import {CardList} from "./components/CardList/CardList";
import {Card} from "./components/Card/Card";

function App() {
  return (
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/cards" className="navbar-brand">
            WB
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cards"} className="nav-link">
                Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CardList/>} />
            <Route path="/cards" element={<CardList/>} />
            <Route path="/add" element={<AddCard/>} />
            <Route path="/cards/:id" element={<Card/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
