import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Link} from "@material-ui/core";
import { version } from '../../package.json';

export default function Footer() {
    return (
        <AppBar position={"relative"} color="primary" style={{height: "4rem"}}>
            <Container maxWidth="md">
                <Toolbar >
                    <Typography variant="body1" color="inherit">
                        © 2021 <Link color="secondary" href={"https://www.digital-water.city/"}>Digital Water City</Link> - Version {version}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}