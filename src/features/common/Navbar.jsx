import React from "react";
import { Box, Typography, IconButton, MenuItem, Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLanguage } from "../../app/reducer";
import LanguageIcon from "../../assets/image/language-icon.svg";
import BackIcon from "../../assets/image/back-icon.svg";
import accountIcon from "../../assets/image/account-icon.svg";
import accountEdit from "../../assets/image/account-edit.svg";
import calendarIcon from "../../assets/image/calendar-icon.svg";
import { logout } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../constants/routePath";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const { first_name, middle_name, last_name } = useSelector(
    (state) => state.reducer.userDetails
  );
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElLogout, setAnchorElLogout] = React.useState(null);

  const isLanguageMenuOpen = Boolean(anchorEl);
  const isLogoutMenuOpen = Boolean(anchorElLogout);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleMenuClick = (setAnchor) => (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (setAnchor, action) => () => {
    setAnchor(null);
    if (action) action();
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      let res = await logout();
      if (res.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: res.data.message,
        });
      }
    } catch (err) {
      console.log(err);
    }

    localStorage.removeItem("userDetails");
    navigate(routePath.LOGIN);
  };

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <>
      <Box
        sx={{
          padding: "13px 20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
          zIndex: 1,
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ padding: 0 }}>
              <Box
                component="img"
                src={BackIcon}
                alt="Logo"
                sx={{ height: 22, width: 22, mr: "15px" }}
              />
            </IconButton>
            <Typography
              variant="h3"
              sx={{ fontWeight: "700", fontSize: "22px", color: "#F84D01" }}
            >
              Survey Management
            </Typography>
          </Box>
          <IconButton
            id="language-button"
            aria-controls={isLanguageMenuOpen ? "language-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isLanguageMenuOpen ? "true" : undefined}
            onClick={handleMenuClick(setAnchorEl)}
            sx={{ padding: 0 }}
          >
            <Box
              component="img"
              src={LanguageIcon}
              alt="Language icon"
              sx={{ height: 30, width: 30 }}
            />
          </IconButton>
        </Box>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={isLanguageMenuOpen}
          onClose={handleMenuClose(setAnchorEl)}
          MenuListProps={{ "aria-labelledby": "language-button" }}
          sx={{ left: "-20px" }}
        >
          <MenuItem
            onClick={handleMenuClose(setAnchorEl, () =>
              dispatch(setSelectedLanguage("eng"))
            )}
          >
            English
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose(setAnchorEl, () =>
              dispatch(setSelectedLanguage("mar"))
            )}
          >
            Marathi
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ backgroundColor: "#E5F9FF", p: "20px" }}>
        <Box
          sx={{
            background: "#FFF",
            p: "10px",
            borderRadius: "5px",
            mb: "10px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="img"
                src={accountIcon}
                alt="Account Icon"
                sx={{ height: 24, width: 24, mr: 1 }}
              />
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, fontSize: 17, color: "#222222CC" }}
              >
                {`${first_name} ${middle_name} ${last_name}`}
              </Typography>
            </Box>
            <IconButton
              id="logout-button"
              aria-controls={isLogoutMenuOpen ? "logout-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isLogoutMenuOpen ? "true" : undefined}
              onClick={handleMenuClick(setAnchorElLogout)}
              sx={{ p: 0 }}
            >
              <Box
                component="img"
                src={accountEdit}
                alt="Edit Icon"
                sx={{ height: 23, width: 23 }}
              />
            </IconButton>
          </Box>
        </Box>

        <Menu
          id="logout-menu"
          anchorEl={anchorElLogout}
          open={isLogoutMenuOpen}
          onClose={handleMenuClose(setAnchorElLogout)}
          MenuListProps={{ "aria-labelledby": "logout-button" }}
          sx={{ left: "-20px" }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <Box sx={{ p: "10px", borderRadius: "5px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={calendarIcon}
              alt="Calendar Icon"
              sx={{ height: 24, width: 24, mr: 1 }}
            />
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, fontSize: 18, color: "#70787A" }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
