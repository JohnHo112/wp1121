import { useContext } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { pageControlContext } from "@/App"

const HeaderBar = () => {
  const { setCardPageOpen } = useContext(pageControlContext)

  const handleIconButtonClick = () => {
    setCardPageOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleIconButtonClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WP Music
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;