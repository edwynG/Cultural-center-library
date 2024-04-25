import React from "react";
import {
  alpha,
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import InputBase from "@mui/material/InputBase";
import { HiHomeModern } from "react-icons/hi2";
import { Link } from "react-router-dom";

 function Appbar({
  comparison = [],
  coincidences = () => null,
}) {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
      width: "100%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const searchCoincidences = (e) => {
    if(e.target.value.replace(" ","") == "") {
      coincidences(comparison)
      return
    }
    let arr = comparison.filter((component) => {
      if (component.props.name.toLowerCase().match(e.target.value.toLowerCase()) != null) {
        return component;
      }
    });
    coincidences(arr)
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ padding: "8px 0px", marginBottom: 3 }}
    >
      <Toolbar
        sx={{
          justifyContent: { xs: "space-between", sm: "space-between" },
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box component="div">
          <Link to="/Collections">
            <Tooltip title="Colección">
              <IconButton>
                <HiHomeModern size={30} fill="#111" />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Search>
          <SearchIconWrapper>
            <FaSearch />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar..."
            inputProps={{ "aria-label": "search" }}
            onChange={searchCoincidences}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}

const AppbarDesing = React.memo(Appbar)

export default AppbarDesing