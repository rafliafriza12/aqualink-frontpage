"use client";
import Box from "@mui/material/Box";
import { useRef, useEffect } from "react";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { IsDesktop } from "@/app/hooks";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "@/app/hooks/UseAuth";
import { usePathname, useRouter } from "next/navigation";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = IsDesktop();
  const theme = useTheme();
  const Auth = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [navActivePosition, setNavActivePosition] = useState<string>(() => {
    if (pathname === "/") return "home";
    if (pathname === "/marketplace") return "marketplace";
    if (pathname === "/lapor-kebocoran") return "lapor-kebocoran";
    if (pathname === "/profile") return "profile";
    return "home";
  });

  const mainMenu: any = [
    {
      label: "Beranda",
      path: "/",
    },
    {
      label: "Marketplace",
      path: "/marketplace",
    },
    {
      label: "Lapor Kebocoran",
      path: "/lapor-kebocoran",
    },
    {
      label: "Profil",
      path: "/profile",
    },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  useEffect(() => {
    if (pathname === "/") setNavActivePosition("home");
    if (pathname === "/marketplace") setNavActivePosition("marketplace");
    if (pathname === "/lapor-kebocoran")
      setNavActivePosition("lapor-kebocoran");
    if (pathname === "/profile") setNavActivePosition("profile");
  }, [pathname]);

  return isDesktop ? (
    <>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "#001740",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={600}>
            AquaLink
          </Typography>
        </Toolbar>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ bgcolor: "#ffffff", color: "#001740" }}>RA</Avatar>
          </IconButton>
          <Menu
            sx={{
              position: "fixed",
              left: "90%",
              top: "5%",
            }}
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={() => Auth.logout()}>Keluar</MenuItem>
          </Menu>
        </div>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            pl: 3,
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {mainMenu.map((menu: any, index: number) => (
            <ListItem key={index} disablePadding>
              <Link
                onClick={() => setOpen(!open)}
                href={menu.path}
                className="w-full"
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { text: "Kredit Air", path: "/tagihan" },
            { text: "Transaksi", path: null },
            { text: "Keluar", path: null },
          ].map((item: any, index: number) => (
            <ListItem key={index} disablePadding>
              {item?.text !== "Keluar" ? (
                <Link href={item?.path ?? ""} className="w-full">
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item?.text} />
                  </ListItemButton>
                </Link>
              ) : (
                <ListItemButton onClick={() => Auth.logout()}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item?.text} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  ) : (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
        elevation={3}
      >
        <BottomNavigation showLabels sx={{ backgroundColor: "#fffff" }}>
          <BottomNavigationAction
            onClick={() => setNavActivePosition("home")}
            label="Home"
            icon={
              <Link href={"/"}>
                <HomeOutlinedIcon
                  sx={{
                    color: navActivePosition === "home" ? "white" : "#202226",
                  }}
                />
              </Link>
            }
            sx={{
              color: navActivePosition === "home" ? "white" : "#202226",
              bgcolor: navActivePosition === "home" ? "#202226" : "white",
            }}
          />
          <BottomNavigationAction
            onClick={() => setNavActivePosition("marketplace")}
            label="Marketplace"
            icon={
              <Link href={"/marketplace"}>
                <WaterDropOutlinedIcon
                  sx={{
                    color:
                      navActivePosition === "marketplace" ? "white" : "#202226",
                  }}
                />
              </Link>
            }
            sx={{
              color: navActivePosition === "marketplace" ? "white" : "#202226",
              bgcolor:
                navActivePosition === "marketplace" ? "#202226" : "white",
            }}
          />
          <BottomNavigationAction
            onClick={() => setNavActivePosition("lapor-kebocoran")}
            label="Report"
            icon={
              <Link href={"/lapor-kebocoran"}>
                <EditNoteOutlinedIcon
                  sx={{
                    color:
                      navActivePosition === "lapor-kebocoran"
                        ? "white"
                        : "#202226",
                  }}
                />
              </Link>
            }
            sx={{
              color:
                navActivePosition === "lapor-kebocoran" ? "white" : "#202226",
              bgcolor:
                navActivePosition === "lapor-kebocoran" ? "#202226" : "white",
            }}
          />
          <BottomNavigationAction
            onClick={() => setNavActivePosition("profile")}
            label="Profile"
            icon={
              <Link href={"/profile"}>
                <PersonOutlineOutlinedIcon
                  sx={{
                    color:
                      navActivePosition === "profile" ? "white" : "#202226",
                  }}
                />
              </Link>
            }
            sx={{
              color: navActivePosition === "profile" ? "white" : "#202226",
              bgcolor: navActivePosition === "profile" ? "#202226" : "white",
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Navbar;
