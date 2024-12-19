"use client";
import Box from "@mui/material/Box";
import { useRef } from "react";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation showLabels sx={{ backgroundColor: "#001740" }}>
          <BottomNavigationAction
            label="Home"
            icon={
              <Link href={"/"}>
                <HomeOutlinedIcon sx={{ color: "white" }} />
              </Link>
            }
            sx={{ color: "white" }}
          />
          <BottomNavigationAction
            label="Marketplace"
            icon={
              <Link href={"/marketplace"}>
                <WaterDropOutlinedIcon sx={{ color: "white" }} />
              </Link>
            }
            sx={{ color: "white" }}
          />
          <BottomNavigationAction
            label="Report"
            icon={
              <Link href={"#"}>
                <EditNoteOutlinedIcon sx={{ color: "white" }} />
              </Link>
            }
            sx={{ color: "white" }}
          />
          <BottomNavigationAction
            label="Profile"
            icon={
              <Link href={"#"}>
                <PersonOutlineOutlinedIcon sx={{ color: "white" }} />
              </Link>
            }
            sx={{ color: "white" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navbar;
