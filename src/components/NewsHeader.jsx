import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: "auto",
  width: 200,
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
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 5),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

/**
 * The header to be displayed at the top of the page.
 */
function NewsHeader(props) {
  const { onSearchChange } = props;

  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">NewsFeed App</Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon color="action" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleInputChange}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}

export default NewsHeader;
