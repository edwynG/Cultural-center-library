import { Fab, styled } from "@mui/material";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";

function ArrowTop() {
  const StyledFab = styled(Fab)({
    position: "fixed",
    zIndex: 1,
    right: 0,
    bottom: 0,
    margin: 20,
    backgroundColor: "#81d4fa",
  });

  const scrollTop = (e) => {
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <StyledFab color="grey" aria-label="add" onClick={scrollTop}>
      <IoIosArrowUp size={20} />
    </StyledFab>
  );
}

export default ArrowTop;
