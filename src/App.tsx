import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Payroll from "./Payroll";
import Employees from "./Employees";
import logo from "./assets/logo.png";
import logoWhite from "./assets/logo-White.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { useState } from "react";
import EmployeeEdit from "./EmployeeEdit";

const drawerWidth = 240;

declare module "@mui/material/styles" {
  interface Theme {
    bGround: {
      main: string;
    };
  }
  interface ThemeOptions {
    bGround?: {
      main?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    contrastThreshold: 3,
    primary: {
      main: "#4CBF75",
      light: "#4CBF75",
      dark: "#4CBF75",
    },
    secondary: {
      main: "#E4A653",
      light: "#E4A653",
      dark: "#E4A653",
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            backgroundColor: "#FEFF9E",
          },
        },
      },
    },
  },
  bGround: {
    main: "#F7F9FC",
  },
});

const darkTheme = createTheme({
  typography: {
    allVariants: {
      color: "#fff",
    },
  },
  palette: {
    mode: "dark",
    contrastThreshold: 3,
    primary: {
      main: "#4CBF75",
      light: "#4CBF75",
      dark: "#4CBF75",
    },
    secondary: {
      main: "#E4A653",
      light: "#E4A653",
      dark: "#E4A653",
    },
  },
  bGround: {
    main: "#000",
  },
});

export default function App() {
  const [currTheme, setCurrTheme] = useState(theme);
  const [currLogo, setCurrLogo] = useState(logo);

  const ChangeTheme = () => {
    if (currTheme === theme) {
      setCurrTheme(darkTheme);
      setCurrLogo(logoWhite);
    } else {
      setCurrTheme(theme);
      setCurrLogo(logo);
    }
  };

  return (
    <ThemeProvider theme={currTheme}>
      <BrowserRouter>
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
          open={true}
        >
          <div className="logo-container">
            <img src={currLogo} alt="logo" className="mainLogo" />
          </div>
          <List>
            <ListItem>
              <ListItemButton
                component={NavLink}
                to="/payroll"
                sx={{
                  borderRadius: 1,
                  m: -1,
                  "&:hover": { backgroundColor: "#C71318", color: "#fff" },
                }}
              >
                <ListItemText primary="Payroll" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                className="navItem"
                component={NavLink}
                to="/employees"
                sx={{
                  borderRadius: 1,
                  m: -1,
                  "&:hover": { backgroundColor: "#C71318", color: "#fff" },
                }}
              >
                <ListItemText primary="Employees" />
              </ListItemButton>
            </ListItem>
          </List>
          <List
            sx={{ position: "absolute", bottom: "0", width: drawerWidth - 1 }}
          >
            <Divider />
            <ListItem>
              <ListItemButton
                className="navItem"
                sx={{
                  borderRadius: 1,
                  m: -1,
                  "&:hover": { backgroundColor: "#C71318", color: "#fff" },
                }}
                onClick={ChangeTheme}
              >
                <ListItemText primary="Theme" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            bgcolor: currTheme.bGround.main,
          }}
        >
          <Routes>
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/edit" element={<EmployeeEdit />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
