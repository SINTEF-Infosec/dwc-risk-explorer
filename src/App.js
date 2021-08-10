import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EventsPage from "./Pages/EventsPage";
import MeasuresPage from "./Pages/MeasuresPage";
import HomePage from "./Pages/HomePage";
import MainAppBar from "./Components/AppBar";
import AboutPage from "./Pages/AboutPage";
import EventDetailPage from "./Pages/EventDetailPage";
import MeasureDetailPage from "./Pages/MeasureDetailPage";

function App() {
  return (
      <Router>
        <div>
          <MainAppBar/>
          <Switch>
            <Route path="/events/:id">
              <EventDetailPage/>
            </Route>
            <Route path="/events">
              <EventsPage />
            </Route>
            <Route path="/measures/:id">
              <MeasureDetailPage/>
            </Route>
            <Route path="/measures">
              <MeasuresPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
