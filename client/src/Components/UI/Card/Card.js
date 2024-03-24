import React from "react";
import { Box } from "@mui/material";
import "./Card.css";

const Card = (props) => {
  return (
    <Box className="card shadow p-3 mb-5 bg-body rounded card-new">
      {props.children}
    </Box>
  );
};

export default Card;
