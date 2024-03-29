import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
// import AdbIcon from "@mui/icons-material/Adb";
import SliceAccount from "../common/SliceAccount";
import TruncatedAccount from "../common/SliceAccount";
import { useMediaQuery } from "@mui/material";

function ResponsiveAppBar({ account, pages, pageLinks }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
      }}
    >
      <Toolbar
        sx={{ backgroundColor: isSmallScreen ? "black" : "transparent" }}
        disableGutters
      >
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page, index) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Button href={pageLinks[index]}>{page}</Button>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            px: "25px",
            gap: "16px",
          }}
        >
          {pages.map((page, index) => (
            <Button
              variant="text"
              key={page}
              onClick={handleCloseNavMenu}
              href={pageLinks[index]}
              sx={{ color: "black" }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            display: { xs: "none", md: "flex" },
            gap: "16px",
          }}
        >
          <TruncatedAccount account={account} /> &nbsp;
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
