import { Box, Typography } from "@mui/material";
import React from "react";
import { useDaikonContext } from "../../Context";
import Link from "next/link";

export default function Navbar() {
  return (
    <Box className="navbar-container">
      <Link href="/">
        <Box className="navbar-title">
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Daikon
          </Typography>
        </Box>
      </Link>
      <Box className="navbar-options-container">
        <Link href="/Components/DaikonUI">
          <Box className="navbar-option">
            <div className="navbar-option-dot" id="option-dot-purple"></div>
            <Typography sx={{ fontWeight: "semibold" }}>Help us</Typography>
          </Box>
        </Link>

        <Box className="navbar-option">
          <div className="navbar-option-dot" id="option-dot-yellow"></div>
          <Typography sx={{ fontWeight: "semibold" }}>Why</Typography>
        </Box>
        <Link href="/login">
          <Box className="navbar-option">
            <div className="navbar-option-dot" id="option-dot-blue"></div>
            <Typography sx={{ fontWeight: "semibold" }}>Sign In</Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
