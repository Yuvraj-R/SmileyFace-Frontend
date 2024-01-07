import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function ButtonAppBar({ isSignedIn, onSignOut }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" position="static" sx={{ backgroundColor: "rgba(16, 20, 24, 0.8)" }}>
        <Toolbar>
          <Link to="/account/home" style={{ textDecoration: "none", color: "inherit" }}>
            {/* Replace the src attribute with the path to your icon image */}
            <Avatar sx={{ marginRight: 1 }} src={require("../resources/favicon.ico")} />
          </Link>
          <Typography
            className="navbar-name"
            align="left"
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            SmileyFace
          </Typography>
          {isSignedIn && (
            <Button color="inherit" onClick={onSignOut}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
