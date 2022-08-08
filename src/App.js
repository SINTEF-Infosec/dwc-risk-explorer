import React from "react";
import {
    Switch,
    Route, HashRouter,
} from "react-router-dom";
import EventsPage from "./Pages/EventsPage";
import MeasuresPage from "./Pages/MeasuresPage";
import HomePage from "./Pages/HomePage";
import MainAppBar from "./Components/AppBar";
import AboutPage from "./Pages/AboutPage";
import EventDetailPage from "./Pages/EventDetailPage";
import MeasureDetailPage from "./Pages/MeasureDetailPage";
import {ThemeProvider} from '@material-ui/core/styles';
import {themeDWC} from "./theme";
import Footer from "./Components/Footer";
import Box from "@material-ui/core/Box";
import './App.css';
import UserGuidePage from "./Pages/UserGuidePage";
import DownloadPage from "./Pages/DownloadPage";

function App() {
    return (
        <HashRouter>
            <ThemeProvider theme={themeDWC}>
                <Box display={"flex"} flexDirection={"column"} style={{height: "100vh"}}>
                    <Box>
                        <MainAppBar/>
                    </Box>
                    <Box flexGrow={1} style={{marginBottom: "4rem"}}>
                        <Switch>
                            <Route path="/events/:id">
                                <EventDetailPage/>
                            </Route>
                            <Route path="/events">
                                <EventsPage/>
                            </Route>
                            <Route path="/measures/:id">
                                <MeasureDetailPage/>
                            </Route>
                            <Route path="/measures">
                                <MeasuresPage/>
                            </Route>
                            <Route path="/user-guide">
                                <UserGuidePage/>
                            </Route>
                            <Route path="/download">
                                <DownloadPage/>
                            </Route>
                            <Route path="/about">
                                <AboutPage/>
                            </Route>
                            <Route path="/">
                                <HomePage/>
                            </Route>
                        </Switch>
                    </Box>
                    <Box>
                        <Footer/>
                    </Box>
                </Box>
            </ThemeProvider>
        </HashRouter>
    );
}

export default App;
