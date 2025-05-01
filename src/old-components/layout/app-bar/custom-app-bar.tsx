import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import logo from "../../../assets/logo.png";
import { Menu } from "@mui/icons-material";
import { LogedoutScreensEnum } from "../../../enum/layout-screens";
interface NavItem {
  title: LogedoutScreensEnum;
  icon: React.ReactElement;
}
interface ICustomAppBarProps {
  navItems: NavItem[];
  onNavigate: (screen: LogedoutScreensEnum) => void;
}
const CustomAppBar = ({ navItems, onNavigate }: ICustomAppBarProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        background:
          "linear-gradient(90deg,rgb(56, 73, 92) 0%,rgb(86, 103, 122) 100%)",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {navItems.map(({ title, icon }) => (
          <ListItem key={title} disablePadding sx={{ color: "white" }}>
            <ListItemButton>
              <ListItemIcon>
                <Box sx={{ color: "white" }}>{icon}</Box>
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(90deg,rgb(22, 25, 31) 0%,rgb(45, 50, 56) 100%)",
        px: 2,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            alt="logo"
            width={50}
            onClick={() => {
              onNavigate(LogedoutScreensEnum.LANDINGPAGE);
            }}
            sx={{
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
              borderRadius: "50%",
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navItems.map((page) => (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  onNavigate(page.title);
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings"> */}
            <IconButton sx={{ p: 0 }}>
              {/* <Avatar alt="Layan" src="/static/images/avatar/2.jpg" sx={{background: "linear-gradient(90deg,rgb(0, 83, 250) 0%,rgb(14, 112, 224) 100%)"}}/> */}
            </IconButton>
            {/* </Tooltip> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default CustomAppBar;
