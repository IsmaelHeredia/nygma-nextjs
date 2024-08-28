import * as React from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { ThemeProvider } from "@mui/material/styles";

import "@/styles/global.css";

import CssBaseline from "@mui/material/CssBaseline";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/redux/global";

import { ThunkDispatch } from "@reduxjs/toolkit";

import { theme as light_green } from "@/skins/light_green";
import { theme as dark_green } from "@/skins/dark_green";

import { changeMode } from "@/store/reducers/themesSlice";

export default function LayoutLogin({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const mode = useSelector((state: RootState) => state.themes.mode);

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
                    {children}
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
