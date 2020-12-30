import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";
import SongDetail from "./components/SongDetail";

function App() {
  return (
    <Router>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo center">
            Lyrical
          </Link>
        </div>
      </nav>
      <br />
      <div className="container">
        <Switch>
          <Route path="/songs/new" component={SongForm} />
          <Route path="/songs/:id" component={SongDetail} />
          <Route path="/">
            <SongList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
