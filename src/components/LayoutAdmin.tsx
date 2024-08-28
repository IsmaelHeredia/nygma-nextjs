import * as React from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { ThemeProvider } from "@mui/material/styles";

import "@/styles/global.css";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/Key";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import Account from "@/components/Account";
import About from "@/components/About";

import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/redux/global";

import { ThunkDispatch } from "@reduxjs/toolkit";
import { logOutAction } from "@/store/reducers/accountSlice";

import { clearDataAuth } from "@/store/reducers/authSlice";
import { changeMode } from "@/store/reducers/themesSlice";
import { clearDataDocuments } from "@/store/reducers/documentsSlice";
import { clearDataFilters } from "@/store/reducers/filtersSlice";
import { clearDataAccount } from "@/store/reducers/accountSlice";

import { theme as light_green } from "@/skins/light_green";
import { theme as dark_green } from "@/skins/dark_green";

export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const logOut = () => dispatch(logOutAction({}));

  const mode = useSelector((state: RootState) => state.themes.mode);

  const handleClickLogOut = async () => {

    toast.success("La sesión fue cerrada", { autoClose: Number(process.env.NEXT_PUBLIC_TIMEOUT_TOAST) });

    await logOut();

    dispatch(clearDataAuth());
    dispatch(clearDataDocuments());
    dispatch(clearDataFilters());
    dispatch(clearDataAccount());

    setTimeout(() => {
      router.replace("/");
    }, Number(process.env.NEXT_PUBLIC_TIMEOUT_REDIRECT));
  }

  const handleClickSetLight = () => {
    dispatch(changeMode({ mode: "light" }));
  };

  const handleClickSetDark = () => {
    dispatch(changeMode({ mode: "dark" }));
  };

  return (
    <>
      <AppRouterCacheProvider>
        <ThemeProvider theme={(mode == "light" ? light_green : dark_green)}>
          <CssBaseline />
          <AppBar position="fixed" enableColorOnDark>

            <Toolbar color="primary">

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => router.replace("/documentos") }
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                }}
              >
                Nygma
              </Typography>

              <IconButton onClick={() => router.replace("/documentos")}>
                <Tooltip title="Ir a inicio">
                  <HomeIcon />
                </Tooltip>
              </IconButton>

              <IconButton onClick={() => router.replace("/documentos")}>
                <Tooltip title="Ir a documentos">
                  <ArticleIcon />
                </Tooltip>
              </IconButton>

              <IconButton onClick={() => router.replace("/mensajes")}>
                <Tooltip title="Ir a mensajes">
                  <KeyIcon />
                </Tooltip>
              </IconButton>

              <Account />
              <About />

              <IconButton onClick={handleClickLogOut}>
                <Tooltip title="Salir">
                  <LogoutIcon />
                </Tooltip>
              </IconButton>

            </Toolbar>

          </AppBar>
          <div style={{ marginTop: "100px" }}>
            {children}
          </div>
          <div className="botones-theme">
            {mode == "dark" &&
              <IconButton onClick={handleClickSetLight}>
                <Tooltip title="Cambiar a modo claro">
                  <WbSunnyIcon />
                </Tooltip>
              </IconButton>
            }
            {
              mode == "light" &&
              <IconButton onClick={handleClickSetDark}>
                <Tooltip title="Cambiar a modo oscuro">
                  <DarkModeIcon />
                </Tooltip>
              </IconButton>
            }
          </div>
          <div>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={mode == "light" ? "light" : "dark"}
            />
          </div>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
